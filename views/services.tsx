import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { PageMotion } from "@/components/page-motion";
import { localizePath, type Locale } from "@/lib/i18n";
import { getCustomCapabilities, getServices } from "@/lib/localized-content";
import { pageMetadata } from "@/lib/seo";

const en = {
  metaTitle: "Web Design, SEO & Google Business Services Cyprus",
  metaDescription: "Website design and development, local SEO, Google Business Profile, analytics and Website Care for Cyprus businesses, with clear scope and starting prices.",
  eyebrow: "Services",
  titleLead: "More than",
  titleAccent: "a website.",
  lead: "We combine strategy, design, development and visibility so every page has a job to do.",
  core: "Website",
  orbit: { "conversion-design": "Conversion", "local-seo": "Local SEO", "google-business": "Google Business", analytics: "Analytics", "website-care": "Website Care", automation: "Automation" } as Record<string, string>,
  exploreService: "Explore service",
  exploreCapability: "Explore capability",
  customEyebrow: "Custom capabilities",
  customTitle: "More when the project needs it.",
  customIntro: "Some projects need extra functionality. We add the right systems, integrations and workflows around the core website when they genuinely help the business.",
  capabilities: [
    { slug: "e-commerce", title: "E-commerce", body: "Product, checkout and purchase journeys built around how the business sells." },
    { slug: "booking-systems", title: "Booking systems", body: "Simple booking flows that make appointments easier for customers and teams." },
    { slug: "crm-integrations", title: "CRM integrations", body: "Connect website leads and enquiries with the tools your business already uses." },
    { slug: "newsletter-integrations", title: "Newsletter integrations", body: "Connect sign-ups and forms with your email marketing platform." },
    { slug: "multilingual", title: "Multilingual websites", body: "Greek, English and other languages, each set up properly for search." },
    { slug: "custom-functionality", title: "Custom functionality", body: "Extra features and integrations scoped around the needs of the project." },
  ],
  cta: { eyebrow: "Where to start", title: "Not sure which service comes first?", body: "The audit shows which change will make the biggest difference right now." },
};

const el: typeof en = {
  metaTitle: "Κατασκευή Ιστοσελίδων & Υπηρεσίες SEO",
  metaDescription: "Ανακαλύψτε τις υπηρεσίες της VISION. για κατασκευή ιστοσελίδων, web development, SEO και ψηφιακή ανάπτυξη επιχειρήσεων στην Κύπρο.",
  eyebrow: "Υπηρεσίες",
  titleLead: "Κάτι περισσότερο",
  titleAccent: "από μια ιστοσελίδα.",
  lead: "Συνδυάζουμε στρατηγική, σχεδιασμό, ανάπτυξη και ορατότητα, ώστε κάθε σελίδα να έχει έναν ξεκάθαρο ρόλο.",
  core: "Ιστοσελίδα",
  orbit: { "conversion-design": "Μετατροπές", "local-seo": "Τοπικό SEO", "google-business": "Google Business", analytics: "Analytics", "website-care": "Website Care", automation: "Αυτοματισμοί" },
  exploreService: "Δείτε την υπηρεσία",
  exploreCapability: "Δείτε τη δυνατότητα",
  customEyebrow: "Εξειδικευμένες δυνατότητες",
  customTitle: "Περισσότερα, όταν το έργο τα χρειάζεται.",
  customIntro: "Κάποια έργα χρειάζονται επιπλέον λειτουργίες. Προσθέτουμε τα κατάλληλα συστήματα, διασυνδέσεις και ροές εργασίας γύρω από την ιστοσελίδα, όταν πραγματικά βοηθούν την επιχείρηση.",
  capabilities: [
    { slug: "e-commerce", title: "E-commerce", body: "Διαδρομές προϊόντων, checkout και αγοράς, χτισμένες γύρω από τον τρόπο που πουλά η επιχείρηση." },
    { slug: "booking-systems", title: "Συστήματα κρατήσεων", body: "Απλές ροές κρατήσεων που διευκολύνουν τα ραντεβού για τους πελάτες και την ομάδα σας." },
    { slug: "crm-integrations", title: "Διασύνδεση με CRM", body: "Συνδέστε τα αιτήματα από την ιστοσελίδα με τα εργαλεία που ήδη χρησιμοποιεί η επιχείρησή σας." },
    { slug: "newsletter-integrations", title: "Διασύνδεση newsletter", body: "Συνδέστε εγγραφές και φόρμες με την πλατφόρμα email marketing που χρησιμοποιείτε." },
    { slug: "multilingual", title: "Πολύγλωσσες ιστοσελίδες", body: "Ελληνικά, αγγλικά και άλλες γλώσσες, η καθεμία σωστά ρυθμισμένη για τις μηχανές αναζήτησης." },
    { slug: "custom-functionality", title: "Εξειδικευμένες λειτουργίες", body: "Επιπλέον λειτουργίες και διασυνδέσεις, σχεδιασμένες γύρω από τις ανάγκες του έργου." },
  ],
  cta: { eyebrow: "Από πού να ξεκινήσετε", title: "Δεν ξέρετε ποια υπηρεσία χρειάζεστε πρώτα;", body: "Η αξιολόγηση δείχνει ποια αλλαγή θα κάνει τη μεγαλύτερη διαφορά αυτή τη στιγμή." },
};

