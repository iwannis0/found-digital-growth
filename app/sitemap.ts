import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { localizePath, locales, type Locale } from "@/lib/i18n";
import { articleSlugs, projectSlugs, serviceSlugs, staticPaths } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

// When each page's content last changed in a way worth recrawling. Update the date when you
// edit a page's copy; a build alone should not make every page look new. The Greek pages
// launched on greekLaunch, so they never report an earlier date.
const greekLaunch = "2026-11-07";
const contentUpdated: Record<string, string> = {
  "/": "2026-10-12",
  "/services": "2026-10-03",
  "/work": "2026-10-12",
  "/pricing": "2026-10-03",
  "/free-audit": "2026-11-08",
  "/free-prototype": "2026-11-08",
  "/book": "2026-11-08",
  "/articles": "2026-10-13",
  "/about": "2026-09-29",
  "/faq": "2026-10-03",
  "/contact": "2026-11-08",
  "/privacy": "2026-11-08",
  "/terms": "2026-09-27",
  services: "2026-10-12",
  work: "2026-10-12",
};

const priority = (path: string) => (path === "/" ? 1 : path === "/free-audit" || path === "/free-prototype" ? 0.9 : path.startsWith("/articles/") ? 0.8 : 0.7);
const changeFrequency = (path: string) => (path === "/" || path === "/articles" ? "weekly" : "monthly") as "weekly" | "monthly";

function lastModified(path: string, locale: Locale) {
  const article = articles.find((item) => path === `/articles/${item.slug}`);
  const date = article?.updated ?? contentUpdated[path] ?? contentUpdated[path.split("/")[1]];
  return new Date(locale === "el" && date < greekLaunch ? greekLaunch : date);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    ...projectSlugs.map((slug) => `/work/${slug}`),
    ...articleSlugs.map((slug) => `/articles/${slug}`),
  ];
  const absolute = (locale: Locale, path: string) => `${siteConfig.url}${locale === "en" && path === "/" ? "" : localizePath(locale, path)}`;

  // Every page in both languages, each listing its English and Greek versions (hreflang).
  return paths.flatMap((path) => locales.map((locale) => ({
    url: absolute(locale, path),
    lastModified: lastModified(path, locale),
    changeFrequency: changeFrequency(path),
    priority: priority(path),
    alternates: { languages: { en: absolute("en", path), el: absolute("el", path), "x-default": absolute("en", path) } },
  })));
}
