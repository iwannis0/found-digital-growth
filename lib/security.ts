import { checkBotId } from "botid/server";

const windows = new Map<string, { count: number; resetAt: number }>();

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function rateLimit(key: string, limit = 6, windowMs = 60_000) {
  const now = Date.now();
  const current = windows.get(key);
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: Math.ceil(windowMs / 1000) };
  }
  current.count += 1;
  return { allowed: current.count <= limit, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
}

// BotID can only classify traffic on Vercel (it needs the platform's OIDC token), so
// skip it elsewhere. If the check itself fails, let the lead through: the honeypot and
// rate limit still apply, and a lost enquiry costs more than a stray spam submission.
export async function isLikelyBot() {
  if (process.env.VERCEL !== "1") return false;
  try {
    return (await checkBotId()).isBot;
  } catch (error) {
    console.error("BotID check failed, allowing request", error instanceof Error ? error.message : error);
    return false;
  }
}

export function botRejectedResponse() {
  return Response.json({ ok: false, error: "verification_failed", message: "We could not verify this request. Please refresh the page and try again." }, { status: 403 });
}

export function safeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character] ?? character);
}
