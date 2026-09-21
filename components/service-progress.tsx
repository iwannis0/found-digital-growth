"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "service-overview", label: "Overview" },
  { id: "service-included", label: "Included" },
  { id: "service-outcome", label: "Outcome" },
  { id: "service-approach", label: "Approach" },
];

export function ServiceProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.38;
      let current = 0;
      sections.forEach(({ id }, index) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= threshold) current = index;
      });
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <nav className="service-progress" aria-label="Service page sections">
    <span className="service-progress-count">0{active + 1} / 04</span>
    <div className="service-progress-track" aria-hidden="true"><span style={{ height: `${(active / (sections.length - 1)) * 100}%` }} /></div>
    {sections.map(({ id, label }, index) => <a key={id} href={`#${id}`} className={active === index ? "is-active" : ""} aria-label={label} aria-current={active === index ? "location" : undefined}><span>{label}</span></a>)}
  </nav>;
}
