"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { BookingModal } from "./booking-modal";
import { treatmentDetails, type TreatmentDetail } from "./treatment-data";

const demoPath = "/work/aura-dental/demo";

export function TreatmentPage({ treatment }: { treatment: TreatmentDetail }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bookingTrigger = useRef<HTMLElement | null>(null);
  const treatmentIndex = treatmentDetails.findIndex((item) => item.slug === treatment.slug);
  const otherTreatments = treatmentDetails.filter((item) => item.slug !== treatment.slug);

  function openBooking() {
    bookingTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setMenuOpen(false);
    setBookingOpen(true);
  }

  function closeBooking() {
    setBookingOpen(false);
    requestAnimationFrame(() => {
      if (bookingTrigger.current?.isConnected) bookingTrigger.current.focus();
    });
  }

  return <main className="aura-demo aura-treatment-page">
    <div className="aura-concept-bar"><span>FOUND. / WEBSITE CONCEPT</span><span>Fictional AURA Dental demo</span><Link href="/work/aura-dental">Back to case study <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
    <div className="aura-treatment-header-wrap">
      <header className="aura-header">
        <Link href={demoPath} className="aura-wordmark" aria-label="AURA Dental, back to home">AURA<span>DENTAL</span></Link>
        <nav className="aura-desktop-nav" aria-label="AURA Dental navigation"><Link href={`${demoPath}#aura-services`}>Services</Link><Link href={`${demoPath}#aura-difference`}>Why Aura</Link><Link href={`${demoPath}#aura-reviews`}>Reviews</Link><Link href={`${demoPath}#aura-faq`}>FAQ</Link><Link href={`${demoPath}#aura-contact`}>Contact</Link></nav>
        <button className="aura-nav-book" type="button" onClick={openBooking}>Book a Visit <ArrowUpRight size={17} aria-hidden="true" /></button>
        <button className="aura-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="aura-treatment-mobile-nav">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="aura-mobile-nav" id="aura-treatment-mobile-nav" aria-label="AURA Dental mobile navigation"><Link href={`${demoPath}#aura-services`}>Services</Link><Link href={`${demoPath}#aura-difference`}>Why Aura</Link><Link href={`${demoPath}#aura-reviews`}>Reviews</Link><Link href={`${demoPath}#aura-faq`}>FAQ</Link><Link href={`${demoPath}#aura-contact`}>Contact</Link><button type="button" onClick={openBooking}>Book a Visit <ArrowUpRight size={17} /></button></nav>}
    </div>

    <section className="aura-treatment-hero"><div className="aura-shell aura-treatment-hero-grid">
      <div className="aura-treatment-hero-copy">
        <Link className="aura-treatment-back" href={`${demoPath}#aura-services`}><ArrowLeft size={16} /> All treatments</Link>
        <p className="aura-eyebrow">{treatment.eyebrow}</p>
        <h1>{treatment.name}</h1>
        <p className="aura-treatment-statement">{treatment.headline}</p>
        <p className="aura-treatment-lead">{treatment.intro}</p>
        <button className="aura-button aura-button-dark" type="button" onClick={openBooking}>Explore demo booking <ArrowUpRight size={17} /></button>
      </div>
      <figure className="aura-treatment-visual"><Image src={treatment.image} alt={`Illustrative ${treatment.name.toLowerCase()} concept visual`} fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized /><span className="aura-treatment-visual-number" aria-hidden="true">{String(treatmentIndex + 1).padStart(2, "0")}</span><figcaption>Illustrative concept visual · not a patient result</figcaption></figure>
    </div><div className="aura-shell aura-treatment-hero-foot"><span>AURA DENTAL / TREATMENT GUIDE</span><span>{String(treatmentIndex + 1).padStart(2, "0")} / 04</span></div></section>

    <section className="aura-treatment-body aura-section"><div className="aura-shell"><div className="aura-treatment-body-intro"><div><p className="aura-eyebrow">THE APPROACH</p><h2>What a visit<br />could involve.</h2></div><p>Every person and treatment plan is different. Here is how this concept makes the first steps easier to understand.</p></div><div className="aura-treatment-includes">{treatment.includes.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div></div></section>

    <section className="aura-treatment-expect aura-section"><div className="aura-shell aura-treatment-expect-grid"><div><p className="aura-eyebrow">WHAT TO EXPECT</p><span className="aura-treatment-expect-mark" aria-hidden="true">✳</span></div><div><h2>Know the path<br />before you begin.</h2><p>{treatment.expectation}</p><p className="aura-treatment-disclaimer">This is a fictional portfolio concept. The information is illustrative and does not replace advice from a dental professional.</p></div></div></section>

    <section className="aura-treatment-next"><div className="aura-shell"><div><p className="aura-eyebrow">A CALMER NEXT STEP</p><h2>Start with a conversation.</h2><p>Choose a sample date and time to see how the booking experience works.</p></div><button className="aura-button aura-button-light" type="button" onClick={openBooking}>Explore demo booking <ArrowUpRight size={17} /></button></div></section>

    <section className="aura-treatment-more"><div className="aura-shell"><div className="aura-treatment-more-heading"><div><p className="aura-eyebrow">KEEP EXPLORING</p><h2>More ways to care<br />for your smile.</h2></div><Link className="aura-treatment-all" href={`${demoPath}#aura-services`}>View all treatments <ArrowUpRight size={16} /></Link></div><div className="aura-treatment-more-grid">{otherTreatments.map((item) => <Link href={`${demoPath}/treatments/${item.slug}`} key={item.slug}><span>{item.eyebrow}</span><strong>{item.name}</strong><ArrowRight aria-hidden="true" /></Link>)}</div></div></section>

    <footer className="aura-footer aura-treatment-footer"><div className="aura-shell"><div><Link href={demoPath} className="aura-wordmark" aria-label="AURA Dental, back to home">AURA<span>DENTAL</span></Link><p>A fictional website concept by FOUND.</p></div><Link href="/work/aura-dental">Back to the case study <ArrowUpRight size={16} /></Link></div></footer>
    {bookingOpen && <BookingModal onClose={closeBooking} />}
  </main>;
}
