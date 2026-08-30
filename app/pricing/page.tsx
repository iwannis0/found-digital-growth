import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FAQList } from "@/components/faq-list";
import { PageTracker } from "@/components/analytics";

export const metadata: Metadata = { title: "Website Design Pricing Cyprus", description: "Transparent website packages for Cyprus local businesses, from €690 setup." };

const plans = [
  { name: "Starter", setup: "€690", monthly: "€59", best: "Small local businesses that need a professional online presence.", minutes: "15 minutes", popular: false, items: ["Up to 4 pages", "Responsive design", "Contact form", "Google Maps", "WhatsApp", "Basic SEO", "Google Analytics", "Hosting and SSL", "Maintenance"] },
  { name: "Growth", setup: "€990", monthly: "€79", best: "Businesses that want their website to generate enquiries.", minutes: "30 minutes", popular: true, items: ["5 to 7 pages", "Premium custom design", "Copywriting assistance", "Google Business optimisation", "Analytics and Search Console", "Local SEO foundations", "Conversion tracking", "WhatsApp and click-to-call", "Enquiry or booking form", "Speed optimisation", "Hosting, backups and maintenance"] },
  { name: "Premium", setup: "€1,490", monthly: "€149", best: "Businesses where digital presence directly affects revenue.", minutes: "60 minutes", popular: false, items: ["8 to 12 pages", "High-end custom design", "Premium interactions", "Advanced animations", "Bilingual capability", "CMS and blog", "Booking integration", "Advanced Local SEO setup", "Conversion tracking", "Priority support"] },
] as const;

const addons = [["Extra language", "€150 to €300+"], ["Advanced booking", "€150 to €400+"], ["Local SEO", "€200 to €500/month"], ["Google Ads management", "€200 to €400/month, excluding spend"], ["AI chatbot / automation", "€100 to €300/month"], ["Custom integrations", "Quote"], ["3D Virtual Tours", "Quote"], ["Professional photography", "Quote"], ["Videography", "Quote"], ["Advanced copywriting", "Quote"]] as const;

export default function PricingPage() {
  return <main><PageTracker event="pricing_view" />
    <section className="page-hero pricing-hero"><div className="site-container"><p className="eyebrow">Transparent pricing</p><h1>Start with the right foundation<span>.</span></h1><p>Clear setup costs, ongoing care and a realistic path to more advanced growth services.</p><div className="payment-note"><strong>50%</strong><span>deposit to begin</span><strong>50%</strong><span>before launch</span></div></div></section>
    <section className="pricing-section section-pad"><div className="site-container pricing-grid">
      {plans.map((plan) => <article className={`pricing-card ${plan.popular ? "pricing-popular" : ""}`} key={plan.name}>
        {plan.popular && <span className="popular-badge">Most Popular</span>}<p className="plan-name">{plan.name}</p><div className="price-line"><strong>{plan.setup}</strong><span>setup</span></div><div className="monthly-line"><strong>{plan.monthly}</strong><span>/ month</span></div><p className="plan-best">{plan.best}</p>
        <ul>{plan.items.map((item) => <li key={item}><Check />{item}</li>)}<li><Check />Up to {plan.minutes} minor updates/month</li></ul>
        <Link className={`button button-large ${plan.popular ? "button-accent" : "button-dark"}`} href={`/contact?package=${plan.name}`} data-track="pricing_cta_click" data-track-label={plan.name}>Choose {plan.name}<ArrowRight /></Link>
      </article>)}
    </div></section>
    <section className="maintenance-policy"><div className="site-container policy-grid"><div><p className="eyebrow">Maintenance policy</p><h2>Small updates, handled.</h2></div><div><h3>Included</h3><p>Text changes, image replacements, contact details, opening hours and small content adjustments.</p></div><div><h3>Quoted separately</h3><p>New pages, systems, full redesigns, integrations, large content uploads and custom development.</p></div><p className="policy-note">Unused maintenance time does not roll over.</p></div></section>
    <section className="addons-section section-pad"><div className="site-container"><p className="eyebrow">Optional add-ons</p><h2>Build around what the business actually needs.</h2><div className="addons-list">{addons.map(([name, price]) => <div key={name}><span>{name}</span><strong>{price}</strong></div>)}</div></div></section>
    <section className="pricing-faq section-pad"><div className="site-container faq-grid"><div><p className="eyebrow">Questions before you choose</p><h2>What business owners usually want to know.</h2></div><FAQList limit={8} /></div></section>
    <section className="cta-section"><div className="site-container cta-inner"><div><p className="eyebrow">Not sure which plan fits?</p><h2>Let the audit make it clearer.</h2><p>We will review the current position and recommend the most sensible starting point.</p></div><Link className="button button-dark button-large" href="/free-audit">Get a Free Website Audit<ArrowRight /></Link></div></section>
  </main>;
}
