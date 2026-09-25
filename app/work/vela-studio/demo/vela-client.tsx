"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import type { VelaFaq } from "./vela-data";

const base = "/work/vela-studio/demo";

export function VelaMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".vela-demo");
    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -5%" },
    );
    const prepareWords = (element: HTMLElement) => {
      if (element.dataset.velaReveal !== "words" || element.dataset.velaSplit) return;
      element.dataset.velaSplit = "true";
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) {
        const textNode = walker.currentNode as Text;
        const parent = textNode.parentElement;
        // Keep controls as a single readable label. Splitting their words turns
        // every word into a separate flex item and creates oversized gaps.
        if (textNode.textContent?.trim() && !parent?.closest("a, button, input, select, textarea")) nodes.push(textNode);
      }
      let index = 0;
      nodes.forEach(node => {
        const fragment = document.createDocumentFragment();
        node.textContent?.split(/(\s+)/).forEach(part => {
          if (!part.trim()) fragment.append(part);
          else {
            const word = document.createElement("span");
            word.className = "vela-word";
            word.style.setProperty("--word-index", String(index++));
            word.textContent = part;
            fragment.append(word);
          }
        });
        node.replaceWith(fragment);
      });
    };
    const register = () => {
      document.querySelectorAll<HTMLElement>("[data-vela-reveal]").forEach(element => {
        if (observed.has(element)) return;
        prepareWords(element);
        observed.add(element);
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * .92 && rect.bottom > 0) element.classList.add("is-revealed");
        else observer.observe(element);
      });
    };
    register();
    root?.classList.add("is-motion-ready");
    requestAnimationFrame(register);
    const mutation = new MutationObserver(register);
    if (root) mutation.observe(root, { childList: true, subtree: true });

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root?.style.setProperty("--vela-scroll", `${window.scrollY}px`);
        document.querySelectorAll<HTMLElement>("[data-vela-parallax]").forEach(element => {
          const rect = element.getBoundingClientRect();
          const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
          const distance = Number(element.dataset.velaParallax || 0);
          element.style.setProperty("--vela-parallax-y", `${Math.max(-1, Math.min(1, progress)) * distance}px`);
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const safety = window.setTimeout(() => register(), 1400);
    return () => { observer.disconnect(); mutation.disconnect(); cancelAnimationFrame(frame); clearTimeout(safety); window.removeEventListener("scroll", onScroll); };
  }, []);
  return null;
}

export function VelaConceptBar() {
  return <div className="vela-concept-bar">
    <span>FOUND. / WEBSITE CONCEPT</span>
    <span>FICTIONAL VELA STUDIO DEMO</span>
    <Link href="/work/vela-studio">BACK TO CASE STUDY <ArrowUpRight size={13} /></Link>
  </div>;
}

export function VelaNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const close = () => setOpen(false);
  return <header className={`vela-nav-wrap ${scrolled ? "is-scrolled" : ""}`}>
    <nav className="vela-nav" aria-label="VELA navigation">
      <Link className="vela-logo" href={base} onClick={close}>VELA<span>STUDIO</span></Link>
      <button className="vela-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
      <div className={`vela-nav-links ${open ? "is-open" : ""}`}>
        <Link href={`${base}#about`} onClick={close}>About</Link>
        <Link href={`${base}/services`} onClick={close}>Treatments</Link>
        <Link href={`${base}#team`} onClick={close}>Our Team</Link>
        <Link href={`${base}#journey`} onClick={close}>Journey</Link>
        <Link className="vela-book-link" data-vela-magnetic data-vela-booking href="#booking" onClick={close}>Book your visit <ArrowUpRight size={15} /></Link>
      </div>
    </nav>
  </header>;
}

export function VelaBooking() {
  const [open, setOpen] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const launch = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-vela-booking]");
      if (!trigger) return;
      event.preventDefault();
      setBooked(false);
      setOpen(true);
    };
    document.addEventListener("click", launch);
    return () => document.removeEventListener("click", launch);
  }, []);

  useEffect(() => {
    const openFromHash = () => window.location.hash === "#booking" && setOpen(true);
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [open]);

  if (!open) return null;
  return <div className="vela-booking-overlay" role="presentation" onMouseDown={event => event.target === event.currentTarget && setOpen(false)}>
    <section className="vela-booking-modal" role="dialog" aria-modal="true" aria-labelledby="vela-booking-title">
      <button className="vela-booking-close" type="button" onClick={() => setOpen(false)} aria-label="Close booking"><X /></button>
      <div className="vela-booking-intro">
        <p className="vela-kicker">Reserve your ritual</p>
        <h2 id="vela-booking-title">Book your <em>visit.</em></h2>
        <p>Choose the moment and treatment that suits you. This is a fictional booking demonstration and no information is stored.</p>
        <div className="vela-booking-hours"><strong>Studio hours</strong><span>Monday–Friday&nbsp;&nbsp; 09:00–19:00</span><span>Saturday&nbsp;&nbsp; 09:00–16:00</span><span>Sunday&nbsp;&nbsp; Closed</span></div>
      </div>
      {booked ? <div className="vela-booking-success" role="status"><Check size={28} /><h3>Your visit is reserved.</h3><p>Thank you. In a real booking flow, VELA would now send your confirmation.</p><button type="button" onClick={() => setOpen(false)}>Close</button></div> :
      <form className="vela-booking-form" onSubmit={event => { event.preventDefault(); setBooked(true); }}>
        <label>Service<select required defaultValue=""><option value="" disabled>Select a treatment</option><option>Facial Rituals</option><option>Sculpting Massage</option><option>Body Therapy</option><option>Skin Renewal</option><option>Lymphatic Treatment</option><option>Signature VELA Ritual</option></select></label>
        <div><label>Date<input required type="date" /></label><label>Time<select required defaultValue=""><option value="" disabled>Select a time</option><option>09:00</option><option>10:30</option><option>12:00</option><option>14:00</option><option>15:30</option><option>17:00</option></select></label></div>
        <label>Your name<input required name="booking-name" placeholder="Jane Smith" /></label>
        <label>Contact detail<input required name="booking-contact" placeholder="Email or phone number" /></label>
        <button type="submit">Reserve appointment <ArrowUpRight size={16} /></button>
      </form>}
    </section>
  </div>;
}

