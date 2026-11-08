import Link from "next/link";
import { ArrowUpRight, CalendarDays, LayoutTemplate, ScanSearch } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";

// The three ways to start with VISION. Shown together wherever a visitor picks a next step,
// so the free offers and the call always read as one short, consistent choice.
// `track` stays in English so analytics reads the same from both languages.
const startOptions = [
  { href: "/free-audit", icon: ScanSearch, track: "Free website audit" },
  { href: "/free-prototype", icon: LayoutTemplate, track: "Free prototype" },
  { href: "/book", icon: CalendarDays, track: "Book a call" },
] as const;

export function StartOptions({ locale, copy, variant = "panel", onSelect }: { locale: Locale; copy: Dictionary["header"]["start"]; variant?: "panel" | "menu"; onSelect?: () => void }) {
  return (
    <ul className={`start-options start-options-${variant}`}>
      {startOptions.map(({ href, icon: Icon, track }, index) => (
        <li key={href}>
          <Link href={localizePath(locale, href)} onClick={onSelect} data-track="start_option_click" data-track-label={track} data-track-location={variant}>
            <i aria-hidden="true"><Icon /></i>
            <span><strong>{copy.options[index].title}</strong><small>{copy.options[index].detail}</small></span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
