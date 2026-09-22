"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { BookingModal } from "./booking-modal";
import { treatmentDetails } from "./treatment-data";

const treatments = [
  { name: "Teeth Whitening", description: "A considered approach to a brighter smile, tailored to your natural shade.", note: "Brightness, on your terms" },
  { name: "Dental Implants", description: "Thoughtful planning and lasting replacement options that feel like your own.", note: "Confidence that lasts" },
  { name: "Tooth Fillings", description: "Gentle, precise restorative care with comfort in every detail.", note: "Care in the details" },
  { name: "Tartar Removal", description: "A thorough refresh that supports the health behind every smile.", note: "A fresh beginning" },
] as const;

const comparisons = [
  { number: "01", name: "Teeth Whitening", description: treatments[0].description, image: "/images/aura-demo/whitening-before-after.png", slug: "teeth-whitening" },
  { number: "02", name: "Dental Implants", description: treatments[1].description, image: "/images/aura-demo/implants-before-after.png", slug: "dental-implants" },
  { number: "03", name: "Tooth Fillings", description: treatments[2].description, image: "/images/aura-demo/fillings-before-after.png", slug: "tooth-fillings" },
  { number: "04", name: "Tartar Removal", description: treatments[3].description, image: "/images/aura-demo/tartar-before-after.png", slug: "tartar-removal" },
] as const;

const experienceFeatures = [
  "Time to talk through every question",
  "A considered plan for your oral health",
  "Modern treatment with your comfort in mind",
  "Care that continues after your visit",
] as const;

const team = [
  { name: "Dr. Elena Maris", role: "Lead Dentist" },
  { name: "Dr. Lucas Andreou", role: "Cosmetic Dentist" },
  { name: "Sophia Demetriou", role: "Dental Hygienist" },
  { name: "Anna Theodorou", role: "Patient Coordinator" },
] as const;

const reviews = [
  { category: "A calmer visit", quote: "I finally felt that I could ask every question and take my time. The whole experience felt considered from beginning to end.", name: "Maria K.", label: "Illustrative patient story" },
  { category: "A natural smile", quote: "The result still looks like me, just with a little more confidence. That was exactly what I hoped for.", name: "Andreas P.", label: "Illustrative patient story" },
  { category: "Thoughtful care", quote: "Everything was explained clearly. I knew what would happen at each stage, which made all the difference.", name: "Elena S.", label: "Illustrative patient story" },
  { category: "A fresh start", quote: "I came in nervous and left feeling comfortable with the plan. It felt personal, never rushed.", name: "Christos M.", label: "Illustrative patient story" },
  { category: "Everyday confidence", quote: "What stayed with me was the care in the small things. I felt listened to throughout.", name: "Nadia T.", label: "Illustrative patient story" },
] as const;

const questions = [
  ["How do I know which treatment is right for me?", "A consultation is the best starting point. We discuss your concerns, assess your oral health and explain the options that fit your needs before any decision is made."],
  ["What happens during my first visit?", "Your first visit is a conversation and an assessment. We take time to understand your goals, examine your oral health and outline any recommended next steps."],
  ["How much does teeth whitening cost?", "The cost depends on the method and your starting point. After a consultation, you would receive a clear treatment plan and price before going ahead."],
  ["How long does a dental implant take?", "Implant treatment takes place in stages. Timing varies with healing and individual needs, so a dentist would explain a personal timeline after assessment."],
  ["Are veneers right for me?", "Veneers can suit some cosmetic goals, but they are not the only option. We would look at your teeth, preferences and long-term oral health together."],
  ["What happens during a tooth filling?", "A filling restores a damaged or decayed tooth. The dentist would explain the material, comfort options and each step before treatment."],
  ["How often should I have tartar removed?", "The right interval depends on your oral health and home care. Your hygienist would recommend a schedule based on your needs."],
] as const;

