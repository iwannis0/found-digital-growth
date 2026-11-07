import { localizePath, parsePath, type Locale } from "@/lib/i18n";

// Every public, indexable page, as its English path. Each one also exists in Greek under /gr.
// Kept as plain strings so client components (the language switcher) can import it cheaply;
// tests/i18n-routes.test.mjs checks it stays in step with the services, projects and articles.
export const staticPaths = ["/", "/services", "/work", "/pricing", "/free-audit", "/articles", "/about", "/faq", "/contact", "/privacy", "/terms"] as const;
export const serviceSlugs = ["web-design", "local-seo", "google-business", "website-care", "analytics", "conversion-design", "automation"] as const;
export const projectSlugs = ["aura-dental", "nova-estates", "vela-studio"] as const;
export const articleSlugs = ["website-vs-social-media", "website-cost-cyprus", "wix-vs-professional-website", "signs-website-losing-customers"] as const;

export const publicPaths: readonly string[] = [
  ...staticPaths,
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  ...projectSlugs.map((slug) => `/work/${slug}`),
  ...articleSlugs.map((slug) => `/articles/${slug}`),
];

const publicPathSet = new Set(publicPaths);

/**
 * Where the language switcher should send someone viewing `pathname`.
 * Translated pages go to their twin. The English-only concept demos fall back to
 * their case study, and anything else (admin, 404s) to the other homepage.
 */
export function switchLocaleHref(pathname: string, target: Locale) {
  const { path } = parsePath(pathname);
  if (publicPathSet.has(path)) return localizePath(target, path);
  const demo = path.match(/^\/work\/([^/]+)\/demo(?:\/|$)/);
  if (demo && publicPathSet.has(`/work/${demo[1]}`)) return localizePath(target, `/work/${demo[1]}`);
  return localizePath(target, "/");
}
