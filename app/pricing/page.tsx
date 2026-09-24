import type { Metadata } from "next";
import { CalendarClock, PencilLine, Receipt } from "lucide-react";
import { Pricing } from "@/components/blocks/pricing";
import { FAQList } from "@/components/faq-list";
import { PageTracker } from "@/components/analytics";
import { PageMotion } from "@/components/page-motion";

export const metadata: Metadata = { title: "Website Design Pricing Cyprus", description: "Transparent website packages for Cyprus local businesses, from €550 setup.", alternates: { canonical: "/pricing" } };

const plans = [
  { name: "Professional Website Foundation", short: "Foundation", setup: "€550", monthly: "€49", best: "Small businesses that need a professional, credible online presence.", minutes: "15 minutes", popular: false, items: ["Up to 4 pages", "1 design revision round", "Responsive design", "Contact form", "Google Maps", "WhatsApp / click-to-call", "SEO foundations", "Basic analytics setup", "Managed hosting, SSL & backups", "Website Care"] },
  { name: "Custom Growth Website", short: "Growth", setup: "€850", monthly: "€69", best: "Businesses that want a stronger website built around visibility, enquiries and bookings.", minutes: "30 minutes", popular: true, items: ["5 to 7 pages", "2 design revision rounds", "Custom design direction", "Conversion-focused page structure", "Copywriting assistance", "Google Business profile setup & optimisation", "Analytics & Search Console setup", "Local SEO foundations", "Conversion tracking", "WhatsApp and click-to-call", "Enquiry or booking form", "Speed optimisation", "Managed hosting, SSL, backups & monitoring", "Website Care"] },
  { name: "Advanced Digital Presence", short: "Advanced", setup: "€1,350", monthly: "€119", best: "Businesses that need a larger and more advanced digital presence with additional functionality, stronger conversion structure and priority care.", minutes: "60 minutes", popular: false, items: ["8 to 12 pages", "3 design revision rounds", "Tailored design direction", "Advanced conversion-focused structure", "Refined interactions", "Advanced animations", "Multilingual-ready architecture", "CMS / blog", "Booking integration", "Enhanced Local SEO foundations", "Analytics & conversion tracking setup", "Priority support", "Managed hosting, SSL, backups & monitoring", "Post-launch technical health checks"] },
] as const;

const addons = [["Extra language setup", "€150 to €300+"], ["Advanced booking", "€150 to €400+"], ["E-commerce", "Quote"], ["Ongoing Local SEO", "Quote"], ["Google Business ongoing optimisation", "Quote"], ["Google Ads / Paid Acquisition", "Quote"], ["Lead & Booking Automation", "Quote"], ["AI Chatbots & Automation", "Quote"], ["CRM integration", "Quote"], ["Newsletter integration", "Quote"], ["Advanced Analytics & Reporting", "Quote"], ["Content & Digital Presence", "Quote"], ["Professional photography", "Quote"], ["Videography", "Quote"], ["Advanced copywriting", "Quote"], ["Website migration", "Quote"]] as const;

export default function PricingPage() {
  return <main className="motion-page pricing-motion-page"><PageMotion /><PageTracker event="pricing_view" />
    <section className="lit-hero pricing-lit-hero"><div className="site-container lit-hero-grid">
      <div><p className="eyebrow">Transparent pricing</p><h1>Start with the <em>right foundation.</em></h1><p className="lit-hero-lead">Clear setup costs, practical ongoing care and room to add more as the business grows.</p></div>
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
