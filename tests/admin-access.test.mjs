import assert from "node:assert/strict";
import { pbkdf2Sync } from "node:crypto";
import test, { after, beforeEach } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

// Admin access is two named accounts (email + PBKDF2 password hash from env) and an
// HMAC-signed session cookie. next/headers and next/navigation are stubbed so the
// real lib/admin-auth.ts and lib/admin.ts run outside Next.
const keys = ["ADMIN_SESSION_SECRET", "ADMIN_IOANNIS_EMAIL", "ADMIN_IOANNIS_PASSWORD_HASH", "ADMIN_STYLIANOS_EMAIL", "ADMIN_STYLIANOS_PASSWORD_HASH"];
const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  configFile: false, appType: "custom", root,
  cacheDir: ".sites-runtime/tests/admin-access",
  resolve: { alias: { "@": root, "next/headers": "virtual:test-headers", "next/navigation": "virtual:test-navigation" } },
  server: { middlewareMode: true, hmr: false, ws: false },
  plugins: [{
    name: "request-context-for-admin-tests",
    resolveId(id) { if (id.startsWith("virtual:test-")) return `\0${id}`; },
    load(id) {
      if (id === "\0virtual:test-headers") return "let jar = new Map(); export function setCookie(name, value) { jar = new Map(value === undefined ? [] : [[name, value]]); } export async function cookies() { return { get: (name) => (jar.has(name) ? { name, value: jar.get(name) } : undefined) }; }";
      if (id === "\0virtual:test-navigation") return 'export function redirect(path) { throw new Error("redirect:" + path); }';
    },
  }],
});
const context = await vite.ssrLoadModule("next/headers");
const auth = await vite.ssrLoadModule("/lib/admin-auth.ts");
const admin = await vite.ssrLoadModule("/lib/admin.ts");

// Same format as scripts/hash-admin-password.mjs: pbkdf2$iterations$salt$base64url(hash).
function hash(password, salt = "test-salt") {
  return `pbkdf2$100000$${salt}$${pbkdf2Sync(password, salt, 100_000, 32, "sha256").toString("base64url")}`;
}
const ioannis = { email: "owner@example.com", password: "correct horse battery" };
const stylianos = { email: "friend@example.com", password: "another long passphrase" };

beforeEach(() => {
  process.env.ADMIN_SESSION_SECRET = "test-session-secret";
  process.env.ADMIN_IOANNIS_EMAIL = ioannis.email;
  process.env.ADMIN_IOANNIS_PASSWORD_HASH = hash(ioannis.password);
  process.env.ADMIN_STYLIANOS_EMAIL = stylianos.email;
  process.env.ADMIN_STYLIANOS_PASSWORD_HASH = hash(stylianos.password, "other-salt");
  context.setCookie(auth.SESSION_COOKIE, undefined);
});
after(async () => {
  await vite.close();
  for (const [key, value] of Object.entries(original)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

async function signIn(user) {
  const session = await auth.authenticateAdmin(user.email, user.password);
  context.setCookie(auth.SESSION_COOKIE, await auth.createAdminSession(session));
  return session;
}

test("login is only configured with a session secret and both admin accounts", () => {
  assert.equal(auth.isAdminAuthConfigured(), true);
  delete process.env.ADMIN_SESSION_SECRET;
  assert.equal(auth.isAdminAuthConfigured(), false);
  process.env.ADMIN_SESSION_SECRET = "test-session-secret";
  process.env.ADMIN_STYLIANOS_PASSWORD_HASH = "  ";
  assert.equal(auth.isAdminAuthConfigured(), false);
});

test("both admins can sign in, with case- and space-insensitive emails", async () => {
  for (const user of [ioannis, stylianos]) {
    const session = await auth.authenticateAdmin(`  ${user.email.toUpperCase()} `, user.password);
    assert.equal(session?.email, user.email);
  }
});

test("wrong passwords, unlisted and look-alike emails are refused", async () => {
  assert.equal(await auth.authenticateAdmin(ioannis.email, "wrong password"), null);
  assert.equal(await auth.authenticateAdmin(ioannis.email, stylianos.password), null);
  for (const email of ["stranger@example.com", "owner@example.com.attacker.test", "owner@example.co"]) {
    assert.equal(await auth.authenticateAdmin(email, ioannis.password), null);
  }
});

test("visitors without a session are sent to login and refused by the APIs", async () => {
  assert.equal(await admin.getAdmin(), null);
  assert.equal((await admin.requireAdminApi()).status, 401);
  await assert.rejects(admin.requireAdminPage("/admin/leads"), /redirect:\/admin\/login\?returnTo=%2Fadmin%2Fleads/);
});

test("a signed-in admin can open pages and call the APIs", async () => {
  await signIn(stylianos);
  assert.equal((await admin.getAdmin())?.displayName, "Stylianos");
  assert.equal((await admin.requireAdminPage()).email, stylianos.email);
  assert.equal(await admin.requireAdminApi(), null);
});

test("tampered, foreign-secret and expired session cookies are rejected", async () => {
  const token = await auth.createAdminSession({ email: ioannis.email, displayName: "Ioannis" });
  const [payload, signature] = token.split(".");
  const forged = Buffer.from(JSON.stringify({ email: "stranger@example.com", displayName: "Stranger", exp: 9_999_999_999 })).toString("base64url");
  context.setCookie(auth.SESSION_COOKIE, `${forged}.${signature}`);
  assert.equal(await admin.getAdmin(), null);

  process.env.ADMIN_SESSION_SECRET = "a-different-secret";
  context.setCookie(auth.SESSION_COOKIE, `${payload}.${signature}`);
  assert.equal(await admin.getAdmin(), null);
  process.env.ADMIN_SESSION_SECRET = "test-session-secret";

  const realNow = Date.now;
  Date.now = () => realNow() - 9 * 60 * 60 * 1000; // sessions last 8 hours
  try { context.setCookie(auth.SESSION_COOKIE, await auth.createAdminSession({ email: ioannis.email, displayName: "Ioannis" })); }
  finally { Date.now = realNow; }
  assert.equal(await admin.getAdmin(), null);
});

test("unknown emails take as long as wrong passwords, so admin emails can't be guessed", async () => {
  const time = async (email) => { const start = performance.now(); await auth.authenticateAdmin(email, "wrong password"); return performance.now() - start; };
  await time(ioannis.email); // warm up
  const known = await time(ioannis.email);
  const unknown = await time("nobody@example.com");
  // The unknown path runs a stronger (600k) hash than these test accounts (100k), so it is never the fast one.
  assert.ok(unknown >= known * 0.8, `unknown email answered in ${unknown.toFixed(0)}ms vs ${known.toFixed(0)}ms`);
});
