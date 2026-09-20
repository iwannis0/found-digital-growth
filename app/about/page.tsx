import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Ioannis Georgiou and Stylianos Panagiotou, the people behind FOUND., a Cyprus digital growth company.",
  alternates: { canonical: "/about" },
};

const founders = [
  {
    name: "Ioannis Georgiou",
    role: "Co-founder · Client strategy",
    description: "Ioannis is a Computer Science graduate of the University of Cyprus and is currently completing an MSc in Artificial Intelligence at UCY. He works with clients to define a clear scope and keep the work focused on useful outcomes.",
    education: "Practical branch graduate · BSc Computer Science, University of Cyprus · MSc Artificial Intelligence, UCY (in progress)",
    image: "/images/team/ioannis.webp",
    linkedin: "https://www.linkedin.com/in/ioannis-georgiou-86b304273/",
  },
  {
    name: "Stylianos Panagiotou",
    role: "Co-founder · Design & delivery",
    description: "Stylianos is a Computer Science graduate of the University of Cyprus and is currently completing an MSc in Artificial Intelligence at UCY. He focuses on how each website looks, works and comes together, from the first direction through to launch.",
    education: "Practical branch graduate · BSc Computer Science, University of Cyprus · MSc Artificial Intelligence, UCY (in progress)",
    image: "/images/team/stylianos.webp",
    linkedin: "https://www.linkedin.com/in/stylianos-panagiotou-0444552a6/",
  },
];

export default function AboutPage() {
  return <main>
    <section className="founders-section section-pad" aria-labelledby="founders-heading">
      <div className="site-container">
        <div className="founders-intro">
          <p className="eyebrow">The people behind FOUND.</p>
          <h1 id="founders-heading">Two people. One clear direction.</h1>
          <p>FOUND. is built by Ioannis and Stylianos in Cyprus. We bring business thinking and hands-on website work together, so clients know who they are speaking with and who is responsible for the work.</p>
        </div>
        <div className="founders-grid">
          {founders.map((founder, index) => <article className="founder-profile" key={founder.name}>
            <span className="founder-number">0{index + 1} / FOUND.</span>
            <div className="founder-content">
              <div className="founder-portrait">
                <Image src={founder.image} alt={`${founder.name}, ${founder.role}`} fill sizes="(max-width: 760px) 160px, 190px" />
              </div>
              <div className="founder-copy">
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
        <p className="eyebrow">About FOUND.</p>
        <h2>We do not stop at<br /><em>“your site is live.”</em></h2>
        <p>FOUND. exists to help ambitious local businesses build a sharper digital presence and turn it into a practical growth asset.</p>
      </div>
    </section>
    <section className="audience-section section-pad"><div className="site-container"><p className="eyebrow">Built for local ambition</p><h2>From retail and local services to property, hospitality and professional expertise.</h2><p>We work across industries with businesses that value credibility, want a clearer customer journey and are ready to treat digital presence as an ongoing business function.</p><Link className="text-link" href="/services">Explore our services<ArrowRight /></Link></div></section>
    <CTASection />
  </main>;
}
