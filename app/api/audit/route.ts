import { getDb } from "@/db";
import { auditRequests } from "@/db/schema";
import { BadRequestError, readJson, validationResponse } from "@/lib/api";
import { deliverLeadIntegrations } from "@/lib/integrations";
import { botRejectedResponse, clientIp, isLikelyBot, rateLimit } from "@/lib/security";
import { auditSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = clientIp(request); const limited = rateLimit(`audit:${ip}`, 4, 60_000);
  if (!limited.allowed) return Response.json({ ok: false, error: "rate_limited", message: "Too many requests. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(limited.retryAfter) } });
  if (await isLikelyBot()) return botRejectedResponse();
  try {
    const parsed = auditSchema.safeParse(await readJson(request)); if (!parsed.success) return validationResponse(parsed.error);
    const input = parsed.data; if (input.companyWebsite) return Response.json({ ok: true }, { status: 201 });
    const [audit] = await getDb().insert(auditRequests).values({ name: input.name, businessName: input.businessName, email: input.email, phone: input.phone, website: input.website, industry: input.industry, city: input.city, goal: input.goal, problem: input.problem, budget: input.budget, message: input.message, utmSource: input.utmSource, utmMedium: input.utmMedium, utmCampaign: input.utmCampaign }).returning({ id: auditRequests.id });
    await deliverLeadIntegrations("audit", audit.id, input);
    return Response.json({ ok: true, id: audit.id, message: "Your audit request has been received." }, { status: 201 });
  } catch (error) {
    if (error instanceof BadRequestError) return Response.json({ ok: false, error: "bad_request", message: error.message }, { status: 400 });
    return Response.json({ ok: false, error: "server_error", message: "We could not submit your audit request. Please try again." }, { status: 500 });
  }
}
