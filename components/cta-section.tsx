import { MapPin, ShieldCheck } from "lucide-react";
import { StartOptions } from "@/components/start-options";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const reassuranceIcons = [ShieldCheck, MapPin] as const;

export function CTASection({ locale = "en", eyebrow, title, body }: { locale?: Locale; eyebrow?: string; title?: string; body?: string }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.cta;
  return (
    <section className="cta-section">
      <div className="site-container">
        <div className="cta-panel" data-motion="rise">
          <div className="cta-copy">
            <p className="eyebrow">{eyebrow ?? t.eyebrow}</p>
            <h2>{title ?? t.title}</h2>
            <p>{body ?? t.body}</p>
            <ul className="cta-notes">
              {t.reassurances.map((text, index) => { const Icon = reassuranceIcons[index]; return <li key={text}><Icon aria-hidden="true" /><span>{text}</span></li>; })}
            </ul>
          </div>
          <StartOptions locale={locale} copy={dictionary.header.start} />
        </div>
      </div>
    </section>
  );
}
