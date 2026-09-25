/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { VelaFaqList } from "./vela-client";
import { velaServices, velaTeam } from "./vela-data";
import { VelaEditorialQuote, VelaFooter, VelaTestimonial } from "./vela-shared";

const base = "/work/vela-studio/demo";

export default function VelaHomePage() {
  return <main>
    <section className="vela-hero">
      <div className="vela-hero-media"><img src="/images/vela-demo/81wh3izunxrzosl6t369exwtg.png" alt="VELA Studio skincare portrait in warm afternoon light" /></div>
      <div className="vela-hero-wash" />
      <div className="vela-hero-copy">
        <p className="vela-kicker vela-hero-kicker">Studio / Beauty / Wellness</p>
        <h1><span>A Quieter</span><span>Kind of</span><span><em>Confidence.</em></span></h1>
        <p className="vela-hero-intro">Beauty and wellness, designed for a more confident you. Thoughtful treatments, genuine care, and a calmer, brighter everyday.</p>
        <div className="vela-hero-actions"><Link data-vela-magnetic href="#about">Explore the studio <ArrowDown size={15} /></Link><Link data-vela-magnetic data-vela-booking href="#booking">Book your visit <ArrowUpRight size={15} /></Link></div>
      </div>
      <div className="vela-hero-rail"><span>01 / Personal care</span><span>Thoughtful rituals</span><span>Quietly transformative</span><span>NICOSIA · CYPRUS</span></div>
    </section>

    <section className="vela-philosophy" id="about">
      <div className="vela-philosophy-stage">
        <div className="vela-philosophy-image small vela-image-reveal" data-vela-reveal="image"><img src="/images/vela-demo/cszzneqzfg28f1aqval9j1ogqjg.png" alt="A quiet VELA treatment room" /></div>
        <h2 data-vela-reveal="words">We believe in holistic care that <em>nurtures</em> your body, mind, and soul.</h2>
        <p className="vela-philosophy-note left" data-vela-reveal="words">Every visit begins with listening. We make room for what your skin and body need, then shape each ritual with care.</p>
        <p className="vela-philosophy-note right" data-vela-reveal="words">Our expert team is dedicated to providing personalised treatments that honour your natural energy, bringing balance and calm through modern techniques and considered touch.</p>
        <div className="vela-philosophy-image wide vela-image-reveal" data-vela-reveal="image"><img src="/images/vela-demo/prpozhfcrrz0venqgoscspywo.png" alt="Warm sunlit lounge at VELA Studio" /></div>
        <div className="vela-philosophy-image terrace vela-image-reveal" data-vela-reveal="image"><img src="/images/vela-demo/nsdlfst8mkqtqvkowuwvcrgze.png" alt="VELA Studio relaxation terrace" /></div>
        <p className="vela-philosophy-note terrace-copy" data-vela-reveal="words">Our spaces are designed as a pause: soft light, warm materials and enough quiet to arrive fully.</p>
      </div>
    </section>

    <VelaTestimonial />

    <section className="vela-services-home" id="treatments">
      <div className="vela-section-head" data-vela-reveal="words"><p className="vela-kicker">Care, considered</p><h2>Our <em>Treatments</em></h2><Link href={`${base}/services`}>See all treatments <ArrowUpRight size={15} /></Link></div>
      <div className="vela-service-ribbon">
        {velaServices.slice(0, 4).map((service, index) => <Link href={`${base}/service/${service.slug}`} className="vela-service-tile" data-vela-reveal="card" style={{ "--delay": `${index * 80}ms` } as React.CSSProperties} key={service.slug}>
          <div><img src={service.image} alt={service.name} /><span className="vela-service-index">0{index + 1}</span></div><h3>{service.name}</h3><p>{service.duration} · {service.price}</p>
        </Link>)}
      </div>
      <Link className="vela-outline-button" href={`${base}/services`}>View the full menu <ArrowUpRight size={15} /></Link>
    </section>

    <div className="vela-marquee-stack" aria-hidden="true">
      <div className="vela-marquee vela-marquee-one"><div>{[0, 1, 2, 3].map(item => <span key={item}>NEW GUEST RITUAL · 15% OFF YOUR FIRST VISIT · PRIVATE CARE · QUIETER BEAUTY · </span>)}</div></div>
      <div className="vela-marquee vela-marquee-two"><div>{[0, 1, 2, 3].map(item => <span key={item}>BOOK A SLOWER MOMENT · PERSONAL RITUALS · VELA STUDIO · NICOSIA · </span>)}</div></div>
    </div>

    <section className="vela-packages">
      <div className="vela-section-head centered" data-vela-reveal="words"><p className="vela-kicker">A little more time</p><h2>Our <em>Packages</em></h2></div>
      <div className="vela-package-grid">
        {[
          ["Essential", "€120", "A focused reset for face or body.", ["60-minute tailored treatment", "Skin or body consultation", "Tea ritual after your visit"], "/images/vela-demo/hskjniyvj6ycet8uuqijiymql4.png"],
          ["Signature", "€210", "Two treatments, thoughtfully paired.", ["Facial ritual", "Sculpting massage", "Personalised home-care notes"], "/images/vela-demo/a0nwnab0vaw0krya8nnwmdgdkny.png"],
          ["VELA Experience", "€340", "An unhurried half-day made around you.", ["Signature VELA Ritual", "Nourishing body therapy", "Private relaxation time"], "/images/vela-demo/nsdlfst8mkqtqvkowuwvcrgze.png"],
        ].map(([name, price, copy, items, background], index) => <article data-vela-reveal="card" style={{ "--delay": `${index * 100}ms`, "--package-image": `url(${background})` } as React.CSSProperties} key={name as string}>
          <div className="vela-package-title"><h3>{name as string}</h3><strong>{price as string}</strong></div><p>{copy as string}</p><ul>{(items as string[]).map(item => <li key={item}>{item}</li>)}</ul><Link data-vela-booking href="#booking">Book this experience <ArrowUpRight size={14} /></Link>
        </article>)}
      </div>
      <p className="vela-package-note">Not sure exactly what you need? <Link href="#contact">Begin with a conversation.</Link></p>
    </section>

    <VelaEditorialQuote />

    <section className="vela-team" id="team">
      <div className="vela-team-intro" data-vela-reveal="words"><p className="vela-kicker">The people behind VELA</p><h2>Skilled hands.<br /><em>Quiet care.</em></h2><p>Three practitioners, one shared approach: listen closely, treat thoughtfully, never rush the result.</p></div>
      <div className="vela-team-grid">{velaTeam.map((member, index) => <article data-vela-reveal="card" style={{ "--delay": `${index * 100}ms` } as React.CSSProperties} key={member.name}><img src={member.image} alt={member.name} /><h3>{member.name}</h3><p>{member.role}</p></article>)}</div>
    </section>

    <section className="vela-first-step" id="journey">
      <div className="vela-first-step-copy" data-vela-reveal="words">
        <p className="vela-kicker">Your ritual starts here</p>
        <h2>Take the <em>First Step</em> Today</h2>
        <p>Choose a treatment or begin with a conversation. Your time at VELA is shaped around what would help you feel your best.</p>
        <Link data-vela-magnetic data-vela-booking href="#booking">Book your visit <ArrowUpRight size={15} /></Link>
      </div>
      <div className="vela-first-step-photos" aria-label="A glimpse inside VELA Studio">
        <figure className="step-photo-one vela-image-reveal" data-vela-reveal="image" data-vela-parallax="-18"><img src="/images/vela-demo/rc8skrqjbd149p9uisbtnyeshcc.png" alt="A guest resting during a VELA ritual" /></figure>
        <figure className="step-photo-two vela-image-reveal" data-vela-reveal="image" data-vela-parallax="26"><img src="/images/vela-demo/k8k4xg9yg24p3u9dpoyq42cdaw0.png" alt="A warm treatment room at VELA Studio" /></figure>
        <figure className="step-photo-three vela-image-reveal" data-vela-reveal="image" data-vela-parallax="20"><img src="/images/vela-demo/gbststirevqmhq5krb6heztbrke.png" alt="VELA Studio interior" /></figure>
        <figure className="step-photo-four vela-image-reveal" data-vela-reveal="image" data-vela-parallax="-24"><img src="/images/vela-demo/hskjniyvj6ycet8uuqijiymql4.png" alt="A quiet facial ritual" /></figure>
      </div>
    </section>

    <section className="vela-home-faq" id="faq">
      <div className="vela-home-faq-title" data-vela-reveal="words"><p className="vela-kicker">Before your visit</p><h2>A few things you may <em>want to know.</em></h2></div>
      <div data-vela-reveal="card"><VelaFaqList items={[
        { question: "Which treatment is right for me?", answer: "Start with how you want to feel. Tell us what is changing in your skin or body and we will suggest the most considered place to begin." },
        { question: "What should I expect on my first visit?", answer: "We leave time for a short consultation before every treatment. Your practitioner will explain the ritual, listen to your preferences and adapt the session around you." },
        { question: "How early should I arrive?", answer: "Arrive around ten minutes early so you can settle in without rushing. Tea and water are waiting for you." },
        { question: "Can I purchase a VELA gift card?", answer: "Yes. Digital and printed gift cards are available for individual treatments or any value you choose." },
      ]} /></div>
    </section>

    <VelaFooter />
  </main>;
}
