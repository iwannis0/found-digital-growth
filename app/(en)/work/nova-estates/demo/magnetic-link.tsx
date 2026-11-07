"use client";

import { type MouseEvent, type ReactNode, useRef } from "react";

export function MagneticLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!canHover() || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width - 0.5) * 10;
    const y = ((event.clientY - box.top) / box.height - 0.5) * 10;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => ref.current?.style.removeProperty("transform");
  return <a ref={ref} href={href} className={className} onMouseMove={move} onMouseLeave={reset}>{children}</a>;
}
