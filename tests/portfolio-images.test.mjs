import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projects = ["aura-dental", "nova-estates", "form-developments", "vela-studio", "ora-jewellery"];

test("all portfolio projects use optimized WebP covers", async () => {
  const content = await readFile(new URL("../lib/content.ts", import.meta.url), "utf8");
  for (const project of projects) {
    const path = `/images/work/${project}-cover.webp`;
    assert.match(content, new RegExp(`image: ["']${path.replaceAll("/", "\\/")}["']`));
    const file = new URL(`../public${path}`, import.meta.url);
    await access(file);
    const bytes = await readFile(file);
    assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
    assert.ok((await stat(file)).size < 300_000, `${project} cover should remain below 300 KB`);
  }
  assert.doesNotMatch(content, /\/images\/work\/[a-z-]+-cover\.png/);
});

test("image rendering props and portfolio CSS remain unchanged", async () => {
  const [home, work, detail, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/work/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/work/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(home, /fill sizes="\(max-width: 900px\) 100vw, 50vw" className="project-image"/);
  assert.match(work, /fill sizes="\(max-width: 700px\) 100vw, 33vw"/);
  assert.match(detail, /width=\{1584\} height=\{990\} priority/);
  assert.match(css, /\.project-image \{ object-fit: cover;/);
  assert.match(css, /\.concept-preview-image img \{ object-fit: cover;/);
});
