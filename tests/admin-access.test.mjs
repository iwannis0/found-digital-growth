import assert from "node:assert/strict";
import test, { after, beforeEach } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const original = Object.fromEntries(["ADMIN_EMAILS", "LOCAL_ADMIN_EMAIL", "NODE_ENV"].map((key) => [key, process.env[key]]));
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
      if (id === "\0virtual:test-headers") return 'let current = new Headers(); export function setHeaders(value) { current = new Headers(value); } export async function headers() { return current; }';
      if (id === "\0virtual:test-navigation") return 'export function redirect(path) { throw new Error("redirect:" + path); }';
    },
  }],
});
const context = await vite.ssrLoadModule("next/headers");
const admin = await vite.ssrLoadModule("/lib/admin.ts");
beforeEach(() => {
  process.env.NODE_ENV = "production";
  delete process.env.LOCAL_ADMIN_EMAIL;
  process.env.ADMIN_EMAILS = "owner@example.com,friend@example.com";
  context.setHeaders({});
});
after(async () => {
  await vite.close();
  for (const [key, value] of Object.entries(original)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

test("empty or whitespace allowlists deny authenticated users on pages and APIs", async () => {
  context.setHeaders({ "oai-authenticated-user-email": "owner@example.com" });
  for (const value of [undefined, "", " ,  , "]) {
    if (value === undefined) delete process.env.ADMIN_EMAILS; else process.env.ADMIN_EMAILS = value;
    assert.equal(await admin.getAdmin(), null);
    assert.equal((await admin.requireAdmin()).authorized, false);
    assert.equal((await admin.requireAdminApi()).status, 401);
    await assert.rejects(admin.requireAdminPage(), /redirect:\//);
  }
});

test("both listed administrators can access pages and APIs with normalized emails", async () => {
  process.env.ADMIN_EMAILS = " OWNER@example.com , friend@example.com ";
  for (const email of ["owner@example.com", "FRIEND@example.com"]) {
    context.setHeaders({ "oai-authenticated-user-email": email });
    assert.equal((await admin.requireAdmin()).authorized, true);
    assert.equal((await admin.requireAdminPage()).email, email);
    assert.equal(await admin.requireAdminApi(), null);
  }
});

test("unlisted users and similar addresses cannot access admin", async () => {
  for (const email of ["stranger@example.com", "owner@example.com.attacker.test"]) {
    context.setHeaders({ "oai-authenticated-user-email": email });
    assert.equal(await admin.getAdmin(), null);
    assert.equal((await admin.requireAdminApi()).status, 401);
    await assert.rejects(admin.requireAdminPage(), /redirect:\//);
  }
});

test("anonymous visitors must sign in and production ignores local shortcut", async () => {
  process.env.LOCAL_ADMIN_EMAIL = "owner@example.com";
  assert.equal(await admin.getAdmin(), null);
  assert.equal((await admin.requireAdminApi()).status, 401);
  await assert.rejects(admin.requireAdminPage("/admin/leads"), /redirect:\/signin-with-chatgpt/);
});

test("local development shortcut still requires allowlist membership", async () => {
  process.env.NODE_ENV = "development";
  process.env.LOCAL_ADMIN_EMAIL = "stranger@example.com";
  assert.equal(await admin.getAdmin(), null);
  process.env.LOCAL_ADMIN_EMAIL = "owner@example.com";
  assert.equal((await admin.getAdmin()).email, "owner@example.com");
  process.env.ADMIN_EMAILS = "";
  assert.equal(await admin.getAdmin(), null);
});
