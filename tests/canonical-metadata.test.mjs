import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// `npm test` builds first. These read the prerendered HTML, so they check what search engines get.
const site = "https://vision.cy";
const pages = [
  "/", "/services", "/work", "/pricing", "/free-audit", "/articles", "/about", "/faq", "/privacy", "/terms",
  "/services/web-design", "/services/local-seo", "/services/automation",
  "/work/aura-dental", "/articles/website-cost-cyprus",
];

const file = (path) => (path === "/" ? "index" : path.slice(1));
const html = (path) => readFile(new URL(`../.next/server/app/${file(path)}.html`, import.meta.url), "utf8");
const absolute = (path) => `${site}${path === "/" ? "" : path}`;
const greek = (path) => (path === "/" ? "/gr" : `/gr${path}`);

for (const path of pages) {
  test(`${path} and ${greek(path)} self-canonicalise and point at each other`, async () => {
    for (const [own, lang, ogLocale] of [[path, "en", "en_GB"], [greek(path), "el", "el_CY"]]) {
      const source = await html(own);
      const head = source.slice(0, source.indexOf("</head>"));
      assert.match(source, new RegExp(`<html lang="${lang}"`), `${own} lang`);
      const canonicals = [...head.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((match) => match[1]);
      assert.deepEqual(canonicals, [absolute(own)], `${own} canonical`);
      assert.match(head, new RegExp(`<link rel="alternate" hrefLang="en" href="${absolute(path)}"/>`), `${own} hreflang en`);
      assert.match(head, new RegExp(`<link rel="alternate" hrefLang="el" href="${absolute(greek(path))}"/>`), `${own} hreflang el`);
      assert.match(head, new RegExp(`<link rel="alternate" hrefLang="x-default" href="${absolute(path)}"/>`), `${own} hreflang x-default`);
      assert.match(head, new RegExp(`<meta property="og:url" content="${absolute(own)}"/>`), `${own} og:url`);
      assert.match(head, new RegExp(`<meta property="og:locale" content="${ogLocale}"/>`), `${own} og:locale`);
      assert.doesNotMatch(head, /noindex/, `${own} must be indexable`);
    }
  });
}

test("concept demos stay out of the index", async () => {
  const source = await html("/work/aura-dental/demo");
  assert.match(source, /<meta name="robots" content="noindex, follow"\/>/);
});
