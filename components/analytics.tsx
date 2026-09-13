"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const refresh = () => setEnabled(window.localStorage.getItem("found-cookie-consent") === "accepted");
    refresh();
    window.addEventListener("found:consent-changed", refresh);
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;
      const name = target?.dataset.track;
      if (name) trackEvent(name, { label: target.dataset.trackLabel ?? target.textContent?.trim().slice(0, 80) ?? "" });
    };
    document.addEventListener("click", click);
    return () => { window.removeEventListener("found:consent-changed", refresh); document.removeEventListener("click", click); };
  }, []);

  if (!measurementId || !enabled) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="found-ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}

export function PageTracker({ event, label }: { event: string; label?: string }) {
  useEffect(() => { trackEvent(event, label ? { label } : {}); }, [event, label]);
  return null;
}

export function trackEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", name, parameters);
}
