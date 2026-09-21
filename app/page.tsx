import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { BeforeAfter } from "@/components/before-after";
import { CTASection } from "@/components/cta-section";
import { PageMotion } from "@/components/page-motion";
import { SectionHeading } from "@/components/section-heading";
import { processSteps, projects, services } from "@/lib/content";

export default function HomePage() {
  return (
    <main className="motion-page home-motion-page">
      <PageMotion />
      <section className="hero home-hero">
        <div className="site-container home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-hero-eyebrow">Ideas to impact</p>
            <h1>Build smarter<br />digital growth<span>.</span></h1>
            <p className="home-hero-lead">We build websites designed around enquiries and practical digital foundations that help Cyprus businesses get found, trusted and chosen.</p>
            <div className="home-hero-actions">
              <Link className="button button-dark home-hero-button" href="/free-audit">Get a Free Website Audit <ArrowRight aria-hidden="true" /></Link>
              <Link className="button button-outline home-hero-button" href="/work">View our work <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="home-hero-art" aria-label="Illustrative FOUND. website concept">
            <p className="home-handwritten" aria-hidden="true">Growth<br />looks good<br />on you.</p>
            <div className="home-growth-card" aria-hidden="true"><span>Strategy<br />to impact</span><div className="home-growth-bars"><i /><i /><i /><i /></div><strong>Six focus areas</strong><small>One clearer direction</small></div>
            <div className="home-screen" aria-hidden="true">
              <div className="home-screen-top"><b>FOUND<span>.</span></b><span>Websites &nbsp; Visibility &nbsp; Growth</span><i>☰</i></div>
              <div className="home-screen-image"><Image src="/images/home-hero-architecture.webp" alt="" fill sizes="(max-width: 760px) 90vw, 650px" priority /></div>
              <div className="home-screen-copy"><p>Better<br />Brands.<br />Real<br />Growth.</p><small>Made to be found.<br />Built to be chosen.</small></div>
              <div className="home-screen-footer"><span>Ideas / Impact</span><span>01 / 04</span></div>
            </div>
            <div className="home-brand-card" aria-hidden="true"><strong>f<span>.</span></strong><small>A growth partner<br />for what&apos;s next.</small></div>
            <div className="home-analytics-card" aria-hidden="true"><small>Example dashboard</small><strong>Meaningful actions</strong><svg viewBox="0 0 230 62" preserveAspectRatio="none"><path d="M0 52 C22 50 27 36 43 41 S72 52 89 30 S116 43 132 29 S157 37 173 15 S205 29 230 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg><span>Calls · enquiries · bookings</span></div>
            <p className="home-art-caption" aria-hidden="true">From ideas<br />to impact.<br />Together.</p>
          </div>
          <div className="home-service-index" aria-label="What FOUND. can help with">
            {[["01", "Web Design"], ["02", "Development"], ["03", "Local SEO"], ["04", "Google Business"], ["05", "Analytics"], ["06", "Conversion Design"]].map(([number, label]) => <div key={number}><span>{number}</span><strong>{label}</strong></div>)}
          </div>
        </div>
        <div className="site-container home-hero-footnote"><span>Cyprus-based digital growth</span><span>Websites are only the beginning</span></div>
      </section>

      <section className="problem-section section-pad">
        <div className="site-container">
          <SectionHeading className="motion-reveal" eyebrow="The hidden cost" title="Is your online presence costing you customers?" body="A weak or outdated digital presence doesn’t just look bad. It creates doubt, loses visibility and makes the next step harder." />
          <div className="problem-grid">
            {[
              ["01", "Looks outdated", "A poor first impression makes even an excellent business feel less credible than it really is."],
              ["02", "Hard to find", "A beautiful website has little value when customers cannot discover it at the moment they need you."],
              ["03", "Doesn't convert", "Visitors should immediately know how to call, message, book or make an enquiry."],
            ].map(([number, title, body]) => <article key={number} className="problem-item" data-motion="rise"><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <p className="fix-statement" data-motion="rise">We fix all three<span>.</span></p>
        </div>
      </section>

      <section className="services-section section-pad">
        <div className="site-container">
          <SectionHeading className="motion-reveal" eyebrow="More than a website" title="A connected digital presence, built around growth." body="Start with the foundation you need today, then add visibility, measurement and practical support as the business grows." />
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="service-row" data-motion="rise">
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" />
                  <div><h3>{service.title}</h3><p>{service.short}</p></div>
                  <ArrowUpRight className="service-arrow" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="site-container">
          <div className="section-topline"><SectionHeading className="motion-reveal" eyebrow="Selected directions" title="Built to look better. Designed to perform better." body="Five internal concepts, each built around a different customer journey. FOUND. adapts the experience to the business, from appointments and property enquiries to e-commerce and local services." /><Link className="text-link" href="/work">See all concept work <ArrowUpRight /></Link></div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Link href={`/work/${project.slug}`} className={`project-card project-${project.tone}`} key={project.slug} data-motion="rise">
                <div className="project-image-wrap" data-motion-parallax>
                  <Image src={project.image} alt={`${project.name} concept website cover`} fill sizes="(max-width: 900px) 100vw, 50vw" className="project-image" />
                  <span className="concept-badge">Concept Project</span>
                </div>
                <div className="project-meta"><div><span>{project.industry}</span><h3>{project.name}</h3></div><span className="project-index">0{index + 1}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfter />

      <section className="process-section section-pad">
        <div className="site-container">
          <SectionHeading className="motion-reveal" eyebrow="From idea to growth" title="A clear process, without the mystery." body="You always know what is happening, what we need from you and what comes next." light />
          <div className="process-list">
            {processSteps.map(([number, title, body]) => <article key={number} data-motion="rise"><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className="workflow-line" aria-label="Client workflow">
            <Sparkles aria-hidden="true" />
            <p>Audit → Discovery → Proposal → Deposit → Design → Build → QA → Launch → Grow</p>
          </div>
        </div>
      </section>

      <CTASection title="Your digital presence can do more." body="Tell us where the business is today. We will show you the clearest next step." />
    </main>
  );
}
