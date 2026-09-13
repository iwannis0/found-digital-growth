import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { projects } from "@/lib/content";
import { PageTracker } from "@/components/analytics";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = projects.find((item) => item.slug === slug); return project ? { title: `${project.name} Concept Project`, description: project.concept, alternates: { canonical: `/work/${project.slug}` } } : {}; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects.find((item) => item.slug === slug); if (!project) notFound();
  return <main className={`case-study case-${project.tone}`}><PageTracker event="project_view" label={project.name} />
    <section className={`case-hero case-hero-${project.slug}`}><div className="site-container"><div className="case-kicker"><span>Concept Project</span><span>{project.industry}</span></div><h1>{project.name}</h1><p>{project.statement}</p></div></section>
    <section className="case-image"><div className="site-container"><Image src={project.image} alt={`${project.name} concept website cover`} width={1584} height={990} priority /></div></section>
    <section className="case-story section-pad"><div className="site-container case-story-grid"><div><p className="eyebrow">The problem</p><h2>{project.problem}</h2></div><div><p className="eyebrow">Our concept</p><p>{project.concept}</p><Link href="/free-audit" className="text-link">Build my direction <ArrowRight /></Link></div></div></section>
    <section className="case-features"><div className="site-container"><p className="eyebrow">Experience features</p><div className="feature-cloud">{project.features.map((feature) => <span key={feature}><Check />{feature}</span>)}</div></div></section>
    <section className="case-disclaimer"><div className="site-container"><strong>Concept Project</strong><div><p>This creative direction was developed internally by FOUND. It does not represent paid client work, performance results or an existing commercial relationship.</p><p className="case-adaptability">One example of FOUND.&apos;s adaptable approach for different business types.</p></div></div></section>
    <section className="case-next"><div className="site-container"><p>Could your business look this clear?</p><Link className="button button-accent button-large" href="/free-audit">Get a Free Audit <ArrowRight /></Link></div></section>
  </main>;
}
