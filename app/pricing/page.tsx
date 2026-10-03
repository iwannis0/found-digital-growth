import type { Metadata } from "next";
import { CalendarClock, PencilLine, Receipt } from "lucide-react";
import { Pricing } from "@/components/blocks/pricing";
import { FAQList } from "@/components/faq-list";
import { PageTracker } from "@/components/analytics";
import { PageMotion } from "@/components/page-motion";

export const metadata: Metadata = { title: "Website Design Pricing Cyprus", description: "Website design packages for Cyprus businesses from €599 setup, with optional Website Care from €49 a month. See exactly what each package includes.", alternates: { canonical: "/pricing" } };

const plans = [
  { name: "Professional Website Foundation", short: "Foundation", setup: "€599", monthly: "€49", best: "Small businesses that need a professional, credible online presence.", minutes: "15 minutes", popular: false,
    items: ["Up to 4 pages", "1 design revision round", "Responsive, mobile-first design", "Contact form", "Google Maps", "WhatsApp / click-to-call", "SEO foundations: titles, sitemap and structured data", "Google Analytics setup", "Launch on your domain with SSL"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates"] },
  { name: "Custom Growth Website", short: "Growth", setup: "€899", monthly: "€69", best: "Businesses that want a stronger website built around visibility, enquiries and bookings.", minutes: "30 minutes", popular: true,
    items: ["5 to 7 pages", "2 design revision rounds", "Custom design direction", "Conversion-focused page structure", "Content refinement", "Google Business Profile setup & optimisation", "Local SEO foundations", "Analytics, Search Console & conversion tracking", "Enquiry or booking form", "WhatsApp and click-to-call", "Speed optimisation"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates", "Monthly analytics check"] },
  { name: "Advanced Digital Presence", short: "Advanced", setup: "€1,399", monthly: "€119", best: "Businesses that need a larger website with more functionality, a stronger conversion structure and priority care.", minutes: "60 minutes", popular: false,
    items: ["8 to 10 pages", "3 design revision rounds", "Tailored design direction", "Advanced conversion-focused structure", "Refined interactions and animations", "Editable content / blog (CMS) or booking system integration", "Multilingual-ready structure", "Enhanced Local SEO foundations", "Analytics, Search Console & conversion tracking"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates", "Priority support: reply within one working day", "Quarterly technical & SEO health check"] },
] as const;

const addons = [["Additional page", "Quote"], ["Extra language setup (translation separate)", "€150 to €300+"], ["Advanced third party booking workflow", "€150 to €400+"], ["E-commerce", "Quote"], ["Domain and DNS setup", "Quote"], ["Business email setup", "Quote"], ["Ongoing Local SEO and Google Business", "Quote"], ["Google Ads setup & conversion tracking", "Quote"], ["Lead & booking automation", "Quote"], ["Custom AI integrations", "On request"], ["CRM integration", "Quote"], ["Newsletter integration", "Quote"], ["Monthly analytics reporting", "Quote"], ["Photography & video (through a partner)", "Quote"], ["Website migration after technical review", "Quote"]] as const;

export default function PricingPage() {
  return <main className="motion-page pricing-motion-page"><PageMotion /><PageTracker event="pricing_view" />
    <section className="lit-hero pricing-lit-hero"><div className="site-container lit-hero-grid">
      <div><p className="eyebrow">Transparent pricing</p><h1>Start with the <em>right foundation.</em></h1><p className="lit-hero-lead">Clear starting prices, defined scope and flexible support for businesses at different stages of growth.</p></div>
      <div className="price-summary">
        <div className="price-summary-head"><span>Pricing at a glance</span><span>Setup</span><span>Care / month</span></div>
        {plans.map((plan) => <div className={`price-summary-row${plan.popular ? " is-popular" : ""}`} key={plan.name}><span>{plan.name}{plan.popular && <em>Most popular</em>}</span><strong>{plan.setup}</strong><small>{plan.monthly}</small></div>)}
        <div className="price-summary-foot"><span><b>50%</b> deposit to begin</span><span><b>50%</b> before launch</span><span>Website Care is optional</span></div>
      </div>
    </div></section>
    <section className="pricing-section section-pad"><div className="site-container"><Pricing plans={plans} /><p className="pricing-scope-note">Prices are starting points. Final scope, content, integrations and timeline are agreed before work begins.</p></div></section>
    <section className="maintenance-policy"><div className="site-container policy-grid"><div data-motion="rise"><p className="eyebrow">Website Care policy</p><h2>Small updates, handled.</h2><p>Website Care is available after launch for businesses that want ongoing hosting, backups, monitoring, technical support and minor content updates.</p></div><div className="policy-item" data-motion="rise"><i aria-hidden="true"><PencilLine /></i><h3>Included minor updates</h3><p>Included minor updates can cover text changes, image replacements, contact details, opening hours and small content adjustments.</p></div><div className="policy-item" data-motion="rise"><i aria-hidden="true"><Receipt /></i><h3>Quoted separately</h3><p>New pages, custom functionality, integrations, redesign work, large content uploads and other work outside the agreed package are quoted separately.</p></div><div className="policy-note" data-motion="rise"><i aria-hidden="true"><CalendarClock /></i><div><p>Unused maintenance time does not roll over.</p><p>Website Care has an initial 3-month minimum term. After that, it continues month-to-month and can be cancelled with 30 days’ notice.</p></div></div></div></section>
    <section className="addons-section section-pad"><div className="site-container"><div data-motion="rise"><p className="eyebrow">Optional growth services</p><h2>Build around what the business actually needs.</h2></div><div className="addons-list">{addons.map(([name, price]) => <div key={name} data-motion="rise"><span>{name}</span><strong>{price}</strong></div>)}</div></div></section>
    <section className="pricing-faq section-pad"><div className="site-container faq-grid"><div data-motion="rise"><p className="eyebrow">Questions before you choose</p><h2>What business owners usually want to know.</h2></div><FAQList limit={8} /></div></section>
  </main>;
}
