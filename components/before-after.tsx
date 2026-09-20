"use client";

import Image from "next/image";
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
            <Image src="/images/BA/after.png" alt="Redesigned premium real estate website" fill sizes="(max-width: 700px) 100vw, 90vw" className="compare-image" />
          </div>
          <div className="compare-base compare-before" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
            <Image src="/images/BA/before.png" alt="Outdated real estate website before redesign" fill sizes="(max-width: 700px) 100vw, 90vw" className="compare-image" />
          </div>
          <div className="compare-label compare-label-before" aria-hidden="true">Before</div>
          <div className="compare-label compare-label-after" aria-hidden="true">After</div>
          <div className="compare-handle" style={{ left: `${value}%` }} aria-hidden="true"><span><i>←</i><i>→</i></span></div>
          <div className="compare-slider-control">
            <Slider min={0} max={100} step={1} value={[value]} onValueChange={(next) => setValue(next[0] ?? 38)} aria-label="Before and after comparison" />
          </div>
        </div>
      </div>
    </section>
  );
}
