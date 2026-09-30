const keys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function captureAttribution() {
  if (typeof window === "undefined") return {};

  const url = new URL(window.location.href);

  try {
    const hasCampaignParams = keys.some((key) =>
      url.searchParams.has(key)
    );

    if (hasCampaignParams) {
      for (const key of keys) {
        const value = url.searchParams.get(key) ?? "";

        window.sessionStorage.setItem(
          `attr_${key}`,
          value.slice(0, 160)
        );
      }
    }
  } catch {
    return {};
  }

  return getStoredAttribution();
}

function getStoredAttribution() {
  try {
    return {
      utmSource:
        window.sessionStorage.getItem("attr_utm_source") ?? "",
      utmMedium:
        window.sessionStorage.getItem("attr_utm_medium") ?? "",
      utmCampaign:
        window.sessionStorage.getItem("attr_utm_campaign") ?? "",
      utmContent:
        window.sessionStorage.getItem("attr_utm_content") ?? "",
      utmTerm:
        window.sessionStorage.getItem("attr_utm_term") ?? "",
    };
  } catch {
    return {};
  }
}

export function getAttribution() {
  if (typeof window === "undefined") return {};

  captureAttribution();

  return getStoredAttribution();
}