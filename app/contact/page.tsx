import type { Metadata } from "next";
import { PageMotion } from "@/components/page-motion";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Contact", description: "Contact FOUND. about website design, local SEO, Google Business, analytics and digital foundations in Cyprus.", alternates: { canonical: "/contact" } };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ package?: string | string[]; service?: string | string[] }> }) { const params = await searchParams; const initialPackage = typeof params.package === "string" ? params.package : ""; const initialService = typeof params.service === "string" ? params.service : ""; return <main className="contact-page motion-page"><PageMotion />
  <section className="contact-shell"><div className="site-container contact-grid"><div className="contact-intro"><p className="eyebrow">Contact FOUND.</p><h1>Tell us what the business needs next<span>.</span></h1><p>Share the current position, the service you are considering and what a successful result would look like.</p><div className="contact-details"><a href={`mailto:${siteConfig.email}`} data-track="email_click"><Mail />{siteConfig.email}</a><a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} data-track="phone_click"><Phone />{siteConfig.phone}</a><span><MapPin />Cyprus</span></div><div className="contact-expectation"><strong>What happens next?</strong><p>We review the details and usually reply within two working days. If a call is useful, we will arrange one.</p><Link href="/free-audit" className="text-link">Prefer a structured audit?</Link></div></div><div className="form-panel contact-form-panel"><ContactForm initialPackage={initialPackage} initialService={initialService} /></div></div></section>
  </main>; }
