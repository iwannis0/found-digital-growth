import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { PageMotion } from "@/components/page-motion";
import { customCapabilities, services } from "@/lib/content";

export const metadata: Metadata = { title: "Website Design, SEO & Digital Foundations", description: "Website design, local SEO, Google Business, website care, analytics and conversion-focused design for Cyprus businesses.", alternates: { canonical: "/services" } };

const orderedServices = ["web-design", "conversion-design", "local-seo", "google-business", "analytics", "website-care"].map((slug) => services.find((service) => service.slug === slug)!);
const automationService = customCapabilities.find(({ slug }) => slug === "automation")!;
const capabilityDescriptions: Record<string, string> = {
  automation: "Practical workflows that connect enquiries, bookings and follow-up steps.",
  "e-commerce": "Product, checkout and purchase journeys built around how the business sells.",
  "booking-systems": "Simple booking flows that make appointments easier for customers and teams.",
  "crm-integrations": "Connect website leads and enquiries with the tools your business already uses.",
  "newsletter-integrations": "Connect sign-ups and forms with your email marketing platform.",
  "custom-functionality": "Extra features and integrations scoped around the needs of the project.",
  multilingual: "Greek, English and other languages, each set up properly for search.",
};

const coreService = services.find((service) => service.slug === "web-design")!;
// Six supporting services evenly spaced on a ring around the website (radius 38%).
const orbitNodes = ([
  ["conversion-design", "Conversion"], ["local-seo", "Local SEO"], ["google-business", "Google Business"],
  ["analytics", "Analytics"], ["website-care", "Website Care"], ["automation", "Automation"],
] as const).map(([slug, label], index) => {
  const angle = (-90 + index * 60) * (Math.PI / 180);
  const Icon = (services.find((service) => service.slug === slug) ?? customCapabilities.find((item) => item.slug === slug))!.icon;
  return { slug, label, Icon, x: +(50 + 38 * Math.cos(angle)).toFixed(2), y: +(50 + 38 * Math.sin(angle)).toFixed(2) };
});

export default function ServicesPage() {
  return (
    <main className="motion-page services-motion-page"><PageMotion />
      <section className="lit-hero services-lit-hero"><div className="site-container lit-hero-grid">
        <div><p className="eyebrow">Services</p><h1>More than <em>a website.</em></h1><p className="lit-hero-lead">FOUND. builds the digital foundation, then adds the visibility, measurement and support your business actually needs.</p></div>
        <div className="service-orbit">
          <svg className="service-orbit-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><circle cx="50" cy="50" r="38" /><circle className="service-orbit-comet" cx="50" cy="50" r="38" pathLength="100" />{orbitNodes.map(({ slug, x, y }) => <line key={slug} x1="50" y1="50" x2={x} y2={y} />)}</svg>
          <Link href={`/services/${coreService.slug}`} className="service-orbit-core"><i><coreService.icon aria-hidden="true" /></i><span>Website</span></Link>
          {orbitNodes.map(({ slug, label, Icon, x, y }) => <Link key={slug} href={`/services/${slug}`} className="service-orbit-node" style={{ left: `${x}%`, top: `${y}%` }}><i><Icon aria-hidden="true" /></i><span>{label}</span></Link>)}
        </div>
      </div></section>
      <section className="directory-section"><div className="site-container service-directory">
        {orderedServices.map((service, index) => { const Icon = service.icon; return (
          <Link href={`/services/${service.slug}`} key={service.slug} className="directory-card" data-motion="rise">
            <div><span>0{index + 1}</span><Icon /></div><h2>{service.title}</h2><p>{service.short}</p><strong>Explore service <ArrowUpRight /></strong>
          </Link>
        ); })}
        <Link href={`/services/${automationService.slug}`} className="directory-card directory-card-wide" data-motion="rise">
          <div><automationService.icon /></div><h2>{automationService.title}</h2><p>{automationService.short}</p><strong>Explore capability <ArrowUpRight /></strong>
        </Link>
      </div></section>
      <section className="custom-capabilities section-pad"><div className="site-container"><p className="eyebrow">Custom capabilities</p><h2 data-motion="rise">More when the project needs it.</h2><p className="custom-capabilities-intro" data-motion="rise">Some projects need extra functionality. We add the right systems, integrations and workflows around the core website when they genuinely help the business.</p><div className="custom-capability-list">{[{ slug: "e-commerce", title: "E-commerce" }, { slug: "booking-systems", title: "Booking systems" }, { slug: "crm-integrations", title: "CRM integrations" }, { slug: "newsletter-integrations", title: "Newsletter integrations" }, { slug: "multilingual", title: "Multilingual websites" }, { slug: "custom-functionality", title: "Custom functionality" }].map((capability, index) => <div data-motion="rise" key={capability.slug}><span>0{index + 1}</span><strong>{capability.title}</strong><small>{capabilityDescriptions[capability.slug]}</small></div>)}</div></div></section>
      <CTASection eyebrow="Where to start" title="Not sure which service comes first?" body="The audit shows which change will make the biggest difference right now." />
    </main>
  );
}
