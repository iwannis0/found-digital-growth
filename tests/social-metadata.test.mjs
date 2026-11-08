import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const images = [
  "og-default.jpg",
  "og-work.jpg",
  "og-free-audit.jpg",
];

const html = (file) => readFile(new URL(`../.next/server/app/${file}.html`, import.meta.url), "utf8");
const head = async (file) => { const source = await html(file); return source.slice(0, source.indexOf("</head>")); };

test("all configured social sharing image assets exist", async () => {
  await Promise.all(images.map((image) => access(new URL(`../public/images/social/${image}`, import.meta.url))));
});

test("pages share their own title with the default OG and Twitter image", async () => {
  for (const file of ["index", "gr", "pricing", "gr/pricing", "services/local-seo", "gr/services/local-seo"]) {
    const source = await head(file);
    const title = source.match(/<title>([^<]+)<\/title>/)[1];
    assert.ok(source.includes(`<meta property="og:title" content="${title}"/>`), `${file} og:title`);
    assert.ok(source.includes(`<meta name="twitter:title" content="${title}"/>`), `${file} twitter:title`);
    assert.match(source, /<meta property="og:image" content="https:\/\/vision\.cy\/images\/social\/og-default\.jpg"\/>/, `${file} og:image`);
    assert.match(source, /<meta name="twitter:card" content="summary_large_image"\/>/, `${file} twitter:card`);
    assert.match(source, /<meta name="twitter:image" content="https:\/\/vision\.cy\/images\/social\/og-default\.jpg"\/>/, `${file} twitter:image`);
  }
});

test("Work and Free Audit override both social image formats in both languages", async () => {
  for (const [file, image] of [["work", "og-work.jpg"], ["gr/work", "og-work.jpg"], ["free-audit", "og-free-audit.jpg"], ["gr/free-audit", "og-free-audit.jpg"]]) {
    const source = await head(file);
    assert.ok(source.includes(`<meta property="og:image" content="https://vision.cy/images/social/${image}"/>`), `${file} og:image`);
    assert.ok(source.includes(`<meta name="twitter:image" content="https://vision.cy/images/social/${image}"/>`), `${file} twitter:image`);
  }
});
