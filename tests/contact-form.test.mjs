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

// Forms receive their visible strings from the server as props.
const { getDictionary } = await vite.ssrLoadModule("/lib/dictionaries.ts");
const english = getDictionary("en");
const contactProps = (extra = {}) => ({ locale: "en", copy: english.contactForm, formCopy: english.forms, ...extra });

test("contact form renders working native service and package dropdowns", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const html = renderToStaticMarkup(React.createElement(ContactForm, contactProps()));
  assert.match(html, /<select[^>]*name="service"/);
  assert.match(html, /<select[^>]*name="package"/);
  assert.match(html, /<option value="Custom Growth Website">Custom Growth Website<\/option>/);
});

test("a valid package from Pricing is preselected", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const html = renderToStaticMarkup(React.createElement(ContactForm, contactProps({ initialPackage: "Custom Growth Website" })));
  assert.match(html, /<option value="Custom Growth Website" selected="">Custom Growth Website<\/option>/);
});

test("a valid service link preselects the requested service", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const html = renderToStaticMarkup(React.createElement(ContactForm, contactProps({ initialService: "Lead & Booking Automation" })));
  assert.match(html, /<option value="Lead &amp; Booking Automation" selected="">/);
});

test("an unknown URL package is ignored", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const html = renderToStaticMarkup(React.createElement(ContactForm, contactProps({ initialPackage: "Unknown" })));
  assert.match(html, /<option value="" selected="">Choose a package<\/option>/);
  assert.doesNotMatch(html, /value="Unknown"/);
});

test("the Free Audit form reached from Home also renders native dropdowns", async () => {
  const { AuditForm } = await vite.ssrLoadModule("/components/audit-form.tsx");
  const html = renderToStaticMarkup(React.createElement(AuditForm, { locale: "en", copy: english.auditForm, formCopy: english.forms }));
  assert.match(html, /<select[^>]*name="goal"/);
  assert.match(html, /<select[^>]*name="budget"/);
  assert.match(html, /<option value="Get more enquiries \/ leads">/);
  assert.match(html, /<option value="€1,000-€1,500">/);
  assert.match(html, /<input[^>]*id="consent"[^>]*type="checkbox"/);
  assert.match(html, /<label[^>]*for="consent"/);
});

test("the Greek forms show Greek labels but submit the same English values", async () => {
  const { ContactForm } = await vite.ssrLoadModule("/components/contact-form.tsx");
  const { AuditForm } = await vite.ssrLoadModule("/components/audit-form.tsx");
  const greek = getDictionary("el");
  const contact = renderToStaticMarkup(React.createElement(ContactForm, { locale: "el", copy: greek.contactForm, formCopy: greek.forms, initialService: "Local SEO" }));
  assert.match(contact, /<option value="Local SEO" selected="">Τοπικό SEO<\/option>/);
  assert.match(contact, /<option value="Custom Growth Website">Custom Growth Website<\/option>/);
  assert.match(contact, /Αποστολή μηνύματος/);
  const audit = renderToStaticMarkup(React.createElement(AuditForm, { locale: "el", copy: greek.auditForm, formCopy: greek.forms }));
  assert.match(audit, /<option value="€1,000-€1,500">1\.000 € - 1\.500 €<\/option>/);
  assert.match(audit, /Θέλω δωρεάν αξιολόγηση/);
});
