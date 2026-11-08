import { ArrowDown } from "lucide-react";
import { FAQList } from "@/components/faq-list";
import { PageMotion } from "@/components/page-motion";
import { getFaqs } from "@/lib/faqs-el";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const en = {
  metaTitle: "Web Design FAQ: Cost, Timelines & Ownership",
  metaDescription: "Answers to common questions about website cost in Cyprus, timelines, who owns the site and domain, hosting, SEO, Website Care and support.",
  eyebrow: "FAQ",
  titleLead: "Clear answers",
  titleAccent: "before you commit.",
  lead: "Everything from ownership and pricing to Website Care, SEO and what happens after launch.",
  mostAsked: "Most asked",
  answersBelow: "{count} answers below",
  usefulAnswers: "{count} useful answers",
  stickyTitle: "No vague promises. No hidden process.",
};

const el: typeof en = {
  metaTitle: "Συχνές Ερωτήσεις: Κόστος, Χρόνοι & Ιδιοκτησία Ιστοσελίδας",
  metaDescription: "Απαντήσεις σε συχνές ερωτήσεις για το κόστος μιας ιστοσελίδας στην Κύπρο, τους χρόνους, την ιδιοκτησία της ιστοσελίδας και του domain, το hosting, το SEO, το Website Care και την υποστήριξη.",
  eyebrow: "Συχνές ερωτήσεις",
  titleLead: "Ξεκάθαρες απαντήσεις",
  titleAccent: "πριν δεσμευτείτε.",
  lead: "Από την ιδιοκτησία και τις τιμές μέχρι το Website Care, το SEO και ό,τι ακολουθεί μετά το λανσάρισμα.",
  mostAsked: "Οι πιο συχνές",
  answersBelow: "{count} απαντήσεις παρακάτω",
  usefulAnswers: "{count} χρήσιμες απαντήσεις",
  stickyTitle: "Χωρίς αόριστες υποσχέσεις. Χωρίς κρυφές διαδικασίες.",
};

const copy = { en, el };

// Positions in lib/faqs.ts: cost, website ownership, timeline, whether Website Care is mandatory.
const mostAskedIndexes = [0, 3, 7, 1];

export function faqMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/faq", title: t.metaTitle, description: t.metaDescription });
}

export function FAQView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const faqs = getFaqs(locale);
  const count = String(faqs.length);
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", ...(locale === "en" ? {} : { inLanguage: locale }), mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <main className="motion-page"><PageMotion /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} /><section className="lit-hero faq-lit-hero"><div className="site-container lit-hero-grid"><div><p className="eyebrow">{t.eyebrow}</p><h1>{t.titleLead} <em>{t.titleAccent}</em></h1><p className="lit-hero-lead">{t.lead}</p></div><div className="hero-panel"><p className="hero-panel-head">{t.mostAsked}</p>{mostAskedIndexes.map((faqIndex, index) => <a className="hero-panel-row" href="#answers" key={faqIndex}><span>{String(index + 1).padStart(2, "0")}</span><strong>{faqs[faqIndex][0]}</strong><ArrowDown aria-hidden="true" /></a>)}<p className="hero-panel-foot">{t.answersBelow.replace("{count}", count)}</p></div></div></section><section className="faq-page-section section-pad" id="answers"><div className="site-container faq-grid"><div className="faq-sticky" data-motion="rise"><p className="eyebrow">{t.usefulAnswers.replace("{count}", count)}</p><h2>{t.stickyTitle}</h2></div><FAQList list={faqs} /></div></section></main>;
}
