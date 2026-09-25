/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { velaServices } from "../vela-data";
import { VelaFooter } from "../vela-shared";

const base = "/work/vela-studio/demo";

export default function VelaServicesPage() {
  return <main className="vela-inner-page">
    <section className="vela-services-page">
      <header data-vela-reveal="words"><p className="vela-kicker">The VELA treatment menu</p><h1>Our <em>Services</em></h1><p>Thoughtful rituals, modern techniques and time to feel fully looked after.</p></header>
      <div className="vela-services-grid">{velaServices.map((service, index) => <Link key={service.slug} href={`${base}/service/${service.slug}`} className="vela-service-card" data-vela-reveal="card" style={{ "--delay": `${(index % 3) * 90}ms` } as React.CSSProperties}>
        <div><img src={service.image} alt={service.name} /><span>0{index + 1}</span><i><ArrowUpRight /></i></div>
        <h2>{service.name}</h2><p>{service.summary}</p><small>{service.duration} · {service.price}</small>
      </Link>)}</div>
    </section>
    <VelaFooter />
  </main>;
}
