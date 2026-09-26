import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

export type AdminUser = { email: string; displayName: string };
type ConfiguredAdmin = AdminUser & { passwordHash: string };
type SessionPayload = AdminUser & { exp: number };

function configuredAdmins(): ConfiguredAdmin[] {
  return [
    { email: (process.env.ADMIN_IOANNIS_EMAIL ?? "").trim(), displayName: "Ioannis", passwordHash: (process.env.ADMIN_IOANNIS_PASSWORD_HASH ?? "").trim() },
    { email: (process.env.ADMIN_STYLIANOS_EMAIL ?? "").trim(), displayName: "Stylianos", passwordHash: (process.env.ADMIN_STYLIANOS_PASSWORD_HASH ?? "").trim() },
  ].filter((user) => user.email && user.passwordHash);
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_SESSION_SECRET && configuredAdmins().length === 2);
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  const user = configuredAdmins().find((item) => item.email.trim().toLowerCase() === email.trim().toLowerCase());
  if (!user || !await verifyPassword(password, user.passwordHash)) return null;
  return { email: user.email.trim().toLowerCase(), displayName: user.displayName };
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await readSession(token);
  if (!payload || payload.exp < Date.now() / 1000) return null;
  return { email: payload.email, displayName: payload.displayName };
}

export async function createAdminSession(user: AdminUser) {
  const payload: SessionPayload = { ...user, exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS };
  const encoded = base64UrlEncode(JSON.stringify(payload));
  return `${encoded}.${await sign(encoded)}`;
}

export function sessionCookieOptions() {
  return { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_DURATION_SECONDS };
}

export function clearSessionCookieOptions() {
  return { ...sessionCookieOptions(), maxAge: 0 };
}

export { SESSION_COOKIE };

async function readSession(token: string): Promise<SessionPayload | null> {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || !await secureEqual(signature, await sign(encoded))) return null;
  try {
    const value = JSON.parse(base64UrlDecode(encoded)) as SessionPayload;
    return typeof value.email === "string" && typeof value.displayName === "string" && typeof value.exp === "number" ? value : null;
  } catch { return null; }
}

async function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64UrlEncodeBytes(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))));
}

async function verifyPassword(password: string, stored: string) {
  const [algorithm, iterationsText, salt, expected] = stored.split("$");
  const iterations = Number(iterationsText);
  if (algorithm !== "pbkdf2" || !Number.isSafeInteger(iterations) || iterations < 100_000 || !salt || !expected) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations }, key, 256));
  return secureEqual(base64UrlEncodeBytes(derived), expected);
}

async function secureEqual(left: string, right: string) {
  const a = new TextEncoder().encode(left); const b = new TextEncoder().encode(right);
  if (a.length !== b.length) return false;
  let result = 0; for (let index = 0; index < a.length; index++) result |= a[index] ^ b[index];
  return result === 0;
}

function base64UrlEncode(value: string) { return base64UrlEncodeBytes(new TextEncoder().encode(value)); }
function base64UrlEncodeBytes(value: Uint8Array) { let text = ""; value.forEach((byte) => { text += String.fromCharCode(byte); }); return btoa(text).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""); }
function base64UrlDecode(value: string) { const padded = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - value.length % 4) % 4); const raw = atob(padded); return new TextDecoder().decode(Uint8Array.from(raw, (character) => character.charCodeAt(0))); }
