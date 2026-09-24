import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageMotion } from "@/components/page-motion";
import { ServiceProgress } from "@/components/service-progress";
import { PageTracker } from "@/components/analytics";
import { customCapabilities, legacyServiceAliases, services } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

type ServiceDetail = { eyebrow: string; title: string; intro: string; items: Array<{ label: string; body: string }> };
type ServiceApproach = Array<{ title: string; body: string }>;

const serviceDetails: Record<string, ServiceDetail> = {
  "web-design": {
    eyebrow: "What the build looks like",
    title: "A website scoped around the business, not a template.",
    intro: "The final page count, content and integrations are agreed after discovery. These are the practical areas we define before design begins.",
    items: [
      { label: "Typical timeline", body: "A focused small-business website usually takes 4 to 8 weeks once content and feedback are available." },
      { label: "Page scope", body: "Most projects begin with 4 to 12 essential service, trust, contact and conversion pages." },
      { label: "Integrations", body: "Calls, WhatsApp, forms, booking tools, maps and analytics are selected around the customer journey." },
    ],
  },
  "local-seo": {
    eyebrow: "The first 90 days",
    title: "Search visibility grows from consistent local signals.",
    intro: "Local SEO is not an overnight ranking promise. The first three months focus on making your services, service areas and website signals easier for search engines to understand.",
    items: [
      { label: "Days 1–30", body: "Research the business, local searches, competitors and technical priorities." },
      { label: "Days 31–60", body: "Improve service and location structure, metadata, internal links and search setup." },
      { label: "Days 61–90", body: "Check indexing, visibility signals and the next content or optimisation priorities." },
    ],
  },
  "google-business": {
    eyebrow: "Profile checklist",
    title: "Small profile details shape the first local impression.",
    intro: "A strong Google Business Profile makes it easier for nearby customers to trust the business and take action before they even reach the website.",
    items: [
      { label: "Accurate foundations", body: "Correct category, hours, contact details, service area and website link." },
      { label: "Useful information", body: "Clear services, descriptions, photos and answers to the questions customers ask first." },
      { label: "A clear next step", body: "A profile aligned with calls, directions, website visits, reviews and enquiries." },
    ],
  },
  analytics: {
    eyebrow: "What we measure",
    title: "Measure the actions that show real intent.",
    intro: "Traffic alone does not tell you whether the website is helping the business. We configure measurement around the customer signals that matter after a visit.",
    items: [
      { label: "Calls & WhatsApp", body: "See when visitors choose a direct conversation from the website." },
      { label: "Forms & bookings", body: "Track submitted enquiries and clicks that begin an appointment or booking journey." },
      { label: "Campaign source", body: "Understand which search, social or campaign source created useful evidence for an action." },
    ],
  },
  "conversion-design": {
    eyebrow: "Customer journeys",
    title: "The right action depends on the business.",
    intro: "Conversion design means choosing the most useful action for the way customers decide, rather than adding the same button to every page.",
    items: [
      { label: "Calls & WhatsApp", body: "For local services where a fast conversation is the easiest route forward." },
      { label: "Bookings", body: "For consultations, treatments, classes and appointments where availability matters." },
      { label: "Enquiries & quotes", body: "For considered purchases, projects and services that need useful context before a response." },
    ],
  },
  "website-care": {
    eyebrow: "What care covers",
    title: "Keep routine website work consistent and well maintained.",
    intro: "Website Care supports technical health and small monthly changes. Larger improvements are scoped separately so there are no surprises.",
    items: [
      { label: "Minor updates", body: "Text, images, contact details, opening hours and small content adjustments." },
      { label: "Technical care", body: "Hosting, backups, monitoring, updates and routine form or performance checks." },
      { label: "Quoted separately", body: "New pages, redesigns, integrations, custom features and large content uploads." },
    ],
  },
  automation: {
    eyebrow: "When automation helps",
    title: "Remove repetitive steps without overcomplicating the business.",
    intro: "Automation is added only when it makes a follow-up, booking or handover process clearer for the team and the customer.",
    items: [
      { label: "Lead handover", body: "Send a website enquiry to the right inbox, CRM or internal workflow." },
      { label: "Booking follow-up", body: "Connect booking confirmations and useful next steps after an appointment is made." },
      { label: "Simple by design", body: "Keep the workflow easy to understand, manage and change as the business grows." },
    ],
  },
};

const serviceCtas: Record<string, string> = {
  "web-design": "Get a Free Website Audit",
  "local-seo": "Review my local visibility",
  "google-business": "Review my Google profile",
  "website-care": "Review my website health",
  analytics: "Review what to track",
  "conversion-design": "Review my conversion path",
};

