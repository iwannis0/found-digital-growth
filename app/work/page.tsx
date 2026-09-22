import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { PageMotion } from "@/components/page-motion";
import { projects } from "@/lib/content";

const businessTypes = [
  ["FOOD & HOSPITALITY", "Restaurants, cafés, bakeries, hotels, villas and event venues.", "Menus · Reservations · Booking journeys · Galleries · Maps · Local discovery"],
  ["BEAUTY & WELLNESS", "Barbers, salons, nail studios, clinics, gyms, personal trainers and wellness businesses.", "Appointments · Services · Reviews · Before & after · Calls · Google presence"],
  ["RETAIL & E-COMMERCE", "Jewellery, fashion, pet shops, furniture, florists and specialty stores.", "Products · Collections · Checkout · Offers · Enquiries · Email capture"],
  ["PROFESSIONAL SERVICES", "Lawyers, accountants, consultants, financial firms and other professional practices.", "Credibility · Services · Expertise · Lead generation · Enquiries · Calls"],
  ["PROPERTY & PLACES", "Real estate agencies, developers, architects, interior studios and construction companies.", "Listings · Project galleries · Property enquiries · Maps · WhatsApp · Lead capture"],
  ["HOME & LOCAL SERVICES", "Renovations, kitchens, solar, cleaning, car detailing, trades and service businesses.", "Quote requests · Service areas · Reviews · Calls · WhatsApp · Local SEO"],
  ["FITNESS & TRAINING", "Gyms, personal trainers, sports academies, studios and coaches.", "Classes · Timetables · Memberships · Bookings · Enquiries · Lead capture"],
  ["EDUCATION & TRAINING", "Schools, tutors, language centres, academies and training providers.", "Courses · Programmes · Registrations · Resources · Enquiries · Contact"],
  ["AUTOMOTIVE", "Car detailing, garages, rentals, dealerships and automotive services.", "Services · Booking · Galleries · Quote requests · Calls · Location"],
  ["B2B & CORPORATE", "Technology companies, agencies, suppliers, manufacturers and B2B service companies.", "Solutions · Expertise · Case studies · Lead capture · CRM connections · Analytics"],
] as const;

const customerJourneys = [
  ["BOOKINGS", "For appointments, consultations, classes and experiences."],
  ["ENQUIRIES", "For professional services, property, B2B and considered purchases."],
  ["CALLS & WHATSAPP", "For local businesses where customers want a fast conversation."],
  ["E-COMMERCE", "For businesses selling products directly online."],
  ["RESERVATIONS", "For restaurants, hospitality and experiences."],
  ["QUOTE REQUESTS", "For construction, trades and service businesses."],
  ["PROPERTY ENQUIRIES", "For real estate, developments and property businesses."],
  ["LEAD GENERATION", "For businesses where the website starts a longer sales process."],
] as const;

export const metadata: Metadata = { title: "What We Can Build", description: "See how FOUND. shapes websites around different businesses, customer journeys and commercial goals.", alternates: { canonical: "/work" }, openGraph: { images: ["/images/social/found-og-work.jpg"] }, twitter: { card: "summary_large_image", images: ["/images/social/found-og-work.jpg"] } };

export default function WorkPage() {
  return <main className="motion-page work-motion-page">
    <PageMotion />
    <section className="page-hero work-page-hero"><div className="site-container"><p className="eyebrow">What we can build</p><h1>Different businesses.<br /><em>Different websites.</em></h1><p>A restaurant, a law firm, an online store and a local service business should not have the same website. FOUND. shapes the structure, customer journey and functionality around how each business actually works.</p></div></section>
    <section className="business-types-section section-pad"><div className="site-container"><div className="business-types-intro" data-motion="rise"><p className="eyebrow">Built around your business</p><h2>What does your business<br /><em>need its website to do?</em></h2><p>Different businesses need different paths to action. We design around the way your customers discover you, evaluate you and choose what to do next.</p></div><div className="business-type-list">{businessTypes.map(([title, examples, capabilities], index) => <article key={title} data-motion="rise"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{examples}</p><strong>{capabilities}</strong></div></article>)}</div></div></section>
    <section className="journeys-section section-pad"><div className="site-container"><div className="journeys-intro" data-motion="rise"><p className="eyebrow">Built around the action</p><h2>The right website depends<br /><em>on what needs to happen next.</em></h2><p>Some businesses need a booking. Others need a call, a quote, a purchase or a qualified enquiry. The website should make that next step clear.</p></div><div className="journey-list">{customerJourneys.map(([title, description], index) => <div key={title} data-motion="rise"><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>
    <section className="concepts-section section-pad"><div className="site-container"><div className="concepts-intro" data-motion="rise"><p className="eyebrow">Explore the concepts</p><h2>Five complete examples<br /><em>of our approach.</em></h2><p>Explore five internal concept projects built to demonstrate how strategy, structure, conversion paths and visual direction can change from one business model to another.</p></div><div className="concept-grid">{projects.map((project, index) => <Link href={`/work/${project.slug}`} className="concept-preview" key={project.slug} data-motion="rise"><div className="concept-preview-image" data-motion-parallax><Image src={project.image} alt={`${project.name} concept website cover`} fill sizes="(max-width: 700px) 100vw, 33vw" /><span>Concept Project</span></div><div className="concept-preview-meta"><div><small>0{index + 1} / {project.industry}</small><h3>{project.name}</h3></div><ArrowUpRight aria-hidden="true" /></div></Link>)}</div></div></section>
    <section className="beyond-section section-pad"><div className="site-container" data-motion="rise"><p className="eyebrow">And beyond</p><h2>Your business does not need<br /><em>to fit a template.</em></h2><p>Not seeing your industry? If your business needs to be found, trusted and chosen online, we can shape the website around how it actually works.</p></div></section>
    <CTASection title="Not sure what your website needs?" body="Start with a focused review of your website, visibility and customer journey." />
  </main>;
}
