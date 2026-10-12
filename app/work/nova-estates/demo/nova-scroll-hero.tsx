import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroSearch } from "./search";
import { MagneticLink } from "./magnetic-link";

export function NovaScrollHero() {
  return (
    <section className="nova-scroll-hero" aria-label="NOVA Estates property walkthrough">
      <div className="nova-scroll-hero__sticky nova-hero">
        <div className="nova-hero-media nova-hero-media--sequence" aria-hidden="true">
          <video
            className="nova-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source media="(min-width: 701px)" src="/work/nova-estates/nova-scroll-hero-mobile.mp4" type="video/mp4" />
          </video>
          <div className="nova-hero-mobile-photo" />
        </div>
        <div className="nova-hero-shade" />
        <div className="nova-hero-copy">
          <p className="nova-eyebrow">Private property · Cyprus</p>
          <h1>Homes of<br /><em>quiet distinction.</em></h1>
          <p>A considered collection of coastal homes, city residences and new developments across Cyprus.</p>
          <MagneticLink href="/work/nova-estates/demo/properties" className="nova-button nova-button-light nova-magnetic">Explore properties <ArrowUpRight /></MagneticLink>
        </div>
        <HeroSearch />
        <a className="nova-scroll" href="#collections">Discover <ArrowDown /></a>
      </div>
    </section>
  );
}
