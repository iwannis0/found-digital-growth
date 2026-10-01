import { clientConfirmationEmail, teamNotificationEmail } from "@/lib/emails";

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
  const team = teamNotificationEmail(kind, payload);
  const client = clientConfirmationEmail(kind, payload);
  const replyTo = String(payload.email ?? "").trim();
  const deliveries = await Promise.allSettled([
    // Replying to the team notification goes straight to the person who enquired.
    resend(apiKey, { from, to: recipients, subject: team.subject, html: team.html, text: team.text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    resend(apiKey, { from, to: [String(payload.email)], subject: client.subject, html: client.html, text: client.text }),
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
