"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Next.js scrolls the new page's content into view, which stops just under the
// sticky header. Start every newly opened page at the very top instead, but leave
// back/forward navigation and #anchor links to the browser.
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isHistoryNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => { isHistoryNavigation.current = true; };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (isHistoryNavigation.current) { isHistoryNavigation.current = false; return; }
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
