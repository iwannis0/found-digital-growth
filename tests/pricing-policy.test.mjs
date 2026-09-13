import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [pricing, faqs] = await Promise.all([
  readFile(new URL("../app/pricing/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../lib/faqs.ts", import.meta.url), "utf8"),
]);

test("pricing packages show their included design revision rounds", () => {
  assert.match(pricing, /Starter[\s\S]*"1 design revision round"/);
  assert.match(pricing, /Growth[\s\S]*"2 design revision rounds"/);
  assert.match(pricing, /Premium[\s\S]*"3 design revision rounds"/);
});

test("Website Care policy defines optional care, scope and cancellation terms", () => {
  assert.match(pricing, /Optional Website Care after launch/);
  assert.match(pricing, /initial 3-month minimum term/);
  assert.match(pricing, /cancelled with 30 days’ notice/);
  assert.match(pricing, /Unused maintenance time does not roll over/);
  assert.match(pricing, /other work outside the agreed package are quoted separately/);
});

test("FAQ covers ownership, scope, revisions, cancellation and VAT", () => {
  for (const question of [
    "Is Website Care mandatory?",
    "How many design revisions are included?",
    "Who owns the website?",
    "Who owns the domain?",
    "What happens if I cancel Website Care?",
    "Are additional features included in the package price?",
    "Do prices include VAT?",
  ]) assert.match(faqs, new RegExp(question.replace(/[?]/g, "\\?")));
  assert.match(faqs, /client owns the final website content and agreed project deliverables/);
  assert.match(faqs, /domain should be registered in the client’s name/);
});
