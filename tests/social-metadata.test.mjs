import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const images = [
  "og-default.jpg",
  "og-work.jpg",
  "og-free-audit.jpg",
];

test("all configured social sharing image assets exist", async () => {
  await Promise.all(images.map((image) => access(new URL(`../public/images/social/${image}`, import.meta.url))));
});

test("root metadata configures the default OG and Twitter image", async () => {
  const source = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(source, /openGraph:[\s\S]*images: \["\/images\/social\/og-default\.jpg"\]/);
  assert.match(source, /twitter:\s*\{[\s\S]*?card:\s*"summary_large_image"[\s\S]*?images:\s*\[\s*"\/images\/social\/og-default\.jpg"\s*\]/);
});

test("Work and Free Audit override both social image formats", async () => {
  for (const [page, image] of [["work", "og-work.jpg"], ["free-audit", "og-free-audit.jpg"]]) {
    const source = await readFile(new URL(`../app/${page}/page.tsx`, import.meta.url), "utf8");
    assert.match(source, new RegExp(`openGraph: \\{ images: \\["/images/social/${image.replace(".", "\\.")}"\\] \\}`));
    assert.match(source, new RegExp(`twitter: \\{ card: "summary_large_image", images: \\["/images/social/${image.replace(".", "\\.")}"\\] \\}`));
  }
});
