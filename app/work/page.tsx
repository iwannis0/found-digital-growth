import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, FileText, House, MessageSquareText, Phone, ShoppingBag, Target, UtensilsCrossed } from "lucide-react";
import { PageMotion } from "@/components/page-motion";
import { ProjectCover } from "@/components/project-cover";
import { deployedProjects, projects } from "@/lib/content";

const auraImage = projects.find((project) => project.slug === "aura-dental")?.image ?? "";
const novaImage = projects.find((project) => project.slug === "nova-estates")?.image ?? "";
// Back-to-front order so the live store sits in front of the stack.
const heroFrames = [
  ["nova", novaImage],
  ["discount", deployedProjects[1].image],
  ["aura", auraImage],
  ["front", deployedProjects[0].image],
] as const;

const businessTypes = [
  ["Food & Hospitality", "Restaurants, cafés, bakeries, hotels, villas and event venues."],
  ["Beauty & Wellness", "Barbers, salons, nail studios, clinics, gyms, personal trainers and wellness businesses."],
  ["Retail & E-commerce", "Jewellery, fashion, pet shops, furniture, florists and specialty stores."],
  ["Professional Services", "Lawyers, accountants, consultants, financial firms and other professional practices."],
  ["Property & Places", "Real estate agencies, developers, architects, interior studios and construction companies."],
  ["Home & Local Services", "Renovations, kitchens, solar, cleaning, car detailing, trades and service businesses."],
  ["Fitness & Training", "Gyms, personal trainers, sports academies, studios and coaches."],
  ["Education & Training", "Schools, tutors, language centres, academies and training providers."],
  ["Automotive", "Car detailing, garages, rentals, dealerships and automotive services."],
  ["B2B & Corporate", "Technology companies, agencies, suppliers, manufacturers and B2B service companies."],
] as const;

const customerJourneys = [
  ["Bookings", CalendarCheck],
  ["Enquiries", MessageSquareText],
  ["Calls & WhatsApp", Phone],
  ["E-commerce", ShoppingBag],
  ["Reservations", UtensilsCrossed],
  ["Quote requests", FileText],
  ["Property enquiries", House],
  ["Lead generation", Target],
] as const;

export const metadata: Metadata = { title: "What We Can Build", description: "See how FOUND. shapes websites around different businesses, customer journeys and commercial goals.", alternates: { canonical: "/work" }, openGraph: { images: ["/images/social/found-og-work.jpg"] }, twitter: { card: "summary_large_image", images: ["/images/social/found-og-work.jpg"] } };

export default function WorkPage() {
  return <main className="motion-page work-motion-page">
    <PageMotion />
    <section className="lit-hero"><div className="site-container lit-hero-grid">
      <div className="work-hero-copy"><p className="eyebrow">Our work</p><h1>Different businesses. <em>Different websites.</em></h1><p className="lit-hero-lead">Live builds and concept projects, each shaped around how the business actually works.</p></div>
      <div className="work-hero-stage" aria-hidden="true">
        {heroFrames.map(([key, src]) => <div className={`work-hero-frame work-hero-frame-${key}`} key={key}><b><i /><i /><i /></b><div><Image src={src} alt="" fill sizes="(max-width: 900px) 70vw, 40vw" priority={key === "front"} /></div></div>)}
      </div>
    </div></section>

    <section className="work-showcase section-pad"><div className="site-container">
      <div className="work-group-head" data-motion="rise"><p className="eyebrow">Live projects</p><h2>Finished builds, <em>live in production.</em></h2></div>
      <div className="deployed-grid">{deployedProjects.map((project) => <a href={project.url} target="_blank" rel="noopener noreferrer" className="deployed-card" key={project.slug} data-motion="rise"><div className="deployed-card-image" data-motion-parallax><Image src={project.image} alt={`${project.name} live website`} fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="deployed-card-meta"><div><small>{project.industry}</small><h3>{project.name}</h3></div><span className="deployed-card-visit">Visit live site <ArrowUpRight aria-hidden="true" /></span></div></a>)}</div>

      <div className="work-group-head work-group-head-concepts" data-motion="rise"><p className="eyebrow">Concept projects</p><h2>Three examples <em>of our approach.</em></h2></div>
      <div className="concept-grid">{projects.map((project, index) => <Link href={`/work/${project.slug}`} className="concept-preview" key={project.slug} data-motion="rise"><div className="concept-preview-image" data-motion-parallax><Image src={project.image} alt={`${project.name} concept website cover`} fill sizes="(max-width: 700px) 100vw, 33vw" /><ProjectCover slug={project.slug} fallback={<span>Concept Project</span>} /></div><div className="concept-preview-meta"><div><small>0{index + 1} / {project.industry}</small><h3>{project.name}</h3></div><ArrowUpRight aria-hidden="true" /></div></Link>)}</div>
    </div></section>

    <section className="business-types-section section-pad"><div className="site-container">
      <div className="work-group-head" data-motion="rise"><p className="eyebrow">Built around your business</p><h2>What does your business <em>need its website to do?</em></h2></div>
      <div className="business-type-grid">{businessTypes.map(([title, examples], index) => <article key={title} data-motion="rise"><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{examples}</p></article>)}</div>
    </div></section>

    <section className="journeys-section section-pad"><div className="site-container">
      <div className="work-group-head" data-motion="rise"><p className="eyebrow">Built around the action</p><h2>The right website depends <em>on what needs to happen next.</em></h2></div>
      <div className="journey-grid">{customerJourneys.map(([title, Icon]) => <div key={title} data-motion="rise"><i aria-hidden="true"><Icon /></i><h3>{title}</h3></div>)}</div>
    </div></section>
  </main>;
}
