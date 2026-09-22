import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { projects } from "@/lib/content";
import { PageTracker } from "@/components/analytics";
import { PageMotion } from "@/components/page-motion";
import { AuraCover } from "@/components/aura-cover";
import { NovaCover } from "@/components/nova-cover";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = projects.find((item) => item.slug === slug); return project ? { title: `${project.name} Concept Project`, description: project.concept, alternates: { canonical: `/work/${project.slug}` } } : {}; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects.find((item) => item.slug === slug); if (!project) notFound();
  return <main className={`case-study case-motion-page case-${project.tone} motion-page`}><PageMotion /><PageTracker event="project_view" label={project.name} />
    <section className={`case-hero case-hero-${project.slug}`}><div className="site-container"><div className="case-kicker"><span>Concept Project</span><span>{project.industry}</span></div><h1>{project.name}</h1><p>{project.statement}</p></div></section>
    <section className="case-image"><div className="site-container">{project.slug === "aura-dental" ? <div className="aura-case-cover"><Image src={project.image} alt={`${project.name} concept website cover`} fill sizes="(max-width: 1624px) 100vw, 1584px" priority /><AuraCover /></div> : project.slug === "nova-estates" ? <div className="nova-case-cover"><Image src={project.image} alt={`${project.name} concept website cover`} fill sizes="(max-width: 1624px) 100vw, 1584px" priority /><NovaCover /></div> : <Image src={project.image} alt={`${project.name} concept website cover`} width={1584} height={990} priority />}</div></section>
    {project.slug === "aura-dental" && <section className="aura-preview-entry"><div className="site-container"><div data-motion="rise"><p className="eyebrow">Website concept</p><h2>Explore the AURA website.</h2><p>Open the full responsive concept to see the design as a website.</p></div><Link className="button button-dark button-large" href="/work/aura-dental/demo">View website mockup <ArrowRight /></Link></div></section>}
    {project.slug === "ora-jewellery" && <section className="aura-preview-entry"><div className="site-container"><div data-motion="rise"><p className="eyebrow">Website concept</p><h2>Explore the ORA website.</h2><p>The full jewellery website mockup is coming soon.</p></div><span className="button button-dark button-large ora-preview-placeholder" aria-label="View website mockup, coming soon">View website mockup <ArrowRight /></span></div></section>}
    {project.slug === "nova-estates" && <section className="aura-preview-entry"><div className="site-container"><div data-motion="rise"><p className="eyebrow">Website concept</p><h2>Explore the NOVA website.</h2><p>Open the full responsive property concept and explore its listings.</p></div><Link className="button button-dark button-large" href="/work/nova-estates/demo">View website mockup <ArrowRight /></Link></div></section>}
    <section className="case-story section-pad"><div className="site-container case-story-grid"><div data-motion="rise"><p className="eyebrow">The problem</p><h2>{project.problem}</h2></div><div data-motion="rise"><p className="eyebrow">Our concept</p><p>{project.concept}</p><Link href="/free-audit" className="text-link">Build my direction <ArrowRight /></Link></div></div></section>
    <section className="case-features"><div className="site-container"><p className="eyebrow">Experience features</p><div className="feature-cloud">{project.features.map((feature) => <span key={feature} data-motion="rise"><Check />{feature}</span>)}</div></div></section>
    <section className="case-next"><div className="site-container"><p>Could your business look this clear?</p><Link className="button button-accent button-large" href="/free-audit">Get a Free Audit <ArrowRight /></Link></div></section>
  </main>;
}
