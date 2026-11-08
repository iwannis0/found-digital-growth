import Link from "next/link";
import { ArrowRight, Clock, MapPin, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";

const reassuranceIcons = [Clock, ShieldCheck, MapPin] as const;

export function CTASection({ locale = "en", eyebrow, title, body, label, href = "/free-audit" }: { locale?: Locale; eyebrow?: string; title?: string; body?: string; label?: string; href?: string }) {
  const t = getDictionary(locale).cta;
  return (
    <section className="cta-section">
      <div className="site-container">
        <div className="cta-panel" data-motion="rise">
          <div className="cta-copy">
            <p className="eyebrow">{eyebrow ?? t.eyebrow}</p>
            <h2>{title ?? t.title}</h2>
            <p>{body ?? t.body}</p>
            <div className="cta-actions">
              <Link className="button button-accent button-large" href={localizePath(locale, href)}>{label ?? t.label}<ArrowRight aria-hidden="true" /></Link>
              <Link className="button button-outline-light button-large" href={localizePath(locale, "/contact")}>{t.talk}</Link>
            </div>
          </div>
          <ul className="cta-reassurance">
            {t.reassurances.map((text, index) => { const Icon = reassuranceIcons[index]; return <li key={text}><i aria-hidden="true"><Icon /></i><span>{text}</span></li>; })}
          </ul>
        </div>
      </div>
    </section>
  );
}
