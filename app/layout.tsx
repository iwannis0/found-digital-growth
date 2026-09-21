import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { AttributionTracker } from "@/components/attribution-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "FOUND. | Website Design & Digital Growth Cyprus",
    template: "%s | FOUND.",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "FOUND. | Website Design & Digital Growth Cyprus",
    description: siteConfig.description,
    type: "website",
    locale: "en_CY",
    siteName: "FOUND.",
    images: ["/images/social/found-og-default.jpg"],
  },
  twitter: { card: "summary_large_image", title: "FOUND.", description: siteConfig.description, images: ["/images/social/found-og-default.jpg"] },
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
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Organization", name: "FOUND.", url: siteConfig.url, email: siteConfig.email, slogan: siteConfig.tagline },
    { "@context": "https://schema.org", "@type": "LocalBusiness", name: "FOUND.", url: siteConfig.url, areaServed: { "@type": "Country", name: "Cyprus" }, priceRange: "€€", email: siteConfig.email },
    { "@context": "https://schema.org", "@type": "WebSite", name: "FOUND.", url: siteConfig.url, inLanguage: "en" },
  ];
  return (
    <html lang="en">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
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
