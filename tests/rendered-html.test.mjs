import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("production bundle contains FOUND. metadata and homepage copy", async () => {
  const bundle = await readFile(new URL("../dist/server/index.js", import.meta.url), "utf8");
  assert.match(bundle, /Premium Websites & Digital Growth Cyprus/);
  assert.match(bundle, /Your website should/);
  assert.doesNotMatch(bundle, /Starter Project/);
  assert.doesNotMatch(bundle, /codex-preview/);
});