export function VelaFaqList({ items }: { items: VelaFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="vela-faq-list">
    {items.map((item, index) => <div className={`vela-faq-item ${open === index ? "is-open" : ""}`} key={item.question}>
      <button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>
        <span>{item.question}</span><span className="vela-faq-plus">{open === index ? "−" : "+"}</span>
      </button>
      <div className="vela-faq-answer"><div><p>{item.answer}</p></div></div>
    </div>)}
  </div>;
}

const velaReviews = [
  { quote: "VELA feels less like an appointment and more like a pause from everything else.", author: "Anna M.", image: "/images/vela-demo/qzd7azpclccerkm1tsflp843wjq.png" },
  { quote: "The whole experience is calm, personal and beautifully considered. I leave feeling lighter every time.", author: "Elena P.", image: "/images/vela-demo/hskjniyvj6ycet8uuqijiymql4.png" },
  { quote: "Thoughtful care, an incredible atmosphere and treatments that never feel rushed or routine.", author: "Maya K.", image: "/images/vela-demo/yuvqgqe0od9qpw1ca1lm1tedwk.png" },
];

export function VelaReviews() {
  const [active, setActive] = useState(0);
  const show = (direction: number) => setActive(index => (index + direction + velaReviews.length) % velaReviews.length);
  const review = velaReviews[active];
  return <section className="vela-testimonial" id="testimonial">
    <video autoPlay muted loop playsInline preload="metadata" poster="/images/vela-demo/i8siwmvan1tkul9bjklny3myckq.png" aria-label="Sunlit VELA Studio relaxation room"><source src="/images/vela-demo/fvp2yoe3pqekoaxcq7i7k5p14c.mp4" type="video/mp4" /></video>
    <div className="vela-quote-card is-revealed" key={active}>
      <div className="vela-quote-thumb"><img src={review.image} alt={`VELA Studio guest ${review.author}`} /></div>
      <blockquote>“{review.quote}”</blockquote>
      <cite>— {review.author}</cite>
      <div className="vela-review-controls"><button type="button" onClick={() => show(-1)} aria-label="Previous review"><ArrowLeft /></button><span>{active + 1} / {velaReviews.length}</span><button type="button" onClick={() => show(1)} aria-label="Next review"><ArrowRight /></button></div>
    </div>
  </section>;
}

export function VelaContact() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <section className="vela-contact" id="contact">
    <div className="vela-contact-grid">
      <div data-vela-reveal="words">
        <p className="vela-kicker">A visit shaped around you</p>
        <h2>Get in Touch <em>Now</em></h2>
        {sent ? <div className="vela-confirmation" role="status"><Check size={18} /><div><strong>Thank you.</strong><span>Your demo enquiry has been received. VELA would be in touch shortly.</span></div></div> : <form onSubmit={submit}>
          <label>Name<input required name="name" placeholder="Jane Smith" /></label>
          <label>Email<input required type="email" name="email" placeholder="jane@smith.com" /></label>
          <label>Treatment<select name="treatment" defaultValue=""><option value="" disabled>Select a treatment</option><option>Facial Rituals</option><option>Sculpting Massage</option><option>Body Therapy</option><option>Skin Renewal</option><option>Lymphatic Treatment</option><option>Signature VELA Ritual</option></select></label>
          <label>Message<textarea name="message" placeholder="Tell us what you need." /></label>
          <button type="submit">Send enquiry <ArrowUpRight size={15} /></button>
          <small>VELA Studio is a fictional portfolio concept. No information is stored.</small>
        </form>}
      </div>
      <div className="vela-contact-image vela-image-reveal" data-vela-reveal="image"><img src="/images/vela-demo/biv4ccr6e3dv0rpbwvkaa5vwnaq.png" alt="A calm VELA facial treatment" /></div>
    </div>
  </section>;
}
