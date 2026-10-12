"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 20, suffix: "+", label: "Years of local perspective" },
  { value: 150, suffix: "+", label: "Homes thoughtfully placed" },
  { value: 98, suffix: "%", label: "Client recommendation" },
];

export function NovaStats() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (started) setValues(stats.map(({ value }) => value));
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValues(stats.map(({ value }) => Math.round(value * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);

  return <section ref={ref} className="nova-stats" aria-label="NOVA Estates experience">
    {stats.map((stat, index) => <div key={stat.label}><strong>{values[index]}{stat.suffix}</strong><span>{stat.label}</span></div>)}
  </section>;
}
