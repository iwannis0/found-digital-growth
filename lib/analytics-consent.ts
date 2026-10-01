import { getAttribution } from "@/lib/client-attribution";

export const consentStorageKey = "cookie-consent";
export const consentChangedEvent = "site:consent-changed";

export const analyticsConsentGrantedEvent =
  "analytics_consent_granted";

export const analyticsConsentDeniedEvent =
  "analytics_consent_denied";

type ConsentValue = "accepted" | "rejected" | null;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

let lastSyncedConsent: ConsentValue | undefined;

function getStoredConsent(): ConsentValue {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(consentStorageKey);

    if (value === "accepted" || value === "rejected") {
      return value;
    }

    return null;
  } catch {
    return null;
  }
}

function getAnalyticsWindow(): AnalyticsWindow | null {
  if (typeof window === "undefined") return null;

  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];

  return analyticsWindow;
}

export function hasAnalyticsConsent() {
  return getStoredConsent() === "accepted";
}

export function syncAnalyticsConsent() {
  if (typeof window === "undefined") return false;

  const consent = getStoredConsent();
  const enabled = consent === "accepted";

  if (consent === lastSyncedConsent) {
    return enabled;
  }

  lastSyncedConsent = consent;

  const analyticsWindow = getAnalyticsWindow();

  if (!analyticsWindow) {
    return enabled;
  }

  analyticsWindow.gtag?.("consent", "update", {
    analytics_storage: enabled ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  const consentEvent: Record<string, string> = {
    event: enabled
      ? analyticsConsentGrantedEvent
      : analyticsConsentDeniedEvent,
  };

  if (enabled) {
    const attribution = getAttribution();

    if ("utmSource" in attribution && attribution.utmSource) {
      consentEvent.campaign_source = attribution.utmSource;
    }

    if ("utmMedium" in attribution && attribution.utmMedium) {
      consentEvent.campaign_medium = attribution.utmMedium;
    }

    if ("utmCampaign" in attribution && attribution.utmCampaign) {
      consentEvent.campaign_name = attribution.utmCampaign;
    }

    if ("utmContent" in attribution && attribution.utmContent) {
      consentEvent.campaign_content = attribution.utmContent;
    }

    if ("utmTerm" in attribution && attribution.utmTerm) {
      consentEvent.campaign_term = attribution.utmTerm;
    }
  }

  analyticsWindow.dataLayer?.push(consentEvent);

  return enabled;
}

export function watchAnalyticsConsent(
  onChange?: (enabled: boolean) => void
) {
  const refresh = () => {
    const enabled = syncAnalyticsConsent();
    onChange?.(enabled);
  };

  const storage = (event: StorageEvent) => {
    if (
      event.key === consentStorageKey ||
      event.key === null
    ) {
      refresh();
    }
  };

  refresh();

  window.addEventListener(consentChangedEvent, refresh);
  window.addEventListener("storage", storage);

  return () => {
    window.removeEventListener(consentChangedEvent, refresh);
    window.removeEventListener("storage", storage);
  };
}

export function trackEvent(
  name: string,
  parameters: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;

  if (!hasAnalyticsConsent()) return;

  const analyticsWindow = getAnalyticsWindow();

  analyticsWindow?.dataLayer?.push({
    event: name,
    ...parameters,
  });
}