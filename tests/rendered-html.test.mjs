import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// `npm test` builds first; Next prerenders the home pages into .next/server/app.
test("production build renders the VISION. home page", async () => {
  const html = await readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>VISION\. \| Website Design &amp; Local SEO in Cyprus/);
  assert.match(html, /Built with clarity/);
  assert.doesNotMatch(html, /FOUND\./);
  assert.doesNotMatch(html, /Starter Project/);
  assert.doesNotMatch(html, /codex-preview/);
});

test("the Greek home page is server-rendered in Greek", async () => {
  const html = await readFile(new URL("../.next/server/app/gr.html", import.meta.url), "utf8");
  assert.match(html, /<html lang="el"/);
  assert.match(html, /<title>Κατασκευή Ιστοσελίδων &amp; SEO στην Κύπρο \| VISION\.<\/title>/);
  assert.match(html, /Χτισμένο με σαφήνεια/);
  // Navigation and calls to action stay inside the Greek site.
  assert.match(html, /href="\/gr\/services"/);
  assert.match(html, /href="\/gr\/free-audit"/);
  assert.doesNotMatch(html, /href="\/services"/);
});
