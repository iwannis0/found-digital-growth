import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// `npm test` builds first; Next prerenders the home page into .next/server/app.
test("production build renders the VISION. home page", async () => {
  const html = await readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>VISION\. \| Website Design &amp; Digital Growth Cyprus/);
  assert.match(html, /Built with clarity/);
  assert.doesNotMatch(html, /FOUND\./);
  assert.doesNotMatch(html, /Starter Project/);
  assert.doesNotMatch(html, /codex-preview/);
});
