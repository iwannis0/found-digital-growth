import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { PageMotion } from "@/components/page-motion";
import { ServiceProgress } from "@/components/service-progress";
import { PageTracker } from "@/components/analytics";
import { customCapabilities, legacyServiceAliases, services } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const publicServices = [...services, ...customCapabilities];
function getService(slug: string) {
  const canonicalSlug = legacyServiceAliases[slug as keyof typeof legacyServiceAliases] ?? slug;
  return publicServices.find((item) => item.slug === canonicalSlug);
}

export function generateStaticParams() { return [...publicServices, ...Object.keys(legacyServiceAliases).map((slug) => ({ slug }))].map((item) => typeof item === "string" ? { slug: item } : item); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const canonicalSlug = legacyServiceAliases[slug as keyof typeof legacyServiceAliases] ?? service.slug;
  return { title: service.title, description: service.short, alternates: { canonical: `/services/${canonicalSlug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const Icon = service.icon;
  const tour = service.slug === "3d-virtual-tours";
  const custom = service.slug === "automation";
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.short, provider: { "@type": "Organization", name: "FOUND.", url: siteConfig.url }, areaServed: { "@type": "Country", name: "Cyprus" }, url: `${siteConfig.url}/services/${service.slug}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Services", item: `${siteConfig.url}/services` }, { "@type": "ListItem", position: 2, name: service.title, item: `${siteConfig.url}/services/${service.slug}` }] },
  ];
  return (
    <main className="motion-page service-motion-page"><PageMotion /><ServiceProgress /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><PageTracker event="service_view" label={service.title} />
      <section id="service-overview" className="service-hero"><div className="site-container service-hero-grid">
        <div><p className="eyebrow">{service.eyebrow}</p><h1>{service.headline}</h1><p>{service.intro}</p><Link className="button button-accent button-large" href={tour ? "/contact?service=3D+Virtual+Tours" : custom ? "/contact?service=Lead+%26+Booking+Automation" : "/free-audit"}>{tour ? "Discuss a 3D Project" : custom ? "Discuss a custom capability" : "Get a Free Website Audit"}<ArrowRight /></Link></div>
        <div className="service-symbol"><Icon aria-hidden="true" /><span>{service.title}</span></div>
      </div></section>
      <section id="service-included" className="deliverables-section section-pad"><div className="site-container deliverables-grid">
        <div data-motion="rise"><p className="eyebrow">What is included</p><h2>A complete service, focused on the parts that create value.</h2></div>
        <div className="deliverable-list">{service.benefits.map((benefit) => <div data-motion="rise" key={benefit}><Check aria-hidden="true" /><span>{benefit}</span></div>)}</div>
      </div></section>
      <section id="service-outcome" className="result-section"><div className="site-container" data-motion="rise"><p className="eyebrow">The outcome</p><blockquote>{service.result}</blockquote></div></section>
      <section id="service-approach" className="service-note"><div className="site-container"><div data-motion="rise"><span>01</span><h2>Clear scope</h2><p>You know what is included before the work begins.</p></div><div data-motion="rise"><span>02</span><h2>Business language</h2><p>We keep the process practical and avoid unnecessary jargon.</p></div><div data-motion="rise"><span>03</span><h2>Measured next steps</h2><p>We recommend improvements based on the stage and goals of your business.</p></div></div></section>
      <CTASection title={tour ? "Have a space worth exploring?" : custom ? "Need a practical workflow?" : "Ready to improve your digital presence?"} label={tour ? "Discuss a 3D Project" : custom ? "Discuss a custom capability" : "Get a Free Website Audit"} href={tour ? "/contact?service=3D+Virtual+Tours" : custom ? "/contact?service=Lead+%26+Booking+Automation" : "/free-audit"} />
    </main>
  );
}
