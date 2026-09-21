"use client";

import { useEffect } from "react";

export function PageMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".motion-page");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-motion], .motion-reveal");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -28px 0px" });

    root.classList.add("motion-ready");
    targets.forEach((target) => observer.observe(target));

    const parallaxMedia = window.matchMedia("(min-width: 901px) and (hover: hover)");
    const parallaxImages = root.querySelectorAll<HTMLElement>("[data-motion-parallax] img");
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      if (!parallaxMedia.matches) return;
      for (const image of parallaxImages) {
        const bounds = image.parentElement?.getBoundingClientRect();
        if (!bounds || bounds.bottom < 0 || bounds.top > window.innerHeight) continue;
        const distance = (bounds.top + bounds.height / 2 - window.innerHeight / 2) / window.innerHeight;
        image.style.setProperty("--motion-parallax", `${Math.max(-14, Math.min(14, distance * -22)).toFixed(1)}px`);
      }
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(updateParallax); };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
      parallaxImages.forEach((image) => image.style.removeProperty("--motion-parallax"));
    };
  }, []);

  return null;
}
