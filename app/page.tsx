import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Phone, Search, Sparkles } from "lucide-react";
import { BeforeAfter } from "@/components/before-after";
import { CTASection } from "@/components/cta-section";
import { SectionHeading } from "@/components/section-heading";
import { processSteps, projects, services } from "@/lib/content";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="site-container hero-grid">
          <div className="hero-copy reveal-up">
            <p className="eyebrow"><span className="status-dot" /> Local digital growth company, Cyprus</p>
            <h1>Your website should <em>bring you business.</em></h1>
            <p className="hero-lead">We build premium websites and digital foundations designed to turn searches and visitors into enquiries, bookings and customers.</p>
            <div className="hero-actions">
              <Link className="button button-dark button-large" href="/free-audit">Get a Free Website Audit <ArrowRight aria-hidden="true" /></Link>
              <Link className="text-link" href="/work">View our work <ArrowUpRight aria-hidden="true" /></Link>
            </div>
            <div className="hero-proof">
              <span><Check /> Clear pricing</span><span><Check /> Built for Cyprus</span><span><Check /> Ongoing support</span>
            </div>
          </div>
          <div className="hero-visual reveal-up delay-1" aria-label="Concept website performance dashboard">
            <div className="browser-chrome"><span /><span /><span /><small>yourbusiness.cy</small></div>
            <div className="showcase-site">
              <div className="showcase-nav"><b>STUDIO<span>.</span></b><span>Services &nbsp; Work &nbsp; Contact</span></div>
              <p>BUILT FOR ATTENTION.<br /><i>DESIGNED FOR ACTION.</i></p>
              <div className="showcase-bottom"><span>Premium digital presence</span><button aria-label="Concept call to action">Start a project ↗</button></div>
            </div>
            <div className="metric-float metric-a"><Search /><span><small>Google visibility</small><strong>Ready to grow</strong></span></div>
            <div className="metric-float metric-b"><Phone /><span><small>Conversion focus</small><strong>Calls · Leads · Bookings</strong></span></div>
          </div>
        </div>
        <div className="site-container capabilities" aria-label="Core capabilities">
          {['Web Design', 'Development', 'Local SEO', 'Google Business', 'Analytics', 'Conversion Design'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="problem-section section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="The hidden cost" title="Is your online presence costing you customers?" body="A weak or outdated digital presence doesn’t just look bad. It creates doubt, loses visibility and makes the next step harder." />
          <div className="problem-grid">
            {[
              ["01", "Looks outdated", "A poor first impression makes even an excellent business feel less credible than it really is."],
              ["02", "Hard to find", "A beautiful website has little value when customers cannot discover it at the moment they need you."],
              ["03", "Doesn't convert", "Visitors should immediately know how to call, message, book or make an enquiry."],
            ].map(([number, title, body]) => <article key={number} className="problem-item"><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <p className="fix-statement">We fix all three<span>.</span></p>
        </div>
      </section>

      <section className="services-section section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="More than a website" title="A connected digital presence, built around growth." body="Start with the foundation you need today, then add visibility, measurement and practical support as the business grows." />
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="service-row">
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
          <div className="section-topline"><SectionHeading eyebrow="Selected directions" title="Built to look better. Designed to perform better." body="Five internal concepts, each built around a different customer journey. FOUND. adapts the experience to the business, from appointments and property enquiries to e-commerce and local services." /><Link className="text-link" href="/work">See all concept work <ArrowUpRight /></Link></div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Link href={`/work/${project.slug}`} className={`project-card project-${project.tone}`} key={project.slug}>
                <div className="project-image-wrap">
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
          <SectionHeading eyebrow="From idea to growth" title="A clear process, without the mystery." body="You always know what is happening, what we need from you and what comes next." light />
          <div className="process-list">
            {processSteps.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
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
