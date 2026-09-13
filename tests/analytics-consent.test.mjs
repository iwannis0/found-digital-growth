import assert from "node:assert/strict";
import test, { after, beforeEach } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const originalId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const originalWindow = globalThis.window;
process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-CONSENTTEST";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  configFile: false, appType: "custom", root,
  cacheDir: ".sites-runtime/tests/analytics-consent",
  server: { middlewareMode: true, hmr: false, ws: false },
});
const { hasAnalyticsConsent, syncAnalyticsConsent, watchAnalyticsConsent, trackEvent, consentStorageKey, consentChangedEvent } = await vite.ssrLoadModule("/lib/analytics-consent.ts");
let storage;
let calls;
beforeEach(() => {
  storage = new Map();
  calls = [];
  globalThis.window = Object.assign(new EventTarget(), {
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
    gtag: (...args) => calls.push(args),
  });
});
after(async () => {
  await vite.close();
  if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow;
  if (originalId === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalId;
});

test("no choice and rejected consent block an already-present Google tag", () => {
  for (const value of ["", "rejected", "invalid"]) {
    storage.set(consentStorageKey, value);
    trackEvent("contact_submit");
    assert.equal(window["ga-disable-G-CONSENTTEST"], true);
    assert.equal(hasAnalyticsConsent(), false);
  }
  assert.deepEqual(calls, []);
});

test("Accept -> Reject disables the loaded tag synchronously, without waiting for React", () => {
  const states = [];
  const stop = watchAnalyticsConsent((enabled) => states.push(enabled));
  try {
    storage.set(consentStorageKey, "accepted");
    window.dispatchEvent(new Event(consentChangedEvent));
    trackEvent("contact_submit", { service: "Websites" });
    assert.equal(window["ga-disable-G-CONSENTTEST"], false);
    storage.set(consentStorageKey, "rejected");
    window.dispatchEvent(new Event(consentChangedEvent));
    assert.equal(window["ga-disable-G-CONSENTTEST"], true);
    trackEvent("audit_submit");
    assert.deepEqual(states, [false, true, false]);
    assert.deepEqual(calls, [["event", "contact_submit", { service: "Websites" }]]);
  } finally { stop(); }
});

test("every event rereads consent even if no change notification was received", () => {
  storage.set(consentStorageKey, "accepted");
  trackEvent("first");
  storage.set(consentStorageKey, "rejected");
  trackEvent("blocked");
  assert.equal(calls.length, 1);
  assert.equal(window["ga-disable-G-CONSENTTEST"], true);
});

test("accepting again resumes tracking without replaying events blocked during rejection", () => {
  storage.set(consentStorageKey, "accepted");
  trackEvent("first");
  storage.set(consentStorageKey, "rejected");
  trackEvent("blocked");
  storage.set(consentStorageKey, "accepted");
  trackEvent("resumed");
  assert.equal(window["ga-disable-G-CONSENTTEST"], false);
  assert.deepEqual(calls.map((call) => call[1]), ["first", "resumed"]);
});

test("another tab's rejection and storage clearing disable automatic collection", () => {
  storage.set(consentStorageKey, "accepted");
  const stop = watchAnalyticsConsent(() => {});
  try {
    for (const key of [consentStorageKey, null]) {
      storage.set(consentStorageKey, "accepted");
      syncAnalyticsConsent();
      storage.clear();
      window.dispatchEvent(Object.assign(new Event("storage"), { key }));
      assert.equal(window["ga-disable-G-CONSENTTEST"], true);
    }
  } finally { stop(); }
  storage.set(consentStorageKey, "accepted");
  window.dispatchEvent(new Event(consentChangedEvent));
  assert.equal(window["ga-disable-G-CONSENTTEST"], true, "listener removed on cleanup");
});

test("unavailable storage and server rendering fail closed without errors", () => {
  window.localStorage.getItem = () => { throw new Error("Storage denied"); };
  assert.equal(syncAnalyticsConsent(), false);
  trackEvent("blocked");
  assert.deepEqual(calls, []);
  delete globalThis.window;
  assert.equal(hasAnalyticsConsent(), false);
  assert.doesNotThrow(() => trackEvent("server"));
});
