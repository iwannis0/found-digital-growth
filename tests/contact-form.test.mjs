import assert from "node:assert/strict";
import test, { after } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  cacheDir: ".sites-runtime/tests/contact-form",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, hmr: false, ws: false },
});
after(async () => vite.close());

test("contact form renders working native service and package dropdowns", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const html = renderToStaticMarkup(React.createElement(ContactForm));
  assert.match(html, /<select[^>]*name="service"/);
  assert.match(html, /<select[^>]*name="package"/);
  assert.match(html, /<option value="Custom Growth Website">Custom Growth Website<\/option>/);
});

test("a valid package from Pricing is preselected", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const html = renderToStaticMarkup(React.createElement(ContactForm, { initialPackage: "Custom Growth Website" }));
  assert.match(html, /<option value="Custom Growth Website" selected="">Custom Growth Website<\/option>/);
});

test("a valid service link preselects the requested service", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const html = renderToStaticMarkup(React.createElement(ContactForm, { initialService: "Lead & Booking Automation" }));
  assert.match(html, /<option value="Lead &amp; Booking Automation" selected="">/);
});

test("an unknown URL package is ignored", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const html = renderToStaticMarkup(React.createElement(ContactForm, { initialPackage: "Unknown" }));
  assert.match(html, /<option value="" selected="">Choose a package<\/option>/);
  assert.doesNotMatch(html, /value="Unknown"/);
});

test("the Free Audit form reached from Home also renders native dropdowns", async () => {
  const { AuditForm } = await vite.ssrLoadModule("/components/audit-form.tsx");
  const html = renderToStaticMarkup(React.createElement(AuditForm));
  assert.match(html, /<select[^>]*name="goal"/);
  assert.match(html, /<select[^>]*name="budget"/);
  assert.match(html, /<option value="Get more enquiries \/ leads">/);
  assert.match(html, /<option value="€1,000-€1,500">/);
  assert.match(html, /<input[^>]*id="consent"[^>]*type="checkbox"/);
  assert.match(html, /<label[^>]*for="consent"/);
});
