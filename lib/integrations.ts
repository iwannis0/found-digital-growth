import { safeHtml } from "@/lib/security";

const retryDelays = [0, 250, 750];

async function postWithRetry(url: string, init: RequestInit, service: string) {
  let lastError: unknown;
  for (const delay of retryDelays) {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    let response: Response;
    try {
      response = await fetch(url, { ...init, signal: AbortSignal.timeout(8_000) });
    } catch (error) {
      lastError = error;
      continue;
    }
    if (response.ok) return;
    const error = new Error(`${service} returned ${response.status}`);
    if (response.status < 500 && response.status !== 408 && response.status !== 429) throw error;
    lastError = error;
  }
  throw lastError instanceof Error ? lastError : new Error(`${service} request failed`);
}

export async function deliverLeadIntegrations(kind: "contact" | "audit", recordId: number, payload: Record<string, unknown>) {
  const deliveries = await Promise.allSettled([
    sendEnquiryEmails(kind, payload),
    sendLeadWebhook(kind, payload),
  ]);
  deliveries.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error("Lead integration failed after retries", {
        kind,
        recordId,
        integration: index === 0 ? "email" : "webhook",
        error: result.reason instanceof Error ? result.reason.message : "Unknown error",
      });
    }
  });
}

export async function sendEnquiryEmails(kind: "contact" | "audit", payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const recipients = [...new Set((process.env.EMAIL_TO ?? "").split(",").map((email) => email.trim()).filter(Boolean))];
  if (!apiKey || !from || recipients.length === 0) return;
  const business = safeHtml(payload.businessName || "New business");
  const person = safeHtml(payload.name);
  const rows = Object.entries(payload).filter(([key]) => !["companyWebsite", "consent"].includes(key)).map(([key, value]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>${safeHtml(key)}</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${safeHtml(value)}</td></tr>`).join("");
  const deliveries = await Promise.allSettled([
    resend(apiKey, { from, to: recipients, subject: kind === "audit" ? `New FOUND. audit request - ${business}` : `New FOUND. enquiry - ${business}`, html: `<div style="font-family:Arial,sans-serif;max-width:680px"><h1>New ${kind === "audit" ? "audit request" : "enquiry"}</h1><p>A new form submission is ready to review in the FOUND. admin area.</p><table style="border-collapse:collapse;width:100%">${rows}</table></div>` }),
    resend(apiKey, { from, to: [String(payload.email)], subject: kind === "audit" ? "We received your audit request | FOUND." : "We received your enquiry | FOUND.", html: `<div style="font-family:Arial,sans-serif;max-width:600px"><h1>FOUND.</h1><p>Hi ${person},</p><p>Thank you for contacting FOUND. We have received the details for ${business} and will review them carefully.</p><p>We usually reply within two working days.</p><p>Get found. Get chosen.</p></div>` }),
  ]);
  const failures = deliveries.filter((result) => result.status === "rejected");
  if (failures.length) throw new AggregateError(failures.map((result) => (result as PromiseRejectedResult).reason), "One or more enquiry emails failed");
}

async function resend(apiKey: string, body: unknown) {
  await postWithRetry("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify(body) }, "Resend");
}

export async function sendLeadWebhook(kind: "contact" | "audit", payload: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  await postWithRetry(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: kind, createdAt: new Date().toISOString(), ...payload }) }, "Lead webhook");
}