const nav = [["Services", "#aura-services"], ["Why Aura", "#aura-difference"], ["Reviews", "#aura-reviews"], ["FAQ", "#aura-faq"], ["Contact", "#aura-contact"]] as const;

function BeforeAfterCard({ number, name, description, image, slug }: (typeof comparisons)[number]) {
  const [position, setPosition] = useState(50);

  return <article className="aura-comparison-card aura-reveal">
    <div className="aura-comparison-visual">
      <div className="aura-comparison-photo aura-comparison-before" style={{ backgroundImage: `url('${image}')` }} aria-hidden="true" />
      <div className="aura-comparison-photo aura-comparison-after" style={{ backgroundImage: `url('${image}')`, clipPath: `inset(0 0 0 ${position}%)` }} aria-hidden="true" />
      <span className="aura-comparison-badge aura-comparison-badge-before" aria-hidden="true">Before</span>
      <span className="aura-comparison-badge aura-comparison-badge-after" aria-hidden="true">After</span>
      <div className="aura-comparison-divider" style={{ left: `${position}%` }} aria-hidden="true"><span>‹ ›</span></div>
      <input className="aura-comparison-range" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label={`Compare before and after concept images for ${name}`} aria-valuetext={`${position}% before visible, ${100 - position}% after visible`} />
    </div>
    <div className="aura-comparison-copy"><span className="aura-comparison-index">{number}</span><h3>{name}</h3><p>{description}</p><Link href={`/work/aura-dental/demo/treatments/${slug}`}>Explore treatment <ArrowRight size={15} aria-hidden="true" /></Link></div>
  </article>;
}

