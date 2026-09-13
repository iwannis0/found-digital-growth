"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { SectionHeading } from "@/components/section-heading";

export function BeforeAfter() {
  const [value, setValue] = useState(52);
  return (
    <section className="compare-section section-pad">
      <div className="site-container">
        <SectionHeading eyebrow="A clearer standard" title="What your website could look like." body="Drag to compare a typical outdated layout with a cleaner, more deliberate redesign direction." />
        <div className="compare-frame">
          <div className="compare-base compare-after">
            <div className="compare-top"><b>ARCHITECT<span>.</span></b><span>Projects &nbsp; Studio &nbsp; Contact</span></div>
            <div className="compare-message"><small>OUR REDESIGN</small><h3>Spaces shaped<br /><i>around life.</i></h3><button>Explore projects ↗</button></div>
            <div className="compare-projects"><span>01 / Residence</span><span>02 / Hospitality</span><span>03 / Commercial</span></div>
          </div>
          <div className="compare-base compare-before" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
            <div className="old-header"><b>ARCHITECTURE COMPANY</b><span>HOME | ABOUT | SERVICES | CONTACT</span></div>
            <div className="old-body"><small>BEFORE</small><h3>WELCOME TO<br />OUR WEBSITE</h3><p>We are a company offering quality architecture services. Contact us for more information.</p><button>READ MORE</button></div>
          </div>
          <div className="compare-handle" style={{ left: `${value}%` }} aria-hidden="true"><span>↔</span></div>
          <div className="compare-slider-control">
            <Slider min={8} max={92} step={1} value={[value]} onValueChange={(next) => setValue(next[0] ?? 52)} aria-label="Before and after comparison" />
          </div>
        </div>
      </div>
    </section>
  );
}
