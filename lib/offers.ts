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
  label: { en: "Black Friday", el: "Black Friday" },
  ends: { en: "Offer ends Monday 30 November", el: "Η προσφορά λήγει τη Δευτέρα 30 Νοεμβρίου" },
} as const;

/** The lowest website package price, for "packages start at …" copy outside the pricing page. */
export const startingPrice: Record<Locale, string> = blackFriday.active
  ? { en: "€599", el: "599 €" }
  : { en: "€699", el: "699 €" };

/** Picks the price to show: the offer price while the offer runs, otherwise the regular one. */
export function priced<T extends { price: string; sale?: string }>(item: T): T & { was?: string } {
  return blackFriday.active && item.sale ? { ...item, price: item.sale, was: item.price } : item;
}
