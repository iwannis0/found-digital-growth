import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, FileText, House, MessageSquareText, Phone, ShoppingBag, Target, UtensilsCrossed } from "lucide-react";
import { PageMotion } from "@/components/page-motion";
import { ProjectCover } from "@/components/project-cover";
import { localizePath, type Locale } from "@/lib/i18n";
import { getDeployedProjects, getProjects } from "@/lib/localized-content";
import { pageMetadata } from "@/lib/seo";

const en = {
  metaTitle: "Web Design Portfolio Cyprus",
  metaDescription: "Live websites and design concepts by VISION.: e-commerce, retail, dental, real estate and beauty sites, each built around how the business wins customers.",
  eyebrow: "Our work",
  titleLead: "Different businesses.",
  titleAccent: "Different websites.",
  lead: "Selected websites and digital concepts, each shaped around a different business, audience and objective.",
  liveEyebrow: "Live projects",
  liveLead: "Finished builds,",
  liveAccent: "live in production.",
  liveAlt: "{name} live website",
  visit: "Visit live site",
  conceptEyebrow: "Concept projects",
  conceptLead: "Three examples",
  conceptAccent: "of our approach.",
  conceptAlt: "{name} concept website cover",
  conceptBadge: "Concept Project",
  typesEyebrow: "Built around your business",
  typesLead: "What does your business",
  typesAccent: "need its website to do?",
  businessTypes: [
    ["Food & Hospitality", "Restaurants, cafés, bakeries, hotels, villas and event venues."],
    ["Beauty & Wellness", "Barbers, salons, nail studios, clinics, gyms, personal trainers and wellness businesses."],
    ["Retail & E-commerce", "Jewellery, fashion, pet shops, furniture, florists and specialty stores."],
    ["Professional Services", "Lawyers, accountants, consultants, financial firms and other professional practices."],
    ["Property & Places", "Real estate agencies, developers, architects, interior studios and construction companies."],
    ["Home & Local Services", "Renovations, kitchens, solar, cleaning, car detailing, trades and service businesses."],
    ["Fitness & Training", "Gyms, personal trainers, sports academies, studios and coaches."],
    ["Education & Training", "Schools, tutors, language centres, academies and training providers."],
    ["Automotive", "Car detailing, garages, rentals, dealerships and automotive services."],
    ["B2B & Corporate", "Technology companies, agencies, suppliers, manufacturers and B2B service companies."],
  ] as [string, string][],
  journeysEyebrow: "Built around the action",
  journeysLead: "The right website depends",
  journeysAccent: "on what needs to happen next.",
  journeys: ["Bookings", "Enquiries", "Calls & WhatsApp", "E-commerce", "Reservations", "Quote requests", "Property enquiries", "Lead generation"],
};

const el: typeof en = {
  metaTitle: "Portfolio Κατασκευής Ιστοσελίδων στην Κύπρο",
  metaDescription: "Ιστοσελίδες σε λειτουργία και concept έργα της VISION.: e-commerce, λιανική, οδοντιατρείο, ακίνητα και ομορφιά, το καθένα χτισμένο γύρω από τον τρόπο που η επιχείρηση κερδίζει πελάτες.",
  eyebrow: "Η δουλειά μας",
  titleLead: "Διαφορετικές επιχειρήσεις.",
  titleAccent: "Διαφορετικές ιστοσελίδες.",
  lead: "Επιλεγμένες ιστοσελίδες και ψηφιακά concepts, το καθένα σχεδιασμένο γύρω από μια διαφορετική επιχείρηση, κοινό και στόχο.",
  liveEyebrow: "Έργα σε λειτουργία",
  liveLead: "Ολοκληρωμένες ιστοσελίδες,",
  liveAccent: "σε πλήρη λειτουργία.",
  liveAlt: "Η ιστοσελίδα {name} σε λειτουργία",
  visit: "Δείτε την ιστοσελίδα",
  conceptEyebrow: "Concept έργα",
  conceptLead: "Τρία παραδείγματα",
  conceptAccent: "της προσέγγισής μας.",
  conceptAlt: "Εξώφυλλο concept ιστοσελίδας {name}",
  conceptBadge: "Concept έργο",
  typesEyebrow: "Γύρω από την επιχείρησή σας",
  typesLead: "Τι χρειάζεται η επιχείρησή σας",
  typesAccent: "να κάνει η ιστοσελίδα της;",
  businessTypes: [
    ["Εστίαση & Φιλοξενία", "Εστιατόρια, καφετέριες, αρτοποιεία, ξενοδοχεία, βίλες και χώροι εκδηλώσεων."],
    ["Ομορφιά & Ευεξία", "Κουρεία, κομμωτήρια, studio νυχιών, κλινικές, γυμναστήρια, personal trainers και επιχειρήσεις ευεξίας."],
    ["Λιανική & E-commerce", "Κοσμήματα, ρούχα, pet shops, έπιπλα, ανθοπωλεία και εξειδικευμένα καταστήματα."],
    ["Επαγγελματικές Υπηρεσίες", "Δικηγόροι, λογιστές, σύμβουλοι, χρηματοοικονομικές εταιρείες και άλλα επαγγελματικά γραφεία."],
    ["Ακίνητα & Χώροι", "Κτηματομεσιτικά γραφεία, developers, αρχιτέκτονες, studio εσωτερικής διακόσμησης και κατασκευαστικές εταιρείες."],
    ["Σπίτι & Τοπικές Υπηρεσίες", "Ανακαινίσεις, κουζίνες, φωτοβολταϊκά, καθαρισμός, car detailing, τεχνίτες και επιχειρήσεις υπηρεσιών."],
    ["Γυμναστική & Προπόνηση", "Γυμναστήρια, personal trainers, αθλητικές ακαδημίες, studio και προπονητές."],
    ["Εκπαίδευση & Κατάρτιση", "Σχολεία, ιδιαίτερα μαθήματα, κέντρα ξένων γλωσσών, ακαδημίες και φορείς κατάρτισης."],
    ["Αυτοκίνητο", "Car detailing, συνεργεία, ενοικιάσεις, αντιπροσωπείες και υπηρεσίες αυτοκινήτου."],
    ["B2B & Εταιρείες", "Εταιρείες τεχνολογίας, agencies, προμηθευτές, βιομηχανίες και εταιρείες B2B υπηρεσιών."],
  ],
  journeysEyebrow: "Γύρω από την ενέργεια",
  journeysLead: "Η σωστή ιστοσελίδα εξαρτάται",
  journeysAccent: "από το τι πρέπει να γίνει μετά.",
  journeys: ["Κρατήσεις", "Αιτήματα", "Κλήσεις & WhatsApp", "E-commerce", "Κρατήσεις τραπεζιού", "Αιτήματα προσφοράς", "Αιτήματα για ακίνητα", "Νέοι πελάτες"],
};

