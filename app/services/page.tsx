import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { customCapabilities, services } from "@/lib/content";

export const metadata: Metadata = { title: "Website Design, SEO & Digital Foundations", description: "Premium websites, local SEO, Google Business, website care, analytics and conversion-focused design for Cyprus businesses.", alternates: { canonical: "/services" } };

const orderedServices = ["web-design", "conversion-design", "local-seo", "google-business", "analytics", "website-care"].map((slug) => services.find((service) => service.slug === slug)!);
const capabilityDescriptions: Record<string, string> = {
  automation: "Practical workflows that connect enquiries, bookings and follow-up steps.",
  "e-commerce": "Product, checkout and purchase journeys built around how the business sells.",
  "booking-systems": "Simple booking flows that make appointments easier for customers and teams.",
  "crm-integrations": "Connect website leads and enquiries with the tools your business already uses.",
  "newsletter-integrations": "Connect sign-ups and forms with your email marketing platform.",
  "custom-functionality": "Extra features and integrations scoped around the needs of the project.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero"><div className="site-container"><p className="eyebrow">Services</p><h1>More than a website<span>.</span></h1><p>FOUND. builds the digital foundation, then adds the visibility, measurement and support your business actually needs.</p></div></section>
      <section className="directory-section"><div className="site-container service-directory">
        {orderedServices.map((service, index) => { const Icon = service.icon; return (
          <Link href={`/services/${service.slug}`} key={service.slug} className="directory-card">
            <div><span>0{index + 1}</span><Icon /></div><h2>{service.title}</h2><p>{service.short}</p><strong>Explore service <ArrowUpRight /></strong>
          </Link>
        ); })}
      </div></section>
      <section className="custom-capabilities section-pad"><div className="site-container"><p className="eyebrow">Custom capabilities</p><h2>More when the project needs it.</h2><p className="custom-capabilities-intro">Some projects need extra functionality. We add the right systems, integrations and workflows around the core website when they genuinely help the business.</p><div className="custom-capability-list">{[...customCapabilities.filter(({ slug }) => slug === "automation"), { slug: "e-commerce", title: "E-commerce" }, { slug: "booking-systems", title: "Booking systems" }, { slug: "crm-integrations", title: "CRM integrations" }, { slug: "newsletter-integrations", title: "Newsletter integrations" }, { slug: "custom-functionality", title: "Custom functionality" }].map((capability, index) => <div key={capability.slug}><span>0{index + 1}</span><strong>{capability.title}</strong><small>{capabilityDescriptions[capability.slug]}</small></div>)}</div></div></section>
      <CTASection />
    </main>
  );
}
