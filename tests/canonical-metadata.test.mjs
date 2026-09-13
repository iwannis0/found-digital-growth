import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const staticCanonicals = [
  ["../app/services/page.tsx", "/services"],
  ["../app/work/page.tsx", "/work"],
  ["../app/contact/page.tsx", "/contact"],
  ["../app/free-audit/page.tsx", "/free-audit"],
  ["../app/privacy/page.tsx", "/privacy"],
  ["../app/terms/page.tsx", "/terms"],
  ["../app/about/page.tsx", "/about"],
  ["../app/pricing/page.tsx", "/pricing"],
  ["../app/faq/page.tsx", "/faq"],
];

test("public static pages declare their own relative canonical paths", async () => {
  for (const [file, canonical] of staticCanonicals) {
    const source = await readFile(new URL(file, import.meta.url), "utf8");
    assert.match(source, new RegExp(`alternates:\\s*\\{\\s*canonical:\\s*["']${canonical}["']`), `${file} should use ${canonical}`);
  }
});

test("portfolio canonicals are generated from the matched project slug", async () => {
  const source = await readFile(new URL("../app/work/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(source, /alternates:\s*\{\s*canonical:\s*`\/work\/\$\{project\.slug\}`/);
});

test("service detail canonicals keep their existing dynamic implementation", async () => {
  const source = await readFile(new URL("../app/services/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(source, /alternates:\s*\{\s*canonical:\s*`\/services\/\$\{canonicalSlug\}`/);
});