const copy = { en, el };

export function servicesMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/services", title: t.metaTitle, description: t.metaDescription });
}

const directoryOrder = ["web-design", "conversion-design", "local-seo", "google-business", "analytics", "website-care"];
const orbitOrder = ["conversion-design", "local-seo", "google-business", "analytics", "website-care", "automation"];

export function ServicesView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const path = (href: string) => localizePath(locale, href);
  const services = getServices(locale);
  const customCapabilities = getCustomCapabilities(locale);
  const orderedServices = directoryOrder.map((slug) => services.find((service) => service.slug === slug)!);
  const automationService = customCapabilities.find(({ slug }) => slug === "automation")!;
  const coreService = services.find((service) => service.slug === "web-design")!;
  // Six supporting services evenly spaced on a ring around the website (radius 38%).
  // A mask clears the ring, comet and spokes around every icon and its label so no line ever touches text.
  const orbitNodes = orbitOrder.map((slug, index) => {
    const angle = (-90 + index * 60) * (Math.PI / 180);
    const Icon = (services.find((service) => service.slug === slug) ?? customCapabilities.find((item) => item.slug === slug))!.icon;
    return { slug, label: t.orbit[slug], Icon, x: +(50 + 38 * Math.cos(angle)).toFixed(2), y: +(50 + 38 * Math.sin(angle)).toFixed(2) };
  });

  return (
    <main className="motion-page services-motion-page"><PageMotion />
      <section className="lit-hero services-lit-hero"><div className="site-container lit-hero-grid">
        <div><p className="eyebrow">{t.eyebrow}</p><h1>{t.titleLead} <em>{t.titleAccent}</em></h1><p className="lit-hero-lead">{t.lead}</p></div>
        <div className="service-orbit">
          <svg className="service-orbit-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs><mask id="service-orbit-clear" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120"><rect x="-10" y="-10" width="120" height="120" fill="#fff" /><rect x="36" y="36" width="28" height="35" rx="5" fill="#000" />{orbitNodes.map(({ slug, x, y }) => <rect key={slug} x={x - 11} y={y - 9} width="22" height="28" rx="5" fill="#000" />)}</mask></defs>
            <g mask="url(#service-orbit-clear)"><circle cx="50" cy="50" r="38" /><circle className="service-orbit-comet" cx="50" cy="50" r="38" pathLength="100" />{orbitNodes.map(({ slug, x, y }) => <line key={slug} x1="50" y1="50" x2={x} y2={y} />)}</g>
          </svg>
          <Link href={path(`/services/${coreService.slug}`)} className="service-orbit-core"><i><coreService.icon aria-hidden="true" /></i><span>{t.core}</span></Link>
          {orbitNodes.map(({ slug, label, Icon, x, y }) => <Link key={slug} href={path(`/services/${slug}`)} className="service-orbit-node" style={{ left: `${x}%`, top: `${y}%` }}><i><Icon aria-hidden="true" /></i><span>{label}</span></Link>)}
        </div>
      </div></section>
      <section className="directory-section"><div className="site-container service-directory">
        {orderedServices.map((service, index) => { const Icon = service.icon; return (
          <Link href={path(`/services/${service.slug}`)} key={service.slug} className="directory-card" data-motion="rise">
            <div><span>0{index + 1}</span><Icon /></div><h2>{service.title}</h2><p>{service.short}</p><strong>{t.exploreService} <ArrowUpRight /></strong>
          </Link>
        ); })}
        <Link href={path(`/services/${automationService.slug}`)} className="directory-card directory-card-wide" data-motion="rise">
          <div><automationService.icon /></div><h2>{automationService.title}</h2><p>{automationService.short}</p><strong>{t.exploreCapability} <ArrowUpRight /></strong>
        </Link>
      </div></section>
      <section className="custom-capabilities section-pad"><div className="site-container"><p className="eyebrow">{t.customEyebrow}</p><h2 data-motion="rise">{t.customTitle}</h2><p className="custom-capabilities-intro" data-motion="rise">{t.customIntro}</p><div className="custom-capability-list">{t.capabilities.map((capability, index) => <div data-motion="rise" key={capability.slug}><span>0{index + 1}</span><strong>{capability.title}</strong><small>{capability.body}</small></div>)}</div></div></section>
      <CTASection locale={locale} eyebrow={t.cta.eyebrow} title={t.cta.title} body={t.cta.body} />
    </main>
  );
}
