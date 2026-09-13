import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { FAQList } from "@/components/faq-list";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers about FOUND. pricing, timelines, ownership, hosting, SEO, website care and support.", alternates: { canonical: "/faq" } };

export default function FAQPage() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><section className="page-hero faq-hero"><div className="site-container"><p className="eyebrow">FAQ</p><h1>Clear answers before<br /><em>you commit.</em></h1><p>Everything from ownership and pricing to Website Care, SEO and what happens after launch.</p></div></section><section className="faq-page-section section-pad"><div className="site-container faq-grid"><div className="faq-sticky"><p className="eyebrow">21 useful answers</p><h2>No vague promises. No hidden process.</h2></div><FAQList /></div></section><CTASection /></main>;
}
