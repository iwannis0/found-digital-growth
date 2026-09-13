const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function captureAttribution() {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  try {
    for (const key of keys) {
      const value = url.searchParams.get(key);
      if (value) window.sessionStorage.setItem(`found_${key}`, value.slice(0, 160));
    }
  } catch { return {}; }
  return getStoredAttribution();
}

function getStoredAttribution() {
  try {
    return {
      utmSource: window.sessionStorage.getItem("found_utm_source") ?? "",
      utmMedium: window.sessionStorage.getItem("found_utm_medium") ?? "",
      utmCampaign: window.sessionStorage.getItem("found_utm_campaign") ?? "",
      utmContent: window.sessionStorage.getItem("found_utm_content") ?? "",
      utmTerm: window.sessionStorage.getItem("found_utm_term") ?? "",
    };
  } catch { return {}; }
}

export function getAttribution() {
  if (typeof window === "undefined") return {};
  captureAttribution();
  return getStoredAttribution();
}
