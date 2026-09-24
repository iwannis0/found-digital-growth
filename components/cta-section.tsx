import Link from "next/link";
import { ArrowRight, Clock, MapPin, ShieldCheck } from "lucide-react";

const reassurances = [
  [Clock, "Written review within two working days"],
  [ShieldCheck, "Free, with no obligation"],
  [MapPin, "Cyprus-based team"],
] as const;

export function CTASection({ eyebrow = "Your next step", title = "Not sure where to begin?", body = "Start with a focused review of your website, visibility and customer journey.", label = "Get a Free Website Audit", href = "/free-audit", variant = "strip", steps }: { eyebrow?: string; title?: string; body?: string; label?: string; href?: string; variant?: "panel" | "strip"; steps?: [string, string][] }) {
  if (variant === "strip") return (
    <section className="cta-strip">
      <div className="site-container">
        <div className="cta-strip-inner" data-motion="rise">
          <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{body}</p></div>
          <Link className="button button-dark button-large" href={href}>{label}<ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
  return (
    <section className="cta-section">
      <div className="site-container">
        <div className={steps ? "cta-panel cta-panel-steps" : "cta-panel"} data-motion="rise">
          <div className="cta-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p>{body}</p>
            <div className="cta-actions">
              <Link className="button button-accent button-large" href={href}>{label}<ArrowRight aria-hidden="true" /></Link>
              <Link className="button button-outline-light button-large" href="/contact">Talk to us</Link>
            </div>
          </div>
          {steps ? (
            <ol className="cta-steps">
              {steps.map(([heading, text], index) => <li key={heading}><span>0{index + 1}</span><div><strong>{heading}</strong><small>{text}</small></div></li>)}
            </ol>
          ) : (
            <ul className="cta-reassurance">
              {reassurances.map(([Icon, text]) => <li key={text}><i aria-hidden="true"><Icon /></i><span>{text}</span></li>)}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
