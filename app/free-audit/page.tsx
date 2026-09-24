import type { Metadata } from "next";
import { PageMotion } from "@/components/page-motion";
import { Eye, Gauge, MapPin, MousePointerClick, Search, Smartphone, Users } from "lucide-react";
import { AuditForm } from "@/components/audit-form";

export const metadata: Metadata = { title: "Free Website Audit Cyprus", description: "Request a free review of your website design, mobile experience, conversion, SEO and Google presence.", alternates: { canonical: "/free-audit" }, openGraph: { images: ["/images/social/found-og-free-audit.jpg"] }, twitter: { card: "summary_large_image", images: ["/images/social/found-og-free-audit.jpg"] } };

const reviewAreas = [[Eye, "Design", "First impression and visual credibility"], [Smartphone, "Mobile", "Usability on the devices customers use"], [MousePointerClick, "Conversion", "Clarity of calls, forms and booking journeys"], [Search, "SEO", "Technical and content foundations"], [MapPin, "Google presence", "Local profile and search alignment"], [Gauge, "Performance", "Speed and technical experience"], [Users, "Trust", "Signals that help customers feel confident"]] as const;

// Illustrative only: same categories and maxima as the real audit scoring.
const exampleScores = [["Design", 12, 20], ["Mobile", 9, 20], ["Conversion", 8, 20], ["SEO", 7, 15], ["Google presence", 6, 15], ["Performance", 5, 10], ["Trust", 7, 10]] as const;

export default function FreeAuditPage() { return <main className="audit-page motion-page"><PageMotion />
  <section className="lit-hero audit-lit-hero"><div className="site-container lit-hero-grid"><div><p className="eyebrow">Free website audit</p><h1>Find your <em>next step.</em></h1><p className="lit-hero-lead">A practical website review with clear priorities for visibility, trust and customer action.</p><p className="audit-deliverable">Written review by email within two working days.</p></div>
    <div className="hero-panel audit-scorecard" aria-label="Example audit scorecard"><p className="hero-panel-head"><span>Example scorecard</span><span>Score</span></p>{exampleScores.map(([area, score, max]) => <div className="scorecard-row" key={area}><span>{area}</span><i><b style={{ width: `${(score / max) * 100}%` }} /></i><small>{score}/{max}</small></div>)}<p className="hero-panel-foot"><span>Overall</span><strong>{exampleScores.reduce((sum, [, score]) => sum + score, 0)}/{exampleScores.reduce((sum, [, , max]) => sum + max, 0)}</strong></p></div>
  </div></section>
  <section className="audit-form-section"><div className="site-container audit-form-grid"><div data-motion="rise"><p className="eyebrow">Your details</p><h2>Give us enough context to make the review useful.</h2><p>Only the essential details are required. Anything else helps us make the review more relevant to your business.</p></div><div className="form-panel" data-motion="rise"><AuditForm /></div></div></section>
  <section className="audit-areas section-pad"><div className="site-container"><p className="eyebrow" data-motion="rise">What we review</p><div className="audit-area-grid">{reviewAreas.map(([Icon, title, body]) => <article key={title} data-motion="rise"><i aria-hidden="true"><Icon /></i><h2>{title}</h2><p>{body}</p></article>)}</div></div></section>
  </main>; }
