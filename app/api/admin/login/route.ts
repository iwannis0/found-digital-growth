import { NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, rateLimit } from "@/lib/security";
import { authenticateAdmin, createAdminSession, isAdminAuthConfigured, sessionCookieOptions, SESSION_COOKIE } from "@/lib/admin-auth";

const bodySchema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(256) });

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) return NextResponse.json({ ok: false, error: "Admin login is not configured yet." }, { status: 503 });
  // Stops password guessing: 5 attempts per IP per 15 minutes, checked before any password work.
  const limited = rateLimit(`admin-login:${clientIp(request)}`, 5, 15 * 60_000);
  if (!limited.allowed) return NextResponse.json({ ok: false, error: "Too many attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limited.retryAfter), "Cache-Control": "no-store" } });
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Enter a valid email and password." }, { status: 400 });
  const user = await authenticateAdmin(parsed.data.email, parsed.data.password);
  if (!user) return NextResponse.json({ ok: false, error: "Email or password is incorrect." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createAdminSession(user), sessionCookieOptions());
  return response;
}
