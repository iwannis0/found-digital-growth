import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@/components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { AttributionTracker } from "@/components/attribution-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/dictionaries";
import { localeSettings, localizePath, type Locale } from "@/lib/i18n";
import { defaultSocialImage } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const homeTitles: Record<Locale, string> = {
  en: "VISION. | Website Design & Local SEO in Cyprus",
  el: "Κατασκευή Ιστοσελίδων & SEO στην Κύπρο | VISION.",
};

/** Defaults for each language's root layout; individual pages override them via pageMetadata(). */
export function rootMetadata(locale: Locale): Metadata {
  const { description } = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: homeTitles[locale], template: "%s | VISION." },
    description,
    openGraph: {
      title: homeTitles[locale],
      description,
      type: "website",
      locale: localeSettings[locale].ogLocale,
      siteName: "VISION.",
      images: [defaultSocialImage],
    },
    twitter: { card: "summary_large_image", title: homeTitles[locale], description, images: [defaultSocialImage] },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

// Runs before first paint and decides whether the intro plays: once per session, never under reduced motion.
const introScript = `try{var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("vision-intro")){sessionStorage.setItem("vision-intro","1");d.dataset.intro="on"}}catch(e){}`;

/** The document shared by both root layouts: consent, tracking, intro, header, footer and business data. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale);
  // Business details for search engines.
  // Social profiles are only listed once their URLs are configured.
  const sameAs = Object.values(siteConfig.socials).filter(Boolean);
  const logo = `${siteConfig.url}/images/logo.png`;
  const homeUrl = `${siteConfig.url}${locale === "en" ? "" : localizePath(locale, "/")}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: "VISION.",
        url: siteConfig.url,
        logo,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        slogan: t.tagline,
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: "VISION.",
        description: t.description,
        url: homeUrl,
        logo,
        image: `${siteConfig.url}${defaultSocialImage}`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        priceRange: "€€",
        knowsLanguage: ["en", "el"],
        address: {
          "@type": "PostalAddress",
          addressCountry: "CY",
        },
        areaServed: [
          ...[
            "Nicosia",
            "Limassol",
            "Larnaca",
            "Paphos",
            "Paralimni",
            "Ayia Napa",
          ].map((name) => ({
            "@type": "City",
            name,
          })),
          {
            "@type": "Country",
            name: "Cyprus",
          },
        ],
        parentOrganization: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: "VISION.",
        url: siteConfig.url,
        inLanguage: ["en", "el"],
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang={localeSettings[locale].htmlLang} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* SiteShell is only ever rendered as a root layout (app/(en) and app/(el)), which is where
          Next expects <head> and beforeInteractive scripts; the lint rules can't see that. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Default Google consent state before GTM loads */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          id="google-consent-default"
          strategy="beforeInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
          `}
        </Script>

        {/* Google Tag Manager, loaded once the page is idle so it never competes with the first render */}
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PTZ6QSVS');
          `}
        </Script>
      </head>

      <body className="antialiased">
        {/* Must run during HTML parsing, before the intro paints. Shipped as server HTML so the
            parser executes it while React (which never runs client-rendered scripts) leaves it alone. */}
        <div className="contents" dangerouslySetInnerHTML={{ __html: `<script>${introScript}</script>` }} />
        <div className="intro" aria-hidden="true">
          <div className="intro-word">
            {"VISION".split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
            <span className="intro-dot">.</span>
          </div>
        </div>

        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PTZ6QSVS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <a className="skip-link" href="#main-content">
          {t.skipLink}
        </a>

        <ScrollToTop />
        <SiteHeader locale={locale} copy={t.header} />

        <div id="main-content">{children}</div>

        <SiteFooter locale={locale} copy={t.footer} tagline={t.tagline} />

        <CookieConsent copy={t.cookies} />
        <AttributionTracker />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
