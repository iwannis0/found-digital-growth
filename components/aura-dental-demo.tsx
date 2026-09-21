"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock3, Leaf, Menu, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const interior = "/images/work/aura-dental-interior.webp";
const navigation = [
  { label: "About", href: "#aura-about" },
  { label: "Experience", href: "#aura-experience" },
  { label: "Services", href: "#aura-services" },
  { label: "Philosophy", href: "#aura-philosophy" },
];
const services = [
  { number: "01", title: "General Dentistry", description: "Everyday care, approached with time, clarity and attention." },
  { number: "02", title: "Cosmetic Dentistry", description: "Considered treatments for a smile that still feels like yours." },
  { number: "03", title: "Preventive Care", description: "A thoughtful routine for long-term oral wellbeing." },
  { number: "04", title: "Smile Design", description: "A personal plan built around your goals and natural features." },
  { number: "05", title: "Dental Hygiene", description: "Gentle, thorough care that helps you feel at your best." },
  { number: "06", title: "Restorative Dentistry", description: "Comfort, function and confidence, carefully restored." },
];

export function AuraDentalDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = document.querySelectorAll<HTMLElement>("[data-aura-reveal]");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("aura-revealed"); observer.unobserve(entry.target); }
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    document.querySelector(".aura-demo")?.classList.add("aura-motion-ready");
    return () => observer.disconnect();
  }, []);

  return (
    <main className="aura-demo" id="aura-top">
      <section className="aura-hero" aria-labelledby="aura-hero-title">
        <Image className="aura-hero-image" src={interior} alt="Warm, sunlit dental studio with natural materials and a treatment chair" fill priority sizes="100vw" />
        <div className="aura-hero-wash" aria-hidden="true" />
        <header className="aura-header">
          <span className="aura-concept-tag">Concept project</span>
          <nav className="aura-header-links" aria-label="AURA Dental main navigation">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <a className="aura-book-link" href="#aura-visit">Book a visit <ArrowRight aria-hidden="true" /></a>
          <button className="aura-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="aura-mobile-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        <nav className={`aura-mobile-menu${menuOpen ? " is-open" : ""}`} id="aura-mobile-menu" aria-label="AURA Dental mobile navigation" aria-hidden={!menuOpen}>
          {navigation.map((item) => <a key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight aria-hidden="true" /></a>)}
          <a href="#aura-visit" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Book a visit<ArrowUpRight aria-hidden="true" /></a>
        </nav>
        <div className="aura-hero-content">
          <a className="aura-wordmark" href="#aura-top" aria-label="AURA Dental, back to top">AURA <span>DENTAL</span></a>
          <div className="aura-hero-copy">
            <p className="aura-eyebrow">Modern dentistry<br />A brighter you</p>
            <h1 id="aura-hero-title">Where<br />Oral Health<br />Feels Different</h1>
            <span className="aura-rule" aria-hidden="true" />
            <p className="aura-hero-description">A modern dental experience designed<br className="aura-desktop-break" /> for your well-being. Exceptional care,<br className="aura-desktop-break" /> in a calmer, brighter environment.</p>
            <a className="aura-pill aura-pill-solid" href="#aura-about">Explore the concept <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="aura-hero-bottom" aria-hidden="true"><div className="aura-hero-principles"><span><Leaf />Exceptional<br />care</span><span><Clock3 />A calmer<br />experience</span><span><Sun />A brighter<br />you</span></div><p><i />Dentistry for a brighter tomorrow</p></div>
        <a className="aura-scroll-note" href="#aura-about">Scroll <span /></a>
      </section>

      <section className="aura-about aura-section" id="aura-about"><div className="aura-container aura-about-grid" data-aura-reveal><p className="aura-section-label">01 / The AURA experience</p><div><h2>Dentistry designed<br />around <em>how you feel.</em></h2><div className="aura-about-lower"><p>From the first hello to the final detail, every part of AURA is considered. We make room for questions, explain each step and shape care around the person behind the smile.</p><a className="aura-text-link" href="#aura-experience">Step inside <ArrowUpRight aria-hidden="true" /></a></div></div></div></section>

      <section className="aura-experience aura-section" id="aura-experience"><div className="aura-experience-image aura-image-frame"><Image src={interior} alt="A quiet, light-filled consultation space at the AURA Dental concept clinic" fill sizes="(max-width: 800px) 100vw, 60vw" /></div><div className="aura-experience-copy" data-aura-reveal><p className="aura-section-label">02 / A different kind of visit</p><h2>Feel at ease<br /><em>from the first hello.</em></h2><p>A place to pause, ask and be heard. We pair modern care with a slower, more personal experience, so every visit feels a little lighter.</p><div className="aura-experience-points"><span><Leaf /> Calm from the first moment</span><span><Sparkles /> Care shaped around you</span><span><Check /> Clarity at every step</span></div></div></section>

      <section className="aura-services aura-section" id="aura-services"><div className="aura-container"><div className="aura-section-head" data-aura-reveal><p className="aura-section-label">03 / Our services</p><div><h2>Care with<br /><em>intention.</em></h2><p>Thoughtful dental care for every stage of your smile, from the everyday essentials to a new direction.</p></div></div><div className="aura-services-list">{services.map((service) => <a key={service.number} href="#aura-visit" onClick={() => setSelectedService(service.title)}><span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><ArrowUpRight aria-hidden="true" /></a>)}</div></div></section>

      <section className="aura-philosophy aura-section" id="aura-philosophy"><div className="aura-container aura-philosophy-grid" data-aura-reveal><p className="aura-section-label">04 / Our philosophy</p><div><h2>Clinical precision.<br /><em>Human experience.</em></h2><p>Good dentistry is more than a treatment. It is the confidence that comes from being listened to, understanding your options and feeling comfortable in your care.</p><a className="aura-text-link" href="#aura-space">Discover the space <ArrowUpRight aria-hidden="true" /></a></div></div></section>

      <section className="aura-space aura-section" id="aura-space"><div className="aura-space-image aura-image-frame"><Image src={interior} alt="Warm plaster, natural wood and daylight in the AURA Dental concept interior" fill sizes="100vw" /></div><div className="aura-container aura-space-copy" data-aura-reveal><p className="aura-section-label">05 / The space</p><div><h2>Designed to feel<br /><em>nothing like a clinic.</em></h2><p>Soft light. Honest materials. A little breathing room. A setting made to help you arrive as you are and leave feeling more yourself.</p></div></div></section>

      <section className="aura-visit aura-section" id="aura-visit"><div className="aura-container aura-visit-grid" data-aura-reveal><div><p className="aura-section-label">06 / Begin here</p><h2>A brighter smile<br /><em>starts here.</em></h2><p>Take the first step towards care that feels considered, comfortable and entirely yours.</p></div><div className="aura-visit-panel">{requestSent ? <div className="aura-visit-success" role="status"><Check aria-hidden="true" /><h3>Your visit, imagined.</h3><p>This is an interactive website concept. No appointment was sent, but this is how a booking enquiry could feel.</p><button type="button" onClick={() => setRequestSent(false)}>Start again <ArrowRight aria-hidden="true" /></button></div> : <form onSubmit={(event) => { event.preventDefault(); setRequestSent(true); }}><p className="aura-visit-panel-label">A first conversation</p><h3>Let&apos;s make space for your smile.</h3><label htmlFor="aura-name">Your name</label><input id="aura-name" name="name" type="text" autoComplete="name" placeholder="Your name" required /><label htmlFor="aura-email">Email address</label><input id="aura-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /><label htmlFor="aura-interest">I&apos;m interested in</label><select id="aura-interest" name="interest" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.number} value={service.title}>{service.title}</option>)}</select><button className="aura-pill aura-pill-solid" type="submit">Book a visit <ArrowRight aria-hidden="true" /></button><small>Concept preview only. No appointment request is sent.</small></form>}</div></div></section>

      <footer className="aura-footer"><div className="aura-container"><div className="aura-footer-main"><a className="aura-wordmark" href="#aura-top">AURA <span>DENTAL</span></a><p>Care that feels different.</p><a href="#aura-top">Back to top ↑</a></div><div className="aura-footer-meta"><p>AURA Dental is a fictional website concept by FOUND. No clinic or booking service is operating here.</p><Link href="/work/aura-dental">Return to FOUND. project <ArrowUpRight aria-hidden="true" /></Link></div></div></footer>
    </main>
  );
}
