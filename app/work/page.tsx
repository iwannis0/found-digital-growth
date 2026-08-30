import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Concept Work", description: "Explore clearly labelled concept websites created by FOUND. for Cyprus business sectors." };

export default function WorkPage() {
  return <main>
    <section className="page-hero work-page-hero"><div className="site-container"><p className="eyebrow">Concept work</p><h1>Three sectors.<br /><em>Three distinct directions.</em></h1><p>These are internal concept projects, not client claims. They show how FOUND. adapts strategy, tone and conversion design to each business.</p></div></section>
    <section className="work-directory section-pad"><div className="site-container">
      {projects.map((project, index) => <Link href={`/work/${project.slug}`} className="work-row" key={project.slug}>
        <div className="work-row-image"><Image src={`/work/${project.slug}.png`} alt={`${project.name} concept`} fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
        <div className="work-row-copy"><span>0{index + 1} / Concept Project</span><h2>{project.name}</h2><p>{project.industry}</p><strong>{project.statement}<ArrowUpRight /></strong></div>
      </Link>)}
    </div></section><CTASection />
  </main>;
}
