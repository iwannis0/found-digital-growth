export const consentStorageKey = "found-cookie-consent";
export const consentChangedEvent = "found:consent-changed";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(consentStorageKey) === "accepted";
  } catch {
    return false;
  }
}

export function syncAnalyticsConsent() {
  const enabled = Boolean(measurementId) && hasAnalyticsConsent();
  if (typeof window !== "undefined" && measurementId) {
    // Also stops automatic events from an already-loaded Google tag.
    Object.assign(window, { [`ga-disable-${measurementId}`]: !enabled });
  }
  return enabled;
}

export function watchAnalyticsConsent(onChange: (enabled: boolean) => void) {
  const refresh = () => onChange(syncAnalyticsConsent());
  const storage = (event: StorageEvent) => {
    if (event.key === consentStorageKey || event.key === null) refresh();
  };
  refresh();
  window.addEventListener(consentChangedEvent, refresh);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener(consentChangedEvent, refresh);
    window.removeEventListener("storage", storage);
  };
}

export function trackEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  // Read the current choice for every event, even before React rerenders.
  if (!syncAnalyticsConsent()) return;
  (window as AnalyticsWindow).gtag?.("event", name, parameters);
}
