"use client";

import { useEffect } from "react";
import {
  trackEvent,
  watchAnalyticsConsent,
} from "@/lib/analytics-consent";

export { trackEvent } from "@/lib/analytics-consent";

export function Analytics() {
  useEffect(() => {
    const stopWatching = watchAnalyticsConsent();

    const click = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-track]")
          : null;

      const name = target?.dataset.track;

      if (!name) return;

      const parameters: Record<
        string,
        string | number | boolean
      > = {
        label:
          target.dataset.trackLabel ??
          target.textContent?.trim().slice(0, 80) ??
          "",
      };

      if (target.dataset.trackLocation) {
        parameters.location =
          target.dataset.trackLocation;
      }

      if (target.dataset.trackPackageName) {
        parameters.package_name =
          target.dataset.trackPackageName;
      }

      trackEvent(name, parameters);
    };

    document.addEventListener("click", click);

    return () => {
      stopWatching();
      document.removeEventListener("click", click);
    };
  }, []);

  return null;
}

export function PageTracker({
  event,
  label,
}: {
  event: string;
  label?: string;
}) {
  useEffect(() => {
    trackEvent(event, label ? { label } : {});
  }, [event, label]);

  return null;
}