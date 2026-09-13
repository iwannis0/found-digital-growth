import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection({ title = "Not sure where to begin?", body = "Start with a clear, practical review of your current digital presence.", label = "Get a Free Website Audit", href = "/free-audit" }: { title?: string; body?: string; label?: string; href?: string }) {
  return (
    <section className="cta-section">
      <div className="site-container cta-inner">
        <div><p className="eyebrow">Your next step</p><h2>{title}</h2><p>{body}</p></div>
        <Link className="button button-accent button-large" href={href}>{label}<ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
