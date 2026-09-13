import assert from "node:assert/strict";
import test, { after, beforeEach } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const originalWindow = globalThis.window;
const vite = await createServer({ appType: "custom", cacheDir: ".sites-runtime/tests/attribution", configFile: false, root, server: { middlewareMode: true, hmr: false, ws: false } });
const attribution = await vite.ssrLoadModule("/lib/client-attribution.ts");
let storage;
beforeEach(() => {
  storage = new Map();
  globalThis.window = {
    location: { href: "https://found.local/?utm_source=instagram&utm_campaign=launch" },
    sessionStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  };
});
after(async () => { await vite.close(); if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow; });

test("campaign attribution survives navigation away from the landing page", () => {
  attribution.captureAttribution();
  window.location.href = "https://found.local/contact";
  assert.deepEqual(attribution.getAttribution(), { utmSource: "instagram", utmMedium: "", utmCampaign: "launch", utmContent: "", utmTerm: "" });
});

test("later campaign parameters replace previous attribution", () => {
  attribution.captureAttribution();
  window.location.href = "https://found.local/?utm_source=google&utm_medium=cpc";
  assert.equal(attribution.getAttribution().utmSource, "google");
  assert.equal(attribution.getAttribution().utmMedium, "cpc");
});
