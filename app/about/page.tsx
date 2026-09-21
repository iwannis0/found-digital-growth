import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

export default function AboutPage() {
  return <main className="motion-page about-motion-page"><PageMotion />
    <section className="founders-section section-pad" aria-labelledby="founders-heading">
      <div className="site-container">
        <div className="founders-intro">
          <p className="eyebrow">The people behind FOUND.</p>
          <h1 id="founders-heading">Two people. One clear direction.</h1>
          <p>Every project is shaped directly by both founders. We share the design and code, while Ioannis leads business clarity, structure and communication, and Stylianos leads visual direction, build quality and delivery.</p>
        </div>
        <div className="founders-grid">
          {founders.map((founder, index) => <article className="founder-profile" key={founder.name}>
            <span className="founder-number">0{index + 1} / FOUND.</span>
            <div className="founder-content">
              <div className="founder-portrait">
                <Image src={founder.image} alt={`${founder.name}, ${founder.role}`} fill unoptimized sizes="(max-width: 760px) 160px, 190px" />
              </div>
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
    <section className="page-hero about-hero about-story">
      <div className="site-container">
        <p className="eyebrow" data-motion="rise">About FOUND.</p>
        <h2 data-motion="rise">We do not stop at<br /><em>“your site is live.”</em></h2>
        <p data-motion="rise">FOUND. exists to help ambitious local businesses build a sharper digital presence and turn it into a practical growth asset.</p>
      </div>
    </section>
    <section className="about-values" aria-labelledby="about-values-heading"><div className="site-container"><p className="eyebrow">How we work</p><h2 id="about-values-heading">A practical way to build better.</h2><div className="about-values-grid">
      <article data-motion="rise"><span>01</span><h3>Clarity over jargon</h3><p>Clear scope and plain language from the first conversation.</p></article>
      <article data-motion="rise"><span>02</span><h3>Care in the details</h3><p>Thoughtful design and a website that works as well as it looks.</p></article>
      <article data-motion="rise"><span>03</span><h3>Progress with purpose</h3><p>Decisions guided by what the business and its customers need.</p></article>
    </div></div></section>
    <section className="audience-section section-pad"><div className="site-container"><p className="eyebrow">Built for local ambition</p><h2 data-motion="rise">From retail and local services to property, hospitality and professional expertise.</h2><p data-motion="rise">We work across industries with businesses that value credibility, want a clearer customer journey and are ready to treat digital presence as an ongoing business function.</p><Link className="text-link" href="/services">Explore our services<ArrowRight /></Link></div></section>
    <CTASection />
  </main>;
}