const copy = { en, el };
const journeyIcons = [CalendarCheck, MessageSquareText, Phone, ShoppingBag, UtensilsCrossed, FileText, House, Target] as const;

export function workMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/work", title: t.metaTitle, description: t.metaDescription, image: "/images/social/og-work.jpg" });
}

export function WorkView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const projects = getProjects(locale);
  const deployedProjects = getDeployedProjects(locale);
  const auraImage = projects.find((project) => project.slug === "aura-dental")?.image ?? "";
  const novaImage = projects.find((project) => project.slug === "nova-estates")?.image ?? "";
  const velaImage = projects.find((project) => project.slug === "vela-studio")?.image ?? "";
  // Back-to-front order so the live store sits in front of the stack.
  const heroFrames = [
    ["nova", novaImage, "nova-estates"],
    ["discount", deployedProjects[1].image],
    ["aura", auraImage, "aura-dental"],
    ["vela", velaImage],
    ["front", deployedProjects[0].image],
  ] as const;

  return <main className="motion-page work-motion-page">
    <PageMotion />
    <section className="lit-hero"><div className="site-container lit-hero-grid">
      <div className="work-hero-copy"><p className="eyebrow">{t.eyebrow}</p><h1>{t.titleLead} <em>{t.titleAccent}</em></h1><p className="lit-hero-lead">{t.lead}</p></div>
      <div className="work-hero-stage" aria-hidden="true">
        {heroFrames.map(([key, src, coverSlug]) => <div className={`work-hero-frame work-hero-frame-${key}`} key={key}><b><i /><i /><i /></b><div><Image src={src} alt="" fill sizes="(max-width: 900px) 70vw, 40vw" quality={key === "nova" ? 90 : 75} unoptimized={key === "nova"} priority={key === "front"} />{coverSlug && <ProjectCover slug={coverSlug} />}</div></div>)}
      </div>
    </div></section>

    <section className="work-showcase section-pad"><div className="site-container">
      <div className="work-group-head" data-motion="rise"><p className="eyebrow">{t.liveEyebrow}</p><h2>{t.liveLead} <em>{t.liveAccent}</em></h2></div>
      <div className="deployed-grid">{deployedProjects.map((project) => <a href={project.url} target="_blank" rel="noopener noreferrer" className="deployed-card" key={project.slug} data-motion="rise"><div className="deployed-card-image" data-motion-parallax><Image src={project.image} alt={t.liveAlt.replace("{name}", project.name)} fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="deployed-card-meta"><div><small>{project.industry}</small><h3>{project.name}</h3></div><span className="deployed-card-visit">{t.visit} <ArrowUpRight aria-hidden="true" /></span></div></a>)}</div>

      <div className="work-group-head work-group-head-concepts" data-motion="rise"><p className="eyebrow">{t.conceptEyebrow}</p><h2>{t.conceptLead} <em>{t.conceptAccent}</em></h2></div>
      <div className="concept-grid">{projects.map((project, index) => <Link href={localizePath(locale, `/work/${project.slug}`)} className="concept-preview" key={project.slug} data-motion="rise"><div className="concept-preview-image" data-motion-parallax><Image src={project.image} alt={t.conceptAlt.replace("{name}", project.name)} fill sizes="(max-width: 700px) 100vw, 50vw" quality={project.slug === "nova-estates" ? 90 : 75} unoptimized={project.slug === "nova-estates"} /><ProjectCover slug={project.slug} fallback={<span>{t.conceptBadge}</span>} /></div><div className="concept-preview-meta"><div><small>0{index + 1} / {project.industry}</small><h3>{project.name}</h3></div><ArrowUpRight aria-hidden="true" /></div></Link>)}</div>
    </div></section>

    <section className="business-types-section section-pad"><div className="site-container">
      <div className="work-group-head" data-motion="rise"><p className="eyebrow">{t.typesEyebrow}</p><h2>{t.typesLead} <em>{t.typesAccent}</em></h2></div>
      <div className="business-type-grid">{t.businessTypes.map(([title, examples], index) => <article key={title} data-motion="rise"><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{examples}</p></article>)}</div>
    </div></section>

    <section className="journeys-section section-pad"><div className="site-container">
      <div className="work-group-head" data-motion="rise"><p className="eyebrow">{t.journeysEyebrow}</p><h2>{t.journeysLead} <em>{t.journeysAccent}</em></h2></div>
      <div className="journey-grid">{t.journeys.map((title, index) => { const Icon = journeyIcons[index]; return <div key={title} data-motion="rise"><i aria-hidden="true"><Icon /></i><h3>{title}</h3></div>; })}</div>
    </div></section>
  </main>;
}
