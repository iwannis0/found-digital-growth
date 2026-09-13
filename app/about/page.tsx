import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = { title: "About", description: "FOUND. is a Cyprus local digital growth company focused on websites, visibility and measurable customer actions.", alternates: { canonical: "/about" } };

export default function AboutPage() { return <main>
  <section className="page-hero about-hero"><div className="site-container"><p className="eyebrow">About FOUND.</p><h1>We do not stop at<br /><em>“your site is live.”</em></h1><p>FOUND. exists to help ambitious local businesses build a sharper digital presence and turn it into a practical growth asset.</p></div></section>
  <section className="belief-section section-pad"><div className="site-container belief-grid"><p className="eyebrow">Our point of view</p><blockquote>A website is only valuable when the right people can find it, trust it and know what to do next.</blockquote><div><p>That is why our work connects design with visibility, measurement and ongoing digital growth.</p><p>We use plain language, document the scope and recommend the level of complexity the business actually needs.</p></div></div></section>
  <section className="values-section"><div className="site-container values-grid">{[["01","Clarity over jargon","Business owners should understand what they are buying and why it matters."],["02","Quality without theatre","Premium execution should be visible in the details, not inflated claims."],["03","Progress over promises","We measure real actions and improve what the evidence supports."],["04","Long-term usefulness","The website should remain maintainable and ready for the next stage of growth."]].map(([n,t,b]) => <article key={n}><span>{n}</span><h2>{t}</h2><p>{b}</p></article>)}</div></section>
  <section className="audience-section section-pad"><div className="site-container"><p className="eyebrow">Built for local ambition</p><h2>From retail and local services to property, hospitality and professional expertise.</h2><p>We work across industries with businesses that value credibility, want a clearer customer journey and are ready to treat digital presence as an ongoing business function.</p><Link className="text-link" href="/services">Explore our services<ArrowRight /></Link></div></section>
  <CTASection />
  </main>; }
