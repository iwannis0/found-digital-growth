import type { Locale } from "@/lib/i18n";

/**
 * The Black Friday offer. While `active` is true the pricing page shows each regular price
 * crossed out next to its offer price, and "starts at" copy across the site uses the offer price.
 * Set `active` to false after the offer ends: everything falls back to the regular prices.
 */
export const blackFriday = {
  active: true,
  /** Last day of the offer (Cyprus time), also sent to search engines as priceValidUntil. */
  until: "2026-11-30",
  /** The moment the countdown reaches zero: end of the last day, Cyprus time. */
  endsAt: "2026-11-30T23:59:59+02:00",
  label: { en: "Black Friday", el: "Black Friday" },
  ends: { en: "Offer ends Monday 30 November", el: "Η προσφορά λήγει τη Δευτέρα 30 Νοεμβρίου" },
  ribbon: {
    en: ["Black Friday", "Up to €200 off every website", "€100 to €150 off every solution", "Ends Monday 30 November"],
    el: ["Black Friday", "Έως 200 € έκπτωση σε κάθε ιστοσελίδα", "100 € έως 150 € έκπτωση σε κάθε λύση", "Λήγει τη Δευτέρα 30 Νοεμβρίου"],
  },
  countdown: {
    en: { title: "Offer ends in", days: "days", hours: "hours", minutes: "min", seconds: "sec" },
    el: { title: "Η προσφορά λήγει σε", days: "ημέρες", hours: "ώρες", minutes: "λεπτά", seconds: "δευτ." },
  },
  save: { en: "Save", el: "Κερδίζετε" },
} as const;

/** The lowest website package price, for "packages start at …" copy outside the pricing page. */
export const startingPrice: Record<Locale, string> = blackFriday.active
  ? { en: "€599", el: "599 €" }
  : { en: "€699", el: "699 €" };

/** Picks the price to show: the offer price while the offer runs, otherwise the regular one. */
export function priced<T extends { price: string; sale?: string }>(item: T): T & { was?: string } {
  return blackFriday.active && item.sale ? { ...item, price: item.sale, was: item.price } : item;
}

const amount = (price: string) => Number(price.replace(/[^\d]/g, ""));

/** "Save €200" / "Κερδίζετε 200 €" for a regular and an offer price, in the page's number format. */
export function savingLabel(locale: Locale, was: string, now: string) {
  const diff = amount(was) - amount(now);
  if (diff <= 0) return "";
  const money = new Intl.NumberFormat(locale === "el" ? "el-GR" : "en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(diff);
  return `${blackFriday.save[locale]} ${money}`;
}
