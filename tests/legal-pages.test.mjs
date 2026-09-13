import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [privacy, terms] = await Promise.all([
  readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/terms/page.tsx", import.meta.url), "utf8"),
]);

test("Privacy reflects current forms, consent and neutral retention policy", () => {
  assert.match(privacy, /Contact form/);
  assert.match(privacy, /Free Website Audit/);
  assert.match(privacy, /Source and campaign attribution/);
  assert.match(privacy, /Optional analytics only starts after consent/);
  assert.match(privacy, /only for as long as reasonably necessary/);
  assert.match(privacy, /does not sell personal information/);
  assert.match(privacy, /siteConfig\.email/);
});

test("Terms match the published pricing and ownership policies", () => {
  assert.match(terms, /50% deposit to begin and the remaining 50% before launch/);
  assert.match(terms, /Website Care is optional after launch/);
  assert.match(terms, /initial 3-month minimum term/);
  assert.match(terms, /cancelled with 30 days’ notice/);
  assert.match(terms, /Starter includes 1 design revision round, Growth includes 2 design revision rounds, and Premium includes 3 design revision rounds/);
  assert.match(terms, /client owns the final website content and agreed project deliverables/);
  assert.match(terms, /domain should be registered in the client’s name/);
  assert.match(terms, /VAT, where applicable, will be confirmed before work begins/);
});

test("legal pages retain explicit pre-launch review notes without fabricated details", () => {
  assert.match(privacy, /final business identity, privacy contact details and enabled production providers must be confirmed before launch/);
  assert.match(terms, /governing-law position must be confirmed before production launch/);
  assert.doesNotMatch(`${privacy}\n${terms}`, /registration number|VAT number|registered office|exclusive jurisdiction/i);
});
