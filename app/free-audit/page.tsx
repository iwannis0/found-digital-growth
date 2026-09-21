import type { Metadata } from "next";
import { Eye, Gauge, MapPin, MousePointerClick, Search, Smartphone, Users } from "lucide-react";
import { AuditForm } from "@/components/audit-form";

export const metadata: Metadata = { title: "Free Website Audit Cyprus", description: "Request a free review of your website design, mobile experience, conversion, SEO and Google presence.", alternates: { canonical: "/free-audit" }, openGraph: { images: ["/images/social/found-og-free-audit.jpg"] }, twitter: { card: "summary_large_image", images: ["/images/social/found-og-free-audit.jpg"] } };

const reviewAreas = [[Eye, "Design", "First impression and visual credibility"], [Smartphone, "Mobile", "Usability on the devices customers use"], [MousePointerClick, "Conversion", "Clarity of calls, forms and booking journeys"], [Search, "SEO", "Technical and content foundations"], [MapPin, "Google presence", "Local profile and search alignment"], [Gauge, "Performance", "Speed and technical experience"], [Users, "Trust", "Signals that help customers feel confident"]] as const;

export default function FreeAuditPage() { return <main className="audit-page">
  <section className="audit-hero"><div className="site-container audit-hero-grid"><div><p className="eyebrow">Free website audit</p><h1>Find your<br />next step<span>.</span></h1><p>A practical website review with clear priorities for visibility, trust and customer action.</p><p className="audit-deliverable">Written review by email within two working days.</p></div><div className="audit-score-visual" aria-label="Seven review areas"><div className="score-ring"><span>7</span><small>Review areas</small></div></div></div></section>
  <section className="audit-areas section-pad"><div className="site-container"><p className="eyebrow">What we review</p><div className="audit-area-grid">{reviewAreas.map(([Icon, title, body]) => <article key={title}><Icon /><h2>{title}</h2><p>{body}</p></article>)}</div></div></section>
  <section className="audit-form-section"><div className="site-container audit-form-grid"><div><p className="eyebrow">Your details</p><h2>Give us enough context to make the review useful.</h2><p>Only the essential details are required. Anything else helps us make the review more relevant to your business.</p></div><div className="form-panel"><AuditForm /></div></div></section>
  </main>; }
