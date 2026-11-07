"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroSearch } from "./search";
import { MagneticLink } from "./magnetic-link";

export function NovaScrollHero() {
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 701px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const loadWhenIdle = () => setLoadVideo(true);
    const idleWindow = window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const idleId = idleWindow.requestIdleCallback?.(loadWhenIdle, { timeout: 1800 });
    const timeoutId = idleId === undefined ? window.setTimeout(loadWhenIdle, 700) : undefined;

    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="nova-scroll-hero" aria-label="NOVA Estates property walkthrough">
      <div className="nova-scroll-hero__sticky nova-hero">
        <div className="nova-hero-media nova-hero-media--sequence" aria-hidden="true">
          <picture className="nova-hero-poster">
            <source media="(min-width: 701px)" srcSet="/images/nova-demo/nova-hero-desktop.png" />
            <img src="/images/nova-demo/nova-hero-mobile.png" alt="" fetchPriority="high" decoding="sync" />
          </picture>
          {loadVideo && <video
            className="nova-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/nova-demo/nova-hero-desktop.png"
          >
            <source src="/work/nova-estates/nova-scroll-hero-mobile.mp4" type="video/mp4" />
          </video>}
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