export function AuraDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingTrigger = useRef<HTMLElement | null>(null);

  function openBooking() {
    bookingTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setMenuOpen(false);
    setBookingOpen(true);
  }

  function closeBooking() {
    setBookingOpen(false);
    requestAnimationFrame(() => {
      if (bookingTrigger.current?.isConnected) bookingTrigger.current.focus();
      else document.querySelector<HTMLElement>(".aura-menu-button")?.focus();
    });
  }

  useEffect(() => {
    const root = document.querySelector(".aura-demo");
    if (!root || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    root.querySelectorAll(".aura-reveal").forEach((item) => observer.observe(item));
    root.classList.add("is-animated");
    return () => observer.disconnect();
  }, []);

  return <main className="aura-demo" id="aura-top">
    <div className="aura-concept-bar"><span>FOUND. / WEBSITE CONCEPT</span><span>Fictional AURA Dental demo</span><Link href="/work/aura-dental">Back to case study <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
    <section className="aura-hero" aria-labelledby="aura-hero-title">
      <Image className="aura-hero-image" src="/images/aura-demo/treatment-hero.png" alt="Dentist caring for a patient in a contemporary dental studio" fill priority unoptimized sizes="100vw" />
      <div className="aura-hero-wash" />
      <header className="aura-header">
        <a href="#aura-top" className="aura-wordmark" aria-label="AURA Dental, back to top">AURA<span>DENTAL</span></a>
        <nav className="aura-desktop-nav" aria-label="AURA Dental navigation">{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <button className="aura-nav-book" type="button" onClick={openBooking}>Book a Visit <ArrowUpRight size={17} aria-hidden="true" /></button>
        <button className="aura-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="aura-mobile-nav">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="aura-mobile-nav" id="aura-mobile-nav" aria-label="AURA Dental mobile navigation">{nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<button type="button" onClick={openBooking}>Book a Visit <ArrowUpRight size={17} /></button></nav>}
      <div className="aura-hero-content aura-reveal">
        <p className="aura-eyebrow">BOUTIQUE DENTISTRY / NICOSIA</p>
        <h1 id="aura-hero-title">A calmer visit.<br />A brighter smile.</h1>
        <p className="aura-hero-copy">Modern care, honest conversations and thoughtful treatment designed around you.</p>
        <div className="aura-hero-actions"><button className="aura-button aura-button-dark" type="button" onClick={openBooking}>Book a Visit <ArrowUpRight size={17} /></button><a className="aura-button aura-button-outline" href="#aura-services">Explore Services <ArrowRight size={17} /></a></div>
        <p className="aura-hero-trust"><span>A considered experience, from your first visit.</span></p>
      </div>
      <div className="aura-hero-bottom"><span>CARE THAT FEELS PERSONAL</span><span>SCROLL TO DISCOVER ↓</span></div>
    </section>

    <div className="aura-ticker" aria-label="Treatments: teeth whitening, dental implants, tooth fillings and tartar removal"><div className="aura-ticker-track" aria-hidden="true">{[0, 1].map((copy) => <div className="aura-ticker-group" key={copy}>{[...treatments, ...treatments].map((item, index) => <span key={`${copy}-${item.name}-${index}`}>{item.name}<i>✳</i></span>)}</div>)}</div></div>

    <section className="aura-services aura-section" id="aura-services">
      <div className="aura-shell">
        <div className="aura-section-heading aura-reveal">
          <div><p className="aura-eyebrow">OUR TREATMENTS</p><h2>Treatments designed<br />around your smile.</h2></div>
          <p>From everyday care to lasting restorations, our treatments are designed to restore function, improve appearance and help you feel confident again.</p>
        </div>
        <div className="aura-comparison-grid">{comparisons.map((item) => <BeforeAfterCard key={item.name} {...item} />)}</div>
        <p className="aura-comparison-disclosure">Drag to compare. Illustrative concept visuals only — not real patient results.</p>
      </div>
    </section>

    <section className="aura-difference aura-section" id="aura-difference">
      <div className="aura-shell aura-difference-grid">
        <div className="aura-experience-photo aura-reveal">
          <Image src="/images/aura-demo/patient-experience.png" alt="Patient smiling with her dentist during a consultation" fill unoptimized sizes="(max-width: 700px) 100vw, 50vw" />
          <div className="aura-experience-stats"><strong>One</strong><span>conversation at a time</span><strong>Your</strong><span>care, your pace</span></div>
        </div>
        <div className="aura-experience-copy aura-reveal">
          <p className="aura-eyebrow">THE EXPERIENCE</p>
          <h2>Modern treatments,<br />thoughtful care.</h2>
          <p className="aura-difference-lead">From a warm hello to a comfortable visit, every moment is shaped around your needs. We make space for your questions and explain the choices ahead.</p>
          <ul>{experienceFeatures.map((feature) => <li key={feature}><span aria-hidden="true">✧</span>{feature}</li>)}</ul>
        </div>
      </div>
    </section>

    <section className="aura-team aura-section" id="aura-team"><div className="aura-shell"><div className="aura-team-heading aura-reveal"><p className="aura-eyebrow">PEOPLE BEHIND THE CARE</p><h2>Experienced hands<br />behind every treatment.</h2><p>Our fictional team brings together clinical experience and genuine attention to make each visit feel comfortable and considered.</p></div><div className="aura-team-grid">{team.map((person, index) => <article className="aura-person aura-reveal" key={person.name}><div className={`aura-person-photo aura-person-photo-${index + 1}`} role="img" aria-label={`Concept portrait of ${person.name}`} /><div className="aura-person-meta"><h3>{person.name}</h3><span>{person.role}</span></div></article>)}</div></div></section>

    <section className="aura-reviews aura-section" id="aura-reviews">
      <div className="aura-shell">
        <div className="aura-reviews-heading aura-reveal"><p className="aura-eyebrow">PATIENT STORIES / CONCEPT EXAMPLES</p><h2>Results patients<br />feel good about.</h2></div>
        <div className="aura-reviews-grid">
          <div className="aura-review-card aura-reveal" aria-live="polite">
            <p className="aura-review-category">{reviews[reviewIndex].category}</p>
            <p className="aura-review-stars" aria-label="Illustrative five star motif">★★★★★</p>
            <blockquote>“{reviews[reviewIndex].quote}”</blockquote>
            <div className="aura-review-bottom"><div><strong>{reviews[reviewIndex].name}</strong><span>{reviews[reviewIndex].label}</span></div></div>
            <div className="aura-review-controls"><button type="button" onClick={() => setReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length)} aria-label="Previous story"><ArrowLeft /></button><span>{String(reviewIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span><button type="button" onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)} aria-label="Next story"><ArrowRight /></button></div>
          </div>
          <div className="aura-review-photo aura-reveal"><Image src="/images/aura-demo/patient-story.png" alt="Smiling model representing the AURA Dental website concept" fill unoptimized sizes="(max-width: 700px) 100vw, 43vw" /></div>
        </div>
        <p className="aura-review-disclosure">Illustrative stories and imagery for this portfolio concept. They are not real patient testimonials.</p>
      </div>
    </section>

    <section className="aura-faq aura-section" id="aura-faq"><div className="aura-shell aura-faq-grid"><div className="aura-reveal"><p className="aura-eyebrow">COMMON QUESTIONS</p><h2>Questions before<br />you book?</h2><p>We know a question or two can stand between you and feeling comfortable. Here are a few answers to get you started.</p><a className="aura-faq-link" href="#aura-contact">Ask us anything <ArrowRight size={16} aria-hidden="true" /></a></div><div className="aura-faq-list">{questions.map(([question, answer]) => <details className="aura-faq-item aura-reveal" key={question}><summary>{question}<Plus size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="aura-contact aura-section" id="aura-contact">
      <div className="aura-shell aura-contact-grid">
        <div className="aura-contact-copy aura-reveal">
          <p className="aura-eyebrow">GET IN TOUCH</p>
          <h2>Ready to care<br />for your smile?</h2>
          <p>Whether you are ready to book a visit or simply have a question, we would love to hear from you. This AURA Dental website is a fictional portfolio concept.</p>
          <dl><div><dt>Location</dt><dd>Nicosia, Cyprus · concept location</dd></div><div><dt>Visits</dt><dd>By appointment · concept schedule</dd></div></dl>
          <button className="aura-button aura-button-light" type="button" onClick={openBooking}>Book a Visit <ArrowUpRight size={17} aria-hidden="true" /></button>
          <div className="aura-contact-preview-actions" aria-label="Concept contact actions, preview only">
            <span>Google Maps <ArrowUpRight size={15} aria-hidden="true" /></span>
            <span>WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></span>
            <button type="button" disabled>Click to call <ArrowUpRight size={15} aria-hidden="true" /></button>
          </div>
          <small className="aura-contact-preview-note">Concept contact actions · preview only</small>
        </div>
        <div className="aura-contact-photo aura-reveal"><Image src="/images/aura-demo/clinic-exterior.png" alt="Concept exterior of a contemporary dental studio at dusk" fill unoptimized sizes="(max-width: 700px) 100vw, 50vw" /></div>
      </div>
    </section>

    <footer className="aura-footer"><div className="aura-shell"><div className="aura-footer-main"><div><a href="#aura-top" className="aura-wordmark" aria-label="AURA Dental, back to top">AURA<span>DENTAL</span></a><p>A calmer, more considered way to care for your smile.</p></div><div><h3>Explore</h3>{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><div><h3>Treatments</h3>{treatmentDetails.map((item) => <Link href={`/work/aura-dental/demo/treatments/${item.slug}`} key={item.slug}>{item.name}</Link>)}</div><div><h3>Visit</h3><p>Nicosia, Cyprus<br />Concept website only</p><button className="aura-footer-book" type="button" onClick={openBooking}>Explore booking <ArrowUpRight size={15} /></button></div></div><div className="aura-footer-bottom"><span>© {new Date().getFullYear()} AURA Dental · fictional concept</span><Link href="/work/aura-dental">A portfolio project by FOUND. <ArrowUpRight size={15} /></Link></div></div></footer>
    {bookingOpen && <BookingModal onClose={closeBooking} />}
  </main>;
}
