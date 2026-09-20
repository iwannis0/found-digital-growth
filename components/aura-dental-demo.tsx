import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, Leaf, MoveUpRight } from "lucide-react";

const services = [
  { number: "01", title: "General dentistry", description: "Essential care for a healthy smile, delivered with attention to the details that matter." },
  { number: "02", title: "Cosmetic dentistry", description: "Thoughtful options to help you feel more confident in the smile you share." },
  { number: "03", title: "Preventive care", description: "A proactive approach that makes looking after your oral health feel simple." },
  { number: "04", title: "Smile consultations", description: "Time to talk through your goals and understand the possibilities ahead." },
];

export function AuraDentalDemo() {
  return (
    <main className="aura-demo" id="aura-top">
      <section className="aura-hero" aria-label="AURA Dental concept homepage">
        <div className="aura-hero-desktop">
          <h1 className="aura-sr-only">Where Oral Health Feels Different</h1>
          <Image src="/images/work/aura-dental-cover.webp" alt="Warm, sunlit AURA Dental concept interior with an editorial homepage design" width={1536} height={1024} priority sizes="100vw" />
          <nav className="aura-image-links" aria-label="AURA Dental concept navigation">
            <a href="#aura-about" className="aura-hotspot aura-hotspot-about" aria-label="About AURA Dental" />
            <a href="#aura-experience" className="aura-hotspot aura-hotspot-experience" aria-label="The AURA experience" />
            <a href="#aura-services" className="aura-hotspot aura-hotspot-services" aria-label="AURA services" />
            <a href="#aura-philosophy" className="aura-hotspot aura-hotspot-philosophy" aria-label="AURA philosophy" />
            <a href="#aura-visit" className="aura-hotspot aura-hotspot-book" aria-label="Plan a visit" />
            <a href="#aura-about" className="aura-hotspot aura-hotspot-explore" aria-label="Explore AURA Dental" />
          </nav>
        </div>
        <div className="aura-hero-mobile">
          <div className="aura-mobile-photo"><Image src="/images/work/aura-dental-cover.webp" alt="Warm, sunlit dental studio interior" fill priority sizes="100vw" /></div>
          <div className="aura-mobile-content">
            <span className="aura-concept-tag">Concept project</span>
            <p className="aura-wordmark">AURA <span>DENTAL</span></p>
            <p className="aura-overline">Modern dentistry · A brighter you</p>
            <h1>Where Oral Health Feels Different</h1>
            <p>A modern dental experience designed for your well-being. Exceptional care, in a calmer, brighter environment.</p>
            <a className="aura-pill aura-pill-dark" href="#aura-about">Explore AURA <ArrowRight /></a>
          </div>
        </div>
      </section>

      <nav className="aura-inner-nav" aria-label="Explore AURA Dental">
        <div className="aura-container">
          <a className="aura-inner-logo" href="#aura-top">AURA <small>DENTAL</small></a>
          <div className="aura-inner-links">
            <a href="#aura-about">About</a>
            <a href="#aura-experience">Experience</a>
            <a href="#aura-services">Services</a>
            <a href="#aura-philosophy">Philosophy</a>
          </div>
          <a className="aura-inner-visit" href="#aura-visit">Plan a visit <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </nav>

      <section className="aura-intro aura-section" id="aura-about">
        <div className="aura-container aura-intro-grid">
          <div className="aura-side-note"><p className="aura-label">01 / About AURA</p><span className="aura-side-line" /></div>
          <div><h2>Feel at ease<br /><em>from the first hello.</em></h2><p>We believe the best care begins with a conversation. AURA brings a warm atmosphere, considered details and a clear approach to every visit, so you can feel comfortable being yourself.</p><a className="aura-text-link" href="#aura-experience">Discover the experience <ArrowRight /></a></div>
        </div>
      </section>

      <section className="aura-experience aura-section" id="aura-experience">
        <div className="aura-container">
          <div className="aura-section-heading"><p className="aura-label">02 / The experience</p><h2>A quieter way<br />to care for <em>you.</em></h2></div>
          <div className="aura-experience-grid">
            <div className="aura-experience-photo"><Image src="/images/work/aura-dental-interior.webp" alt="Warm, light-filled AURA Dental consultation space" fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
            <div className="aura-experience-copy"><span className="aura-small-rule" /><p>Come as you are. We&apos;ll make space for your questions, take time to explain the details and help you feel at ease with what comes next.</p><div className="aura-principles"><div><Leaf /><span>Calm from the first moment</span></div><div><Heart /><span>Care centred on you</span></div><div><span className="aura-principle-number">03</span><span>Clarity at every step</span></div></div></div>
          </div>
        </div>
      </section>

      <section className="aura-services aura-section" id="aura-services">
        <div className="aura-container">
          <div className="aura-section-heading aura-services-heading"><p className="aura-label">03 / Our care</p><div><h2>Care with<br /><em>intention.</em></h2><p>Every smile has its own story. Explore a thoughtful range of care shaped around your needs.</p></div></div>
          <div className="aura-service-grid">{services.map((service) => <article key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><MoveUpRight aria-hidden="true" /></article>)}</div>
          <p className="aura-services-footnote">Thoughtful care, a clearer path forward.</p>
        </div>
      </section>

      <section className="aura-philosophy aura-section" id="aura-philosophy">
        <Image src="/images/work/aura-dental-interior.webp" alt="Sunlit AURA Dental space with natural materials" fill sizes="100vw" />
        <div className="aura-philosophy-shade" />
        <div className="aura-container aura-philosophy-content">
          <p className="aura-label">04 / Our philosophy</p>
          <div><span className="aura-philosophy-mark">“</span><h2>Care should leave<br />you feeling <em>lighter.</em></h2><p>Thoughtful spaces. Honest conversations. A gentler way to look after the smile that is yours.</p><a className="aura-text-link" href="#aura-visit">Your first visit <ArrowRight /></a></div>
        </div>
        <span className="aura-philosophy-caption">AURA / A BRIGHTER WAY TO FEEL</span>
      </section>

      <section className="aura-visit aura-section" id="aura-visit">
        <div className="aura-container aura-visit-grid">
          <div><p className="aura-label">05 / A new beginning</p><h2>Your first visit,<br /><em>made simple.</em></h2><p>A little time to talk. A clear understanding of your needs. A plan that feels right for you.</p><span className="aura-pill aura-pill-dark aura-visual-cta">Book a visit <ArrowRight /></span></div>
          <div className="aura-visit-steps"><p className="aura-visit-kicker">THE AURA JOURNEY</p><div><span>01</span><h3>Tell us your story.</h3><p>Share what brings you in and what matters most.</p></div><div><span>02</span><h3>Feel understood.</h3><p>Take the time to ask, listen and explore your options.</p></div><div><span>03</span><h3>Move forward clearly.</h3><p>Leave knowing the next step is yours to choose.</p></div><small>Concept website preview · No appointment service is connected.</small></div>
        </div>
      </section>

      <footer className="aura-demo-footer">
        <div className="aura-container"><div className="aura-demo-footer-top"><span className="aura-footer-logo">AURA <small>DENTAL</small></span><a href="#aura-top">Back to top ↑</a></div><div className="aura-demo-footer-bottom"><p>Concept website by FOUND. AURA Dental is a portfolio design, not a real clinic or live booking service.</p><Link href="/work/aura-dental">Back to the project <ArrowRight /></Link></div></div>
      </footer>
    </main>
  );
}
