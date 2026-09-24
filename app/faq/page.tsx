import type { Metadata } from "next";
import { PageMotion } from "@/components/page-motion";
import { ArrowDown } from "lucide-react";
import { FAQList } from "@/components/faq-list";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers about FOUND. pricing, timelines, ownership, hosting, SEO, website care and support.", alternates: { canonical: "/faq" } };

const mostAsked = ["How much does a website cost?", "Who owns the website?", "How long does a website take?", "Is Website Care mandatory?"];

export default function FAQPage() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <main className="motion-page"><PageMotion /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><section className="lit-hero faq-lit-hero"><div className="site-container lit-hero-grid"><div><p className="eyebrow">FAQ</p><h1>Clear answers <em>before you commit.</em></h1><p className="lit-hero-lead">Everything from ownership and pricing to Website Care, SEO and what happens after launch.</p></div><div className="hero-panel"><p className="hero-panel-head">Most asked</p>{mostAsked.map((question, index) => <a className="hero-panel-row" href="#answers" key={question}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><ArrowDown aria-hidden="true" /></a>)}<p className="hero-panel-foot">{faqs.length} answers below</p></div></div></section><section className="faq-page-section section-pad" id="answers"><div className="site-container faq-grid"><div className="faq-sticky" data-motion="rise"><p className="eyebrow">{faqs.length} useful answers</p><h2>No vague promises. No hidden process.</h2></div><FAQList /></div></section></main>;
}
