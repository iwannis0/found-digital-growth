import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Website Design, SEO & Digital Growth", description: "Website design, local SEO, analytics, maintenance and automation for Cyprus businesses." };

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero"><div className="site-container"><p className="eyebrow">Services</p><h1>More than a website<span>.</span></h1><p>FOUND. builds the digital foundation, then helps it become easier to discover, measure and improve.</p></div></section>
      <section className="directory-section"><div className="site-container service-directory">
        {services.map((service, index) => { const Icon = service.icon; return (
          <Link href={`/services/${service.slug}`} key={service.slug} className="directory-card">
            <div><span>0{index + 1}</span><Icon /></div><h2>{service.title}</h2><p>{service.short}</p><strong>Explore service <ArrowUpRight /></strong>
          </Link>
        ); })}
      </div></section>
      <section className="service-principle"><div className="site-container"><p>Website <span>→</span> Maintenance <span>→</span> SEO <span>→</span> Ads <span>→</span> Automation <span>→</span> Content</p></div></section>
      <CTASection />
    </main>
  );
}
