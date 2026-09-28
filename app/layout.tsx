import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { AttributionTracker } from "@/components/attribution-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VISION. | Website Design & Local SEO in Cyprus",
    template: "%s | VISION.",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "VISION. | Website Design & Local SEO in Cyprus",
    description: siteConfig.description,
    type: "website",
    locale: "en_CY",
    siteName: "VISION.",
    images: ["/images/social/og-default.jpg"],
  },
  twitter: { card: "summary_large_image", title: "VISION.", description: siteConfig.description, images: ["/images/social/og-default.jpg"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Business details for search engines. Social profiles are only listed once their URLs are configured.
  const sameAs = Object.values(siteConfig.socials).filter(Boolean);
  const logo = `${siteConfig.url}/images/logo.png`;
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: "VISION.", url: siteConfig.url, logo, email: siteConfig.email, telephone: siteConfig.phone, slogan: siteConfig.tagline, ...(sameAs.length ? { sameAs } : {}) },
    { "@type": "ProfessionalService", "@id": `${siteConfig.url}/#business`, name: "VISION.", description: siteConfig.description, url: siteConfig.url, logo, image: `${siteConfig.url}/images/social/og-default.jpg`, email: siteConfig.email, telephone: siteConfig.phone, priceRange: "€€", address: { "@type": "PostalAddress", addressCountry: "CY" },
      areaServed: [...["Nicosia", "Limassol", "Larnaca", "Paphos"].map((name) => ({ "@type": "City", name })), { "@type": "Country", name: "Cyprus" }], parentOrganization: { "@id": `${siteConfig.url}/#organization` } },
    { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: "VISION.", url: siteConfig.url, inLanguage: "en", publisher: { "@id": `${siteConfig.url}/#organization` } },
  ] };
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ScrollToTop />
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <CookieConsent />
        <AttributionTracker />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
