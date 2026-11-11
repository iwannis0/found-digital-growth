import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test, { after } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", cacheDir: ".sites-runtime/tests/i18n", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false, ws: false } });
after(async () => vite.close());

const load = (path) => vite.ssrLoadModule(path);

test("localizePath and parsePath map English paths to /gr and back", async () => {
  const { localizePath, parsePath } = await load("/lib/i18n.ts");
  assert.equal(localizePath("en", "/services"), "/services");
  assert.equal(localizePath("el", "/"), "/gr");
  assert.equal(localizePath("el", "/services/local-seo"), "/gr/services/local-seo");
  assert.equal(localizePath("el", "/contact?service=Local+SEO"), "/gr/contact?service=Local+SEO");
  assert.equal(localizePath("el", "#cookie-settings"), "#cookie-settings");
  assert.deepEqual(parsePath("/gr"), { locale: "el", path: "/" });
  assert.deepEqual(parsePath("/gr/pricing"), { locale: "el", path: "/pricing" });
  assert.deepEqual(parsePath("/pricing"), { locale: "en", path: "/pricing" });
  assert.deepEqual(parsePath("/graphics"), { locale: "en", path: "/graphics" });
});

test("the language switcher links to the same page, or a sensible fallback", async () => {
  const { switchLocaleHref } = await load("/lib/routes.ts");
  assert.equal(switchLocaleHref("/services", "el"), "/gr/services");
  assert.equal(switchLocaleHref("/gr/services", "en"), "/services");
  assert.equal(switchLocaleHref("/gr", "en"), "/");
  assert.equal(switchLocaleHref("/", "el"), "/gr");
  assert.equal(switchLocaleHref("/articles/website-cost-cyprus", "el"), "/gr/articles/website-cost-cyprus");
  // English-only concept demos fall back to their Greek case study.
  assert.equal(switchLocaleHref("/work/nova-estates/demo/properties", "el"), "/gr/work/nova-estates");
  // Unknown and private pages fall back to the homepage instead of a broken link.
  assert.equal(switchLocaleHref("/admin/leads", "el"), "/gr");
  assert.equal(switchLocaleHref("/does-not-exist", "el"), "/gr");
  assert.equal(switchLocaleHref("/services", "en"), "/services");
});

test("the public route list matches every service, project and article", async () => {
  const { serviceSlugs, projectSlugs, articleSlugs } = await load("/lib/routes.ts");
  const { services, customCapabilities, projects } = await load("/lib/content.ts");
  const { articles } = await load("/lib/articles.tsx");
  assert.deepEqual([...serviceSlugs].sort(), [...services, ...customCapabilities].map(({ slug }) => slug).sort());
  assert.deepEqual([...projectSlugs].sort(), projects.map(({ slug }) => slug).sort());
  assert.deepEqual([...articleSlugs], articles.map(({ slug }) => slug));
});

test("every Greek list keeps the shape of its English source", async () => {
  const { faqs } = await load("/lib/faqs.ts");
  const { faqsEl } = await load("/lib/faqs-el.ts");
  assert.equal(faqsEl.length, faqs.length);
  const { getServices, getProjects } = await load("/lib/localized-content.ts");
  for (const [en, el] of [[getServices("en"), getServices("el")], [getProjects("en"), getProjects("el")]]) {
    assert.deepEqual(el.map(({ slug }) => slug), en.map(({ slug }) => slug));
    // Titles such as "Google Business" and "Website Care" are product names and stay as they are.
    el.forEach((item, index) => assert.notEqual(item.intro ?? item.statement, en[index].intro ?? en[index].statement, `${item.slug} is translated`));
  }
  const { getArticles } = await load("/lib/articles-el.tsx");
  const [en, el] = [getArticles("en"), getArticles("el")];
  el.forEach((article, index) => {
    assert.notEqual(article.title, en[index].title);
    assert.equal(article.faqs.length, en[index].faqs.length);
    assert.equal(article.updated, en[index].updated);
    assert.deepEqual(article.sources, en[index].sources);
  });
});

test("prices and terms in Greek match the English pricing", async () => {
  const [pricing, faqsEl] = await Promise.all([
    readFile(new URL("../views/pricing.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/faqs-el.ts", import.meta.url), "utf8"),
  ]);
  for (const [en, el] of [["€499", "499 €"], ["€699", "699 €"], ["€999", "999 €"], ["€49", "49 €"], ["€69", "69 €"], ["€119", "119 €"]]) {
    assert.ok(pricing.includes(`"${en}"`) && pricing.includes(`"${el}"`), `${en} / ${el}`);
  }
  assert.match(faqsEl, /499 €/);
  assert.match(faqsEl, /ειδοποίηση 30 ημερών/);
  assert.match(faqsEl, /3 μηνών/);
});

test("the confirmation email follows the form's language; the team email stays English", async () => {
  const { clientConfirmationEmail, teamNotificationEmail } = await load("/lib/emails.ts");
  const english = clientConfirmationEmail("contact", { name: "Maria Ioannou", businessName: "Studio One" });
  assert.equal(english.subject, "Thanks for getting in touch | VISION.");
  assert.match(english.html, /<html lang="en">/);
  const greek = clientConfirmationEmail("audit", { name: "Μαρία", businessName: "Studio One", locale: "el" });
  assert.match(greek.subject, /δωρεάν αξιολόγηση/);
  assert.match(greek.html, /<html lang="el">/);
  assert.match(greek.text, /Η αξιολόγησή σας προγραμματίστηκε, Μαρία\./);
  const team = teamNotificationEmail("audit", { businessName: "Studio One", locale: "el" });
  assert.match(team.text, /Site language: Greek/);
  const call = clientConfirmationEmail("contact", { name: "Μαρία", businessName: "Studio One", service: "Call request", requestedTime: "Δευτέρα 9 Νοεμβρίου 2026 στις 20:00 (ώρα Κύπρου)", meetingType: "Phone call", locale: "el" });
  assert.match(call.subject, /αίτημά σας για κλήση/);
  assert.match(call.html, /<html lang="el">/);
  assert.match(call.text, /Τρόπος επικοινωνίας: Τηλεφωνική κλήση/);
});

test("form validation accepts the form language and never rejects a lead over it", async () => {
  const { contactSchema } = await load("/lib/validation.ts");
  const lead = { name: "Maria", businessName: "Studio One", email: "maria@example.com", message: "We need a clearer website that generates enquiries." };
  assert.equal(contactSchema.parse({ ...lead, locale: "el" }).locale, "el");
  assert.equal(contactSchema.parse(lead).locale, "en");
  assert.equal(contactSchema.parse({ ...lead, locale: "fr" }).locale, "en");
});

test("the sitemap lists every page in both languages with hreflang, and nothing private", async () => {
  const xml = await readFile(new URL("../.next/server/app/sitemap.xml.body", import.meta.url), "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, 54);
  assert.equal(new Set(urls).size, urls.length);
  assert.equal(urls.filter((url) => url === "https://vision.cy/gr" || url.startsWith("https://vision.cy/gr/")).length, 27);
  assert.ok(!urls.some((url) => /\/admin|\/api|\/demo|\?/.test(url)));
  assert.match(xml, /<xhtml:link rel="alternate" hreflang="el" href="https:\/\/vision\.cy\/gr\/pricing" \/>/);
  assert.doesNotMatch(xml, /hreflang="gr"/);
});
