import type { Metadata } from "next";
import { localeSettings, localizePath, type Locale } from "@/lib/i18n";

export const defaultSocialImage = "/images/social/og-default.jpg";

type PageMetadataInput = {
  locale: Locale;
  /** The English path of the page; the Greek path is derived from it. */
  path: string;
  /** Page title without the brand; " | VISION." is appended unless `absoluteTitle` is set. */
  title: string;
  description: string;
  absoluteTitle?: boolean;
  image?: string;
  /** Set to false for pages that exist in one language only. */
  translated?: boolean;
  article?: { publishedTime: string; modifiedTime: string };
};

/**
 * One place for a page's search and sharing tags: a self-referencing canonical, reciprocal
 * hreflang links (en, el and x-default → English), and Open Graph / Twitter tags that
 * describe this page rather than inheriting the homepage's.
 */
export function pageMetadata({ locale, path, title, description, absoluteTitle = false, image = defaultSocialImage, translated = true, article }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | VISION.`;
  const url = localizePath(locale, path);
  const otherLocale: Locale = locale === "en" ? "el" : "en";

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      ...(translated ? { languages: { en: path, el: localizePath("el", path), "x-default": path } } : {}),
    },
    openGraph: {
      type: article ? "article" : "website",
      siteName: "VISION.",
      title: fullTitle,
      description,
      url,
      locale: localeSettings[locale].ogLocale,
      ...(translated ? { alternateLocale: [localeSettings[otherLocale].ogLocale] } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: "VISION." }],
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
