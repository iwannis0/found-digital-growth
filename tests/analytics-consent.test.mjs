import assert from "node:assert/strict";
import test, { after, beforeEach } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

// Consent uses Google Consent Mode v2: layout.tsx sets every storage type to
// "denied" before GTM loads, and this module sends a consent update plus a
// dataLayer signal once the visitor chooses. Nothing may be tracked before that.
const originalWindow = globalThis.window;
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  configFile: false, appType: "custom", root,
  cacheDir: ".sites-runtime/tests/analytics-consent",
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, hmr: false, ws: false },
});
const {
  hasAnalyticsConsent, syncAnalyticsConsent, watchAnalyticsConsent, trackEvent,
  consentStorageKey, consentChangedEvent,
  analyticsConsentGrantedEvent, analyticsConsentDeniedEvent,
} = await vite.ssrLoadModule("/lib/analytics-consent.ts");

let storage;
let sessionStore;
let gtagCalls;

beforeEach(() => {
  storage = new Map();
  sessionStore = new Map();
  gtagCalls = [];
  globalThis.window = Object.assign(new EventTarget(), {
    location: { href: "https://vision.cy/" },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
    sessionStorage: {
      getItem: (key) => sessionStore.get(key) ?? null,
      setItem: (key, value) => sessionStore.set(key, value),
    },
    dataLayer: [],
    gtag: (...args) => gtagCalls.push(args),
  });
});
after(async () => {
  await vite.close();
  if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow;
});

// The module skips re-sending an unchanged consent state, so move through the
// opposite value first to guarantee the next sync actually fires.
function setConsent(value) {
  storage.set(consentStorageKey, value === "accepted" ? "rejected" : "accepted");
  syncAnalyticsConsent();
  window.dataLayer.length = 0;
  gtagCalls.length = 0;
  if (value === null) storage.delete(consentStorageKey); else storage.set(consentStorageKey, value);
}

const consentUpdates = () => gtagCalls.filter(([type, action]) => type === "consent" && action === "update");
const pushedEvents = () => window.dataLayer.map((entry) => entry.event);

test("no stored choice means no consent and no tracking", () => {
  assert.equal(hasAnalyticsConsent(), false);
  assert.equal(syncAnalyticsConsent(), false);
  trackEvent("contact_submit", { service: "Websites" });
  assert.ok(!pushedEvents().includes("contact_submit"), "nothing may be tracked before a choice");
});

test("rejecting denies analytics storage and blocks events", () => {
  setConsent("rejected");
  assert.equal(syncAnalyticsConsent(), false);
  const [, , payload] = consentUpdates().at(-1);
  assert.equal(payload.analytics_storage, "denied");
  assert.equal(payload.ad_storage, "denied");
  assert.deepEqual(pushedEvents(), [analyticsConsentDeniedEvent]);
  trackEvent("audit_submit");
  assert.ok(!pushedEvents().includes("audit_submit"), "events must not fire after rejection");
});

test("accepting grants analytics storage only, never ads, and lets events through", () => {
  setConsent("accepted");
  assert.equal(syncAnalyticsConsent(), true);
  const [, , payload] = consentUpdates().at(-1);
  assert.equal(payload.analytics_storage, "granted");
  assert.equal(payload.ad_storage, "denied");
  assert.equal(payload.ad_user_data, "denied");
  assert.equal(payload.ad_personalization, "denied");
  assert.ok(pushedEvents().includes(analyticsConsentGrantedEvent));
  trackEvent("contact_submit", { service: "Websites" });
  assert.deepEqual(window.dataLayer.at(-1), { event: "contact_submit", service: "Websites" });
});

test("every event rereads the stored choice, so revoking stops tracking at once", () => {
  setConsent("accepted");
  trackEvent("first");
  storage.set(consentStorageKey, "rejected"); // changed without dispatching an event
  trackEvent("blocked");
  const events = pushedEvents();
  assert.ok(events.includes("first"));
  assert.ok(!events.includes("blocked"), "a revoked choice must stop the next event immediately");
});

test("campaign attribution rides along with a granted consent, never with a denial", () => {
  sessionStore.set("attr_utm_source", "instagram");
  sessionStore.set("attr_utm_campaign", "launch");
  setConsent("accepted");
  syncAnalyticsConsent();
  const granted = window.dataLayer.find((entry) => entry.event === analyticsConsentGrantedEvent);
  assert.equal(granted.campaign_source, "instagram");
  assert.equal(granted.campaign_name, "launch");

  setConsent("rejected");
  syncAnalyticsConsent();
  const denied = window.dataLayer.find((entry) => entry.event === analyticsConsentDeniedEvent);
  assert.ok(!("campaign_source" in denied), "no campaign data may be sent without consent");
});

test("another tab's change is picked up, and the listener is removed on cleanup", () => {
  setConsent("rejected");
  const seen = [];
  const stop = watchAnalyticsConsent((enabled) => seen.push(enabled));
  storage.set(consentStorageKey, "accepted");
  window.dispatchEvent(Object.assign(new Event("storage"), { key: consentStorageKey }));
  assert.equal(seen.at(-1), true, "a change in another tab should be applied");

  stop();
  storage.set(consentStorageKey, "rejected");
  const before = seen.length;
  window.dispatchEvent(new Event(consentChangedEvent));
  assert.equal(seen.length, before, "no updates after cleanup");
});
