import type { Metadata } from "next";
import { Check, Eye, Gauge, MapPin, MousePointerClick, Search, Smartphone, Users } from "lucide-react";
import { AuditForm } from "@/components/audit-form";

export const metadata: Metadata = { title: "Free Website Audit Cyprus", description: "Request a free review of your website design, mobile experience, conversion, SEO and Google presence." };

const reviewAreas = [[Eye, "Design", "First impression and visual credibility"], [Smartphone, "Mobile", "Usability on the devices customers use"], [MousePointerClick, "Conversion", "Clarity of calls, forms and booking journeys"], [Search, "SEO", "Technical and content foundations"], [MapPin, "Google presence", "Local profile and search alignment"], [Gauge, "Performance", "Speed and technical experience"], [Users, "Trust", "Signals that help customers feel confident"]] as const;

export default function FreeAuditPage() { return <main className="audit-page">
  <section className="audit-hero"><div className="site-container audit-hero-grid"><div><p className="eyebrow">Free website audit</p><h1>Find out what&apos;s holding your website back<span>.</span></h1><p>We&apos;ll review your website across 7 key areas and show you the clearest opportunities to improve credibility, visibility and conversions.</p><div className="audit-reassurance"><span><Check />No invented scores</span><span><Check />No guaranteed rankings</span><span><Check />Practical next steps</span></div></div><div className="audit-score-visual" aria-label="Areas included in the audit"><div className="score-ring"><span>7</span><small>review areas</small></div><p>Design · Mobile · Conversion · SEO · Google · Performance · Trust</p></div></div></section>
  <section className="audit-areas section-pad"><div className="site-container"><p className="eyebrow">What we review</p><div className="audit-area-grid">{reviewAreas.map(([Icon, title, body]) => <article key={title}><Icon /><h2>{title}</h2><p>{body}</p></article>)}</div></div></section>
  <section className="audit-form-section"><div className="site-container audit-form-grid"><div><p className="eyebrow">Your details</p><h2>Give us enough context to make the review useful.</h2><p>Only the essential details are required. Anything else helps us make the review more relevant to your business.</p></div><div className="form-panel"><AuditForm /></div></div></section>
  </main>; }