const serviceApproaches: Record<string, ServiceApproach> = {
  "web-design": [
    { title: "Define the foundation", body: "We agree the pages, content priorities and integrations before visual design begins." },
    { title: "Design for decisions", body: "Structure, messaging and trust signals are shaped around the action each visitor needs to take." },
    { title: "Build and launch", body: "The website is developed responsively, tested and prepared for a confident launch." },
  ],
  "local-seo": [
    { title: "Understand local demand", body: "We review the services, locations and searches that matter most to the business." },
    { title: "Strengthen local signals", body: "We improve the technical, content and location signals search engines need to understand." },
    { title: "Review the evidence", body: "We check indexing, visibility and the priorities that follow without promising unrealistic rankings." },
  ],
  "google-business": [
    { title: "Audit the profile", body: "We check categories, contact details, services, photos and the information customers see first." },
    { title: "Make actions clearer", body: "Calls, directions, reviews and website visits are aligned with the right next step." },
    { title: "Keep it accurate", body: "The profile is left clear and practical for the business to keep current after launch." },
  ],
  "website-care": [
    { title: "Protect technical health", body: "Hosting, backups, monitoring and technical updates keep the website dependable." },
    { title: "Handle routine changes", body: "Small content updates stay simple, from opening hours to text and image changes." },
    { title: "Scope larger work clearly", body: "New pages, redesigns and integrations are discussed separately before work begins." },
  ],
  analytics: [
    { title: "Choose meaningful actions", body: "We identify the calls, forms, bookings and journeys that show real customer intent." },
    { title: "Connect the signals", body: "Analytics and tracking are set up around those actions, with reporting that stays useful." },
    { title: "Use the evidence", body: "The resulting data helps guide future website or marketing decisions." },
  ],
  "conversion-design": [
    { title: "Clarify the decision", body: "We identify what visitors need to understand before they are ready to act." },
    { title: "Design the path", body: "Content hierarchy, reassurance and calls to action are shaped around the right journey." },
    { title: "Improve with intent", body: "The path can then be refined using the actions visitors actually take." },
  ],
  automation: [
    { title: "Map the handover", body: "We find the repeated step between an enquiry, booking or form and the team that handles it." },
    { title: "Build only what helps", body: "One practical workflow is scoped around the tools and process the business already uses." },
    { title: "Keep ownership clear", body: "The workflow is tested and explained so the team can understand and manage it." },
  ],
};

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
  const custom = service.slug === "automation";
  const detail = serviceDetails[service.slug];
  const ctaLabel = custom ? "Discuss a custom capability" : serviceCtas[service.slug] ?? "Get a Free Website Audit";
  const approach = serviceApproaches[service.slug];
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.short, provider: { "@type": "Organization", name: "FOUND.", url: siteConfig.url }, areaServed: { "@type": "Country", name: "Cyprus" }, url: `${siteConfig.url}/services/${service.slug}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Services", item: `${siteConfig.url}/services` }, { "@type": "ListItem", position: 2, name: service.title, item: `${siteConfig.url}/services/${service.slug}` }] },
  ];
  return (
    <main className="motion-page service-motion-page"><PageMotion /><ServiceProgress /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><PageTracker event="service_view" label={service.title} />
      <section id="service-overview" className="service-hero"><div className="site-container service-hero-grid">
        <div><p className="eyebrow">{service.eyebrow}</p><h1>{service.headline}</h1><p>{service.intro}</p><Link className="button button-accent button-large" href={custom ? "/contact?service=Lead+%26+Booking+Automation" : "/free-audit"}>{ctaLabel}<ArrowRight /></Link></div>
        <div className="service-symbol"><Icon aria-hidden="true" /><span>{service.title}</span></div>
      </div></section>
      <section id="service-included" className="deliverables-section section-pad"><div className="site-container deliverables-grid">
        <div data-motion="rise"><p className="eyebrow">What is included</p><h2>A complete service, focused on the parts that create value.</h2></div>
        <div className="deliverable-list">{service.benefits.map((benefit) => <div data-motion="rise" key={benefit}><Check aria-hidden="true" /><span>{benefit}</span></div>)}</div>
      </div></section>
      {detail && <section id="service-detail" className="service-detail-section section-pad"><div className="site-container"><div className="service-detail-intro" data-motion="rise"><p className="eyebrow">{detail.eyebrow}</p><h2>{detail.title}</h2><p>{detail.intro}</p></div><div className="service-detail-grid">{detail.items.map((item, index) => <article data-motion="rise" key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.body}</p></article>)}</div></div></section>}
      <section id="service-outcome" className="result-section"><div className="site-container" data-motion="rise"><p className="eyebrow">The outcome</p><blockquote>{service.result}</blockquote></div></section>
      <section id="service-approach" className="service-note"><div className="site-container">{approach.map((step, index) => <div data-motion="rise" key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{step.title}</h2><p>{step.body}</p></div>)}</div></section>
    </main>
  );
}
