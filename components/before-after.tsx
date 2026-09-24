"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { SectionHeading } from "@/components/section-heading";

export function BeforeAfter() {
  const [value, setValue] = useState(38);
  const [mobileView, setMobileView] = useState<"before" | "after">("after");
  const [isIntroducing, setIsIntroducing] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasInteracted.current) return;
      observer.disconnect();
      setIsIntroducing(true);
      timers.current.push(setTimeout(() => { if (!hasInteracted.current) setValue(55); }, 350));
      timers.current.push(setTimeout(() => { if (!hasInteracted.current) setValue(38); }, 1120));
      timers.current.push(setTimeout(() => setIsIntroducing(false), 1900));
    }, { threshold: 0.55 });
    observer.observe(frame);
    return () => { observer.disconnect(); timers.current.forEach(clearTimeout); };
  }, []);

  const handleValueChange = (next: number[]) => {
    hasInteracted.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setIsIntroducing(false);
    setValue(next[0] ?? 38);
  };

  return (
    <section className="compare-section section-pad">
      <div className="site-container">
        <SectionHeading eyebrow="A clearer standard" title="What your website could look like." body="Compare a typical outdated layout with a cleaner, more deliberate redesign direction." />
        <div className="compare-meta" aria-hidden="true">
          <span>Website transformation</span>
          <span>Drag to compare</span>
        </div>
        <div className="compare-mobile-toggle" aria-label="Choose comparison view">
          <button type="button" className={mobileView === "before" ? "is-active" : ""} onClick={() => setMobileView("before")} aria-pressed={mobileView === "before"}>Before</button>
          <button type="button" className={mobileView === "after" ? "is-active" : ""} onClick={() => setMobileView("after")} aria-pressed={mobileView === "after"}>After</button>
        </div>
        <div className={`compare-frame${isIntroducing ? " is-introducing" : ""}`} data-mobile-view={mobileView} ref={frameRef}>
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
            <Slider min={0} max={100} step={1} value={[value]} onValueChange={handleValueChange} aria-label="Before and after comparison" />
          </div>
        </div>
        <div className="compare-outcome" aria-label="What the redesign improves">
          <span>Clearer property search</span>
          <span>Stronger enquiry path</span>
          <span>Better mobile hierarchy</span>
        </div>
      </div>
    </section>
  );
}
