import type { Metadata } from "next";
import { PageMotion } from "@/components/page-motion";
import { Eye, FileText, Gauge, MapPin, MousePointerClick, Search, Smartphone, Users } from "lucide-react";
import { AuditForm } from "@/components/audit-form";

export const metadata: Metadata = { title: "Free Website Audit Cyprus", description: "Request a free review of your website design, mobile experience, conversion, SEO and Google presence.", alternates: { canonical: "/free-audit" }, openGraph: { images: ["/images/social/found-og-free-audit.jpg"] }, twitter: { card: "summary_large_image", images: ["/images/social/found-og-free-audit.jpg"] } };

const reviewAreas = [[Eye, "Design", "First impression and visual credibility"], [Smartphone, "Mobile", "Usability on the devices customers use"], [MousePointerClick, "Conversion", "Clarity of calls, forms and booking journeys"], [Search, "SEO", "Technical and content foundations"], [MapPin, "Google presence", "Local profile and search alignment"], [Gauge, "Performance", "Speed and technical experience"], [Users, "Trust", "Signals that help customers feel confident"], [FileText, "Content", "Clear messaging and service information"]] as const;

// Illustrative only: the shape of the written review a client receives.
const examplePriorities = [["Add a clear booking button to the first screen", "Conversion", "High"], ["Mobile pages take almost 6 seconds to load", "Performance", "High"], ["Complete the Google Business profile", "Google presence", "Medium"], ["Show reviews and credentials on the homepage", "Trust", "Medium"]] as const;

export default function FreeAuditPage() { return <main className="audit-page motion-page"><PageMotion />
  <section className="lit-hero audit-lit-hero"><div className="site-container lit-hero-grid"><div><p className="eyebrow">Free website audit</p><h1>Find your <em>next step.</em></h1><p className="lit-hero-lead">A practical website review with clear priorities for visibility, trust and customer action.</p><p className="audit-deliverable">Written review by email within two working days.</p></div>
    <div className="hero-panel audit-scorecard" aria-label="Example of the written review"><p className="hero-panel-head"><span>Example review</span><span>Impact</span></p>{examplePriorities.map(([finding, area, impact], index) => <div className="scorecard-row audit-priority" key={finding}><span>0{index + 1}</span><div><strong>{finding}</strong><small>{area}</small></div><em data-impact={impact.toLowerCase()}>{impact}</em></div>)}<p className="hero-panel-foot"><span>{reviewAreas.length} areas reviewed</span><strong>{examplePriorities.length} priorities</strong></p></div>
  </div></section>
  <section className="audit-form-section"><div className="site-container audit-form-grid"><div data-motion="rise"><p className="eyebrow">Your details</p><h2>Give us enough context to make the review useful.</h2><p>Only the essential details are required. Anything else helps us make the review more relevant to your business.</p></div><div className="form-panel" data-motion="rise"><AuditForm /></div></div></section>
  <section className="audit-areas section-pad"><div className="site-container"><p className="eyebrow" data-motion="rise">What we review</p><div className="audit-area-grid">{reviewAreas.map(([Icon, title, body]) => <article key={title} data-motion="rise"><i aria-hidden="true"><Icon /></i><h2>{title}</h2><p>{body}</p></article>)}</div></div></section>
  </main>; }
