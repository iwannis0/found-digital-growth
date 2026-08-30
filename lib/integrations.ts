import { safeHtml } from "@/lib/security";

export async function sendEnquiryEmails(kind: "contact" | "audit", payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;
  if (!apiKey || !from || !to) return;
  const business = safeHtml(payload.businessName || "New business");
  const person = safeHtml(payload.name);
  const rows = Object.entries(payload).filter(([key]) => !["companyWebsite", "turnstileToken", "consent"].includes(key)).map(([key, value]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>${safeHtml(key)}</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${safeHtml(value)}</td></tr>`).join("");
  await Promise.all([
    resend(apiKey, { from, to: [to], subject: kind === "audit" ? `New FOUND. audit request - ${business}` : `New FOUND. enquiry - ${business}`, html: `<div style="font-family:Arial,sans-serif;max-width:680px"><h1>New ${kind === "audit" ? "audit request" : "enquiry"}</h1><table style="border-collapse:collapse;width:100%">${rows}</table></div>` }),
    resend(apiKey, { from, to: [String(payload.email)], subject: kind === "audit" ? "We received your audit request | FOUND." : "We received your enquiry | FOUND.", html: `<div style="font-family:Arial,sans-serif;max-width:600px"><h1>FOUND.</h1><p>Hi ${person},</p><p>Thank you for contacting FOUND. We have received the details for ${business} and will review them carefully.</p><p>We will get back to you as soon as possible.</p><p>Get found. Get chosen.</p></div>` }),
  ]);
}

async function resend(apiKey: string, body: unknown) {
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`Resend returned ${response.status}`);
}

export async function sendLeadWebhook(kind: "contact" | "audit", payload: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: kind, createdAt: new Date().toISOString(), ...payload }) });
}
