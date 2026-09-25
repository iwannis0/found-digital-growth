/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { VelaFaqList } from "../../vela-client";
import { velaServices } from "../../vela-data";
import { VelaFooter, VelaTestimonial } from "../../vela-shared";

const base = "/work/vela-studio/demo";

export const dynamicParams = false;
export function generateStaticParams() { return velaServices.map(({ slug }) => ({ slug })); }

export default async function VelaServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = velaServices.find(item => item.slug === slug);
  if (!service) notFound();
  const others = velaServices.filter(item => item.slug !== service.slug).slice(0, 5);
  return <main className="vela-inner-page vela-detail-page">
    <section className="vela-detail-hero">
      <div className="vela-detail-title" data-vela-reveal="words"><p className="vela-kicker">A ritual, considered around you</p><h1>{service.name}</h1><Link className="vela-outline-button" data-vela-booking href="#booking">Book your session <ArrowUpRight size={14} /></Link></div>
      <div className="vela-detail-price" data-vela-reveal="card"><strong>{service.price}</strong><span>{service.duration}</span></div>
      <div className="vela-detail-primary vela-image-reveal" data-vela-reveal="image"><img src={service.image} alt={`${service.name} at VELA Studio`} /></div>
      <div className="vela-detail-benefits" data-vela-reveal="card">{service.benefits.map(benefit => <p key={benefit}><span aria-hidden="true" />{benefit}</p>)}</div>
      <div className="vela-detail-copy" data-vela-reveal="words"><p className="vela-kicker">The treatment</p><h2>A quieter way to <em>return to yourself.</em></h2><p>{service.description}</p></div>
      <div className="vela-detail-faq" data-vela-reveal="card"><VelaFaqList items={service.faq} /></div>
      <div className="vela-detail-secondary vela-image-reveal" data-vela-reveal="image"><img src={service.secondaryImage} alt={`${service.name} treatment detail`} /></div>
    </section>

    <section className="vela-other-services">
      <div className="vela-section-head centered" data-vela-reveal="words"><p className="vela-kicker">Continue your journey</p><h2>Other <em>Treatments</em></h2></div>
      <div>{others.map(item => <Link href={`${base}/service/${item.slug}`} key={item.slug} data-vela-reveal="card"><img src={item.image} alt={item.name} /><h3>{item.name}</h3><small>{item.duration} · {item.price}</small></Link>)}</div>
    </section>
    <VelaTestimonial />
    <VelaFooter />
  </main>;
}
