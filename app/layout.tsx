import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { AttributionTracker } from "@/components/attribution-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VISION. | Website Design & Digital Growth Cyprus",
    template: "%s | VISION.",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "VISION. | Website Design & Digital Growth Cyprus",
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
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", name: "VISION.", url: siteConfig.url, email: siteConfig.email, slogan: siteConfig.tagline },
    { "@type": "LocalBusiness", name: "VISION.", url: siteConfig.url, areaServed: { "@type": "Country", name: "Cyprus" }, priceRange: "€€", email: siteConfig.email },
    { "@type": "WebSite", name: "VISION.", url: siteConfig.url, inLanguage: "en" },
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
      </body>
    </html>
  );
}
