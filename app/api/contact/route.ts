import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { BadRequestError, readJson, validationResponse } from "@/lib/api";
import { deliverLeadIntegrations } from "@/lib/integrations";
import { botRejectedResponse, clientIp, isLikelyBot, rateLimit } from "@/lib/security";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = clientIp(request); const limited = rateLimit(`contact:${ip}`);
  if (!limited.allowed) return Response.json({ ok: false, error: "rate_limited", message: "Too many requests. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(limited.retryAfter) } });
  if (await isLikelyBot()) return botRejectedResponse();
  try {
    const parsed = contactSchema.safeParse(await readJson(request)); if (!parsed.success) return validationResponse(parsed.error);
    const input = parsed.data; if (input.companyWebsite) return Response.json({ ok: true }, { status: 201 });
    const [lead] = await getDb().insert(leads).values({ name: input.name, businessName: input.businessName, email: input.email, phone: input.phone, website: input.website, service: input.service, packageName: input.packageName, message: input.message, utmSource: input.utmSource, utmMedium: input.utmMedium, utmCampaign: input.utmCampaign, utmContent: input.utmContent, utmTerm: input.utmTerm }).returning({ id: leads.id });
    await deliverLeadIntegrations("contact", lead.id, input);
    return Response.json({ ok: true, id: lead.id, message: "Your enquiry has been received." }, { status: 201 });
  } catch (error) {
    if (error instanceof BadRequestError) return Response.json({ ok: false, error: "bad_request", message: error.message }, { status: 400 });
    return Response.json({ ok: false, error: "server_error", message: "We could not submit your enquiry. Please try again." }, { status: 500 });
  }
}
