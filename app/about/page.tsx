import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChartNoAxesColumnIncreasing, Gem, MessageSquareText, Rocket, TrendingUp, Wrench } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { PageMotion } from "@/components/page-motion";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Ioannis Georgiou and Stylianos Panagiotou, the people behind FOUND., a Cyprus digital growth company.",
  alternates: { canonical: "/about" },
};

const founders = [
  {
    name: "Ioannis Georgiou",
    role: "Co-founder · Strategy, structure & communication",
    description: "Ioannis leads discovery, website structure and client communication. He works hands-on across both design and code to turn business priorities into clear customer journeys.",
    education: "Background: Practical branch graduate · BSc Computer Science, University of Cyprus · MSc Artificial Intelligence, UCY (in progress)",
    image: "/images/team/ioannis.webp",
    linkedin: "https://www.linkedin.com/in/ioannis-georgiou-86b304273/",
  },
  {
    name: "Stylianos Panagiotou",
    role: "Co-founder · Design, development & delivery",
    description: "Stylianos leads design direction, development and delivery. He works hands-on across both design and code to make every website clear, reliable and ready to launch.",
    education: "Background: Practical branch graduate · BSc Computer Science, University of Cyprus · MSc Artificial Intelligence, UCY (in progress)",
    image: "/images/team/stylianos.webp",
    linkedin: "https://www.linkedin.com/in/stylianos-panagiotou-0444552a6/",
  },
];

const afterLaunch = [
  ["Launch", "Tested, live and handed over with a clear walkthrough.", Rocket],
  ["Measure", "Calls, enquiries and bookings tracked from day one.", ChartNoAxesColumnIncreasing],
  ["Improve", "Updates, fixes and content changes when you need them.", Wrench],
  ["Grow", "Local SEO and Google Business to bring in more customers.", TrendingUp],
] as const;

export default function AboutPage() {
  return <main className="motion-page about-motion-page"><PageMotion />
    <section className="lit-hero about-lit-hero"><div className="site-container lit-hero-grid">
      <div><p className="eyebrow">The people behind FOUND.</p><h1 id="founders-heading">Two people. <em>One clear direction.</em></h1><p className="lit-hero-lead">Every project is shaped directly by both founders. We share the design and code, while Ioannis leads business clarity, structure and communication, and Stylianos leads visual direction, build quality and delivery.</p></div>
      <div className="founder-stage">{founders.map((founder) => <figure className="founder-hero-card" key={founder.name}><div className="founder-hero-photo"><Image src={founder.image} alt={`${founder.name}, ${founder.role}`} fill unoptimized sizes="(max-width: 900px) 45vw, 260px" priority /></div><figcaption><strong>{founder.name}</strong><span>{founder.role.replace("Co-founder · ", "")}</span></figcaption></figure>)}</div>
    </div></section>
    <section className="founders-section section-pad" aria-labelledby="founders-heading">
      <div className="site-container">
        <div className="founders-grid">
          {founders.map((founder, index) => <article className="founder-profile" key={founder.name}>
            <span className="founder-number">0{index + 1} / FOUND.</span>
            <div className="founder-content">
              <div className="founder-copy" data-motion="rise">
                <h2>{founder.name}</h2>
                <p className="founder-role">{founder.role}</p>
                <p className="founder-description">{founder.description}</p>
                <p className="founder-education">{founder.education}</p>
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on LinkedIn`}>View LinkedIn profile <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="after-launch-section section-pad"><div className="site-container">
      <div className="about-section-head" data-motion="rise"><div><p className="eyebrow">After launch</p><h2>Going live is <em>where the work starts.</em></h2></div><p>We help local businesses turn their website into a practical growth asset, not a one-off project.</p></div>
      <ol className="after-launch-track">{afterLaunch.map(([title, body, Icon], index) => <li key={title} data-motion="rise"><i aria-hidden="true"><Icon /></i><small>0{index + 1}</small><h3>{title}</h3><p>{body}</p></li>)}</ol>
    </div></section>
    <section className="about-values" aria-labelledby="about-values-heading"><div className="site-container"><div className="about-section-head" data-motion="rise"><div><p className="eyebrow">How we work</p><h2 id="about-values-heading">Three things <em>we never skip.</em></h2></div><p>The principles behind every project, whatever its size.</p></div><div className="about-values-grid">
      <article data-motion="rise"><span>01</span><i className="value-icon" aria-hidden="true"><MessageSquareText /></i><h3>Clarity over jargon</h3><p>Clear scope and plain language from the first conversation.</p></article>
      <article data-motion="rise"><span>02</span><i className="value-icon" aria-hidden="true"><Gem /></i><h3>Care in the details</h3><p>Thoughtful design and a website that works as well as it looks.</p></article>
      <article data-motion="rise"><span>03</span><i className="value-icon" aria-hidden="true"><TrendingUp /></i><h3>Progress with purpose</h3><p>Decisions guided by what the business and its customers need.</p></article>
    </div></div></section>
    <section className="audience-section section-pad"><div className="site-container"><p className="eyebrow" data-motion="rise">Built for local ambition</p><h2 data-motion="rise">From retail and local services to property, hospitality and professional expertise.</h2><p data-motion="rise">We work across industries with businesses that value credibility, want a clearer customer journey and are ready to treat digital presence as an ongoing business function.</p><Link className="text-link" href="/services">Explore our services<ArrowRight /></Link></div></section>
    <CTASection />
  </main>;
}
