import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { BadRequestError, readJson, validationResponse } from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/security";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const limited = rateLimit(`newsletter:${clientIp(request)}`, 4, 60_000); if (!limited.allowed) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  try {
    const parsed = newsletterSchema.safeParse(await readJson(request)); if (!parsed.success) return validationResponse(parsed.error); if (parsed.data.companyWebsite) return Response.json({ ok: true }, { status: 201 });
    const db = getDb(); const existing = await db.select({ id: newsletterSubscribers.id }).from(newsletterSubscribers).where(eq(newsletterSubscribers.email, parsed.data.email)).limit(1);
    if (!existing.length) await db.insert(newsletterSubscribers).values({ email: parsed.data.email });
    return Response.json({ ok: true, message: "You are subscribed." }, { status: 201 });
  } catch (error) { if (error instanceof BadRequestError) return Response.json({ ok: false, error: "bad_request" }, { status: 400 }); return Response.json({ ok: false, error: "server_error" }, { status: 500 }); }
}
