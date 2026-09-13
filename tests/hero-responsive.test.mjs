import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [css, home, project] = await Promise.all([
  readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/work/[slug]/page.tsx", import.meta.url), "utf8"),
]);

test("mobile hero sizing is scoped to the three affected routes", () => {
  assert.match(home, /hero-copy home-hero-copy/);
  assert.match(project, /case-hero-\$\{project\.slug\}/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*\.home-hero-copy h1 \{ font-size: clamp\(3\.25rem, 15vw, 3\.65rem\); line-height: \.9; \}/);
  assert.match(css, /\.case-hero-nova-estates h1, \.case-hero-ora-jewellery h1 \{ font-size: clamp\(4rem, 17vw, 5rem\); line-height: \.8; overflow-wrap: normal; \}/);
});
