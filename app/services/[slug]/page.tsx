import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { PageTracker } from "@/components/analytics";
import { services } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return { title: service.title, description: service.short, alternates: { canonical: `/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const Icon = service.icon;
  const tour = service.slug === "3d-virtual-tours";
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.short, provider: { "@type": "Organization", name: "FOUND.", url: siteConfig.url }, areaServed: { "@type": "Country", name: "Cyprus" }, url: `${siteConfig.url}/services/${service.slug}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Services", item: `${siteConfig.url}/services` }, { "@type": "ListItem", position: 2, name: service.title, item: `${siteConfig.url}/services/${service.slug}` }] },
  ];
  return (
    <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><PageTracker event="service_view" label={service.title} />
      <section className="service-hero"><div className="site-container service-hero-grid">
        <div><p className="eyebrow">{service.eyebrow}</p><h1>{service.headline}</h1><p>{service.intro}</p><Link className="button button-accent button-large" href={tour ? "/contact?service=3D+Virtual+Tours" : "/free-audit"}>{tour ? "Discuss a 3D Project" : "Get a Free Website Audit"}<ArrowRight /></Link></div>
        <div className="service-symbol"><Icon aria-hidden="true" /><span>{service.title}</span></div>
      </div></section>
      <section className="deliverables-section section-pad"><div className="site-container deliverables-grid">
        <div><p className="eyebrow">What is included</p><h2>A complete service, focused on the parts that create value.</h2></div>
        <div className="deliverable-list">{service.benefits.map((benefit) => <div key={benefit}><Check /><span>{benefit}</span></div>)}</div>
      </div></section>
      <section className="result-section"><div className="site-container"><p className="eyebrow">The outcome</p><blockquote>{service.result}</blockquote></div></section>
      <section className="service-note"><div className="site-container"><div><span>01</span><h2>Clear scope</h2><p>You know what is included before the work begins.</p></div><div><span>02</span><h2>Business language</h2><p>We keep the process practical and avoid unnecessary jargon.</p></div><div><span>03</span><h2>Measured next steps</h2><p>We recommend improvements based on the stage and goals of your business.</p></div></div></section>
      <CTASection title={tour ? "Have a space worth exploring?" : "Ready to improve your digital presence?"} label={tour ? "Discuss a 3D Project" : "Get a Free Website Audit"} href={tour ? "/contact?service=3D+Virtual+Tours" : "/free-audit"} />
    </main>
  );
}
