import assert from "node:assert/strict";
import test, { after, beforeEach } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const originalFetch = globalThis.fetch;
const originalWebhook = process.env.LEAD_WEBHOOK_URL;
const vite = await createServer({ appType: "custom", cacheDir: ".sites-runtime/tests/integrations", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false, ws: false } });
const { sendLeadWebhook } = await vite.ssrLoadModule("/lib/integrations.ts");
beforeEach(() => { process.env.LEAD_WEBHOOK_URL = "https://crm.example.test/lead"; });
after(async () => {
  await vite.close();
  globalThis.fetch = originalFetch;
  if (originalWebhook === undefined) delete process.env.LEAD_WEBHOOK_URL; else process.env.LEAD_WEBHOOK_URL = originalWebhook;
});

test("webhook retries temporary HTTP failures and checks the final response", async () => {
  let attempts = 0;
  globalThis.fetch = async () => new Response(null, { status: ++attempts < 3 ? 503 : 204 });
  await sendLeadWebhook("audit", { email: "test@example.com" });
  assert.equal(attempts, 3);
});

test("webhook does not retry a permanent client error", async () => {
  let attempts = 0;
  globalThis.fetch = async () => { attempts += 1; return new Response(null, { status: 400 }); };
  await assert.rejects(sendLeadWebhook("contact", {}), /returned 400/);
  assert.equal(attempts, 1);
});

test("webhook reports failure after exhausting retries", async () => {
  let attempts = 0;
  globalThis.fetch = async () => { attempts += 1; throw new Error("network unavailable"); };
  await assert.rejects(sendLeadWebhook("audit", {}), /network unavailable/);
  assert.equal(attempts, 3);
});
