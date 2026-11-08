// The site is served in English at the root and in Greek under /gr.
// "el" is the language code (used for lang, hreflang and code); "/gr" is only the URL prefix.
export const locales = ["en", "el"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeSettings = {
  en: { htmlLang: "en", ogLocale: "en_GB", prefix: "", label: "EN", name: "English", dateLocale: "en-GB" },
  el: { htmlLang: "el", ogLocale: "el_CY", prefix: "/gr", label: "ΕΛ", name: "Ελληνικά", dateLocale: "el-GR" },
} as const;

/** Turns an English path ("/services", "/contact?service=SEO", "/") into the same page in `locale`. */
export function localizePath(locale: Locale, path: string) {
  if (locale === "en" || !path.startsWith("/")) return path;
  if (path === "/") return "/gr";
  if (path.startsWith("/?") || path.startsWith("/#")) return `/gr${path.slice(1)}`;
  return `/gr${path}`;
}

/** Splits a pathname into its locale and the English path it corresponds to. */
export function parsePath(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/gr" || pathname === "/gr/") return { locale: "el", path: "/" };
  if (pathname.startsWith("/gr/")) return { locale: "el", path: pathname.slice(3) };
  return { locale: "en", path: pathname || "/" };
}
