/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { VelaContact, VelaReviews } from "./vela-client";

const base = "/work/vela-studio/demo";

export function VelaTestimonial() {
  return <VelaReviews />;
}

export function VelaEditorialQuote() {
  return <section className="vela-editorial-quote">
    <img src="/images/vela-demo/nsdlfst8mkqtqvkowuwvcrgze.png" alt="VELA relaxation lounge looking over the city at sunset" />
    <div className="vela-editorial-quote-card" data-vela-reveal="card">
      <div className="vela-editorial-quote-image"><img src="/images/vela-demo/ucd90x8hy5fl0gl7rudypqtdccs.png" alt="Warm light inside VELA Studio" /></div>
      <blockquote>“The care is consistently thoughtful, and the quiet atmosphere makes VELA the place where I can truly reset.”</blockquote>
      <cite>— Eleni P.</cite>
    </div>
  </section>;
}

export function VelaFooter({ contact = true }: { contact?: boolean }) {
  return <>{contact && <VelaContact />}<footer className="vela-footer">
    <div className="vela-opening-hours"><div><p className="vela-kicker">Opening hours</p><h2>Time for a <em>slower moment.</em></h2></div><dl><div><dt>Monday–Friday</dt><dd>09:00–19:00</dd></div><div><dt>Saturday</dt><dd>09:00–16:00</dd></div><div><dt>Sunday</dt><dd>Closed</dd></div></dl></div>
    <div className="vela-contact-strip">
      <a href="tel:+35722000742"><Phone size={14} /> +357 22 000742</a>
      <span><MapPin size={14} /> 24 Artemidos Lane, Nicosia</span>
      <a href="mailto:hello@velastudio.example"><Mail size={14} /> hello@velastudio.example</a>
      <span><span aria-hidden="true">◎</span> @velastudio.cy</span>
    </div>
    <div className="vela-footer-bottom"><Link className="vela-footer-logo" href={base}>VELA<span>STUDIO</span></Link><p>© 2026 VELA Studio. Fictional website concept.</p><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><span>Cookies</span></div></div>
  </footer></>;
}
