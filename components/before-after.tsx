"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { SectionHeading } from "@/components/section-heading";

export function BeforeAfter() {
  const [value, setValue] = useState(38);
  const [mobileView, setMobileView] = useState<"before" | "after">("after");

  return (
    <section className="compare-section section-pad">
      <div className="site-container">
        <SectionHeading eyebrow="A clearer standard" title="What your website could look like." body="Drag to compare a typical outdated layout with a cleaner, more deliberate redesign direction." />
        <div className="compare-meta" aria-hidden="true">
          <span>Website transformation</span>
          <span>Drag to compare</span>
        </div>
        <div className="compare-mobile-toggle" aria-label="Choose comparison view">
          <button type="button" className={mobileView === "before" ? "is-active" : ""} onClick={() => setMobileView("before")} aria-pressed={mobileView === "before"}>Before</button>
          <button type="button" className={mobileView === "after" ? "is-active" : ""} onClick={() => setMobileView("after")} aria-pressed={mobileView === "after"}>After</button>
        </div>
        <div className="compare-frame" data-mobile-view={mobileView}>
          <div className="compare-base compare-after">
            <div className="compare-top"><b>ARCHITECT<span>.</span></b><span>Projects &nbsp; Studio &nbsp; Contact &nbsp; ↗</span></div>
            <div className="compare-architecture" aria-hidden="true">
              <span className="architecture-sun" />
              <span className="architecture-slab" />
              <span className="architecture-opening" />
              <span className="architecture-path" />
              <small>Residence 01&nbsp;&nbsp; / &nbsp;&nbsp;Mediterranean</small>
            </div>
            <div className="compare-message"><small>ARCHITECTURE FOR LIVING</small><h3>Spaces shaped<br /><i>around life.</i></h3><p>Quiet, enduring places designed around the way people live.</p><span className="compare-demo-cta">View selected work <b>↗</b></span></div>
            <div className="compare-projects"><span>01 / Residence</span><span>02 / Hospitality</span><span>03 / Commercial</span></div>
          </div>
          <div className="compare-base compare-before" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
            <div className="old-header"><b>ARCHITECTURE COMPANY</b><span>HOME | ABOUT | SERVICES | CONTACT</span></div>
            <div className="old-body"><small>BEFORE</small><h3>WELCOME TO<br />OUR WEBSITE</h3><p>We are a company offering quality architecture services. Contact us for more information.</p><button>READ MORE</button></div>
          </div>
          <div className="compare-label compare-label-before" aria-hidden="true">Before</div>
          <div className="compare-label compare-label-after" aria-hidden="true">After</div>
          <div className="compare-handle" style={{ left: `${value}%` }} aria-hidden="true"><span><i>←</i><i>→</i></span></div>
          <div className="compare-slider-control">
            <Slider min={8} max={92} step={1} value={[value]} onValueChange={(next) => setValue(next[0] ?? 38)} aria-label="Before and after comparison" />
          </div>
        </div>
      </div>
    </section>
  );
}
