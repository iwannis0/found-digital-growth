import { CalendarClock, PencilLine, Receipt } from "lucide-react";
import { Pricing, type PricingPlan } from "@/components/blocks/pricing";
import { FAQList } from "@/components/faq-list";
import { PageTracker } from "@/components/analytics";
import { PageMotion } from "@/components/page-motion";
import { getDictionary } from "@/lib/dictionaries";
import { getFaqs } from "@/lib/faqs-el";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// Package names stay in English in both languages: they are the product names, and the
// same values travel to the contact form, the lead record and the package_click event.
const enPlans: PricingPlan[] = [
  { name: "Professional Website Foundation", short: "Foundation", setup: "€599", monthly: "€49", best: "Small businesses that need a professional, credible online presence.", minutes: "15 minutes", popular: false,
    items: ["Up to 4 pages", "1 design revision round", "Responsive, mobile-first design", "Contact form", "Google Maps", "WhatsApp / click-to-call", "SEO foundations: titles, sitemap and structured data", "Google Analytics setup", "Launch on your domain with SSL"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates"] },
  { name: "Custom Growth Website", short: "Growth", setup: "€899", monthly: "€69", best: "Businesses that want a stronger website built around visibility, enquiries and bookings.", minutes: "30 minutes", popular: true,
    items: ["5 to 7 pages", "2 design revision rounds", "Custom design direction", "Conversion-focused page structure", "Content refinement", "Google Business Profile setup & optimisation", "Local SEO foundations", "Analytics, Search Console & conversion tracking", "Enquiry or booking form", "WhatsApp and click-to-call", "Speed optimisation"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates", "Monthly analytics check"] },
  { name: "Advanced Digital Presence", short: "Advanced", setup: "€1,399", monthly: "€119", best: "Businesses that need a larger website with more functionality, a stronger conversion structure and priority care.", minutes: "60 minutes", popular: false,
    items: ["8 to 10 pages", "3 design revision rounds", "Tailored design direction", "Advanced conversion-focused structure", "Refined interactions and animations", "Editable content / blog (CMS) or booking system integration", "Multilingual-ready structure", "Enhanced Local SEO foundations", "Analytics, Search Console & conversion tracking"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates", "Priority support: reply within one working day", "Quarterly technical & SEO health check"] },
];

const elPlans: PricingPlan[] = [
  { name: "Professional Website Foundation", short: "Foundation", setup: "599 €", monthly: "49 €", best: "Μικρές επιχειρήσεις που χρειάζονται μια επαγγελματική, αξιόπιστη online παρουσία.", minutes: "15 λεπτά", popular: false,
    items: ["Έως 4 σελίδες", "1 γύρος αλλαγών στον σχεδιασμό", "Responsive σχεδιασμός, με προτεραιότητα στο κινητό", "Φόρμα επικοινωνίας", "Google Maps", "WhatsApp / κλήση με ένα πάτημα", "Βάσεις SEO: τίτλοι, sitemap και δομημένα δεδομένα", "Ρύθμιση Google Analytics", "Δημοσίευση στο domain σας με SSL"],
    care: ["Hosting, SSL και αντίγραφα ασφαλείας", "Παρακολούθηση διαθεσιμότητας και ασφάλειας", "Τεχνικές ενημερώσεις"] },
  { name: "Custom Growth Website", short: "Growth", setup: "899 €", monthly: "69 €", best: "Επιχειρήσεις που θέλουν μια πιο δυνατή ιστοσελίδα, χτισμένη γύρω από την ορατότητα, τα αιτήματα και τις κρατήσεις.", minutes: "30 λεπτά", popular: true,
    items: ["5 έως 7 σελίδες", "2 γύροι αλλαγών στον σχεδιασμό", "Εξατομικευμένη σχεδιαστική κατεύθυνση", "Δομή σελίδων με στόχο τις μετατροπές", "Βελτίωση κειμένων", "Δημιουργία & βελτιστοποίηση Google Business Profile", "Βάσεις τοπικού SEO", "Analytics, Search Console & μέτρηση μετατροπών", "Φόρμα αιτήματος ή κράτησης", "WhatsApp και κλήση με ένα πάτημα", "Βελτιστοποίηση ταχύτητας"],
    care: ["Hosting, SSL και αντίγραφα ασφαλείας", "Παρακολούθηση διαθεσιμότητας και ασφάλειας", "Τεχνικές ενημερώσεις", "Μηνιαίος έλεγχος analytics"] },
  { name: "Advanced Digital Presence", short: "Advanced", setup: "1.399 €", monthly: "119 €", best: "Επιχειρήσεις που χρειάζονται μεγαλύτερη ιστοσελίδα, με περισσότερες λειτουργίες, πιο δυνατή δομή μετατροπών και προτεραιότητα στην υποστήριξη.", minutes: "60 λεπτά", popular: false,
    items: ["8 έως 10 σελίδες", "3 γύροι αλλαγών στον σχεδιασμό", "Σχεδιαστική κατεύθυνση στα μέτρα σας", "Προηγμένη δομή με στόχο τις μετατροπές", "Προσεγμένες αλληλεπιδράσεις και animations", "Επεξεργάσιμο περιεχόμενο / blog (CMS) ή σύνδεση συστήματος κρατήσεων", "Δομή έτοιμη για πολλές γλώσσες", "Ενισχυμένες βάσεις τοπικού SEO", "Analytics, Search Console & μέτρηση μετατροπών"],
    care: ["Hosting, SSL και αντίγραφα ασφαλείας", "Παρακολούθηση διαθεσιμότητας και ασφάλειας", "Τεχνικές ενημερώσεις", "Προτεραιότητα στην υποστήριξη: απάντηση μέσα σε μία εργάσιμη ημέρα", "Τριμηνιαίος τεχνικός έλεγχος και έλεγχος SEO"] },
];

const en = {
  metaTitle: "Website Design Pricing Cyprus",
  metaDescription: "Website design packages for Cyprus businesses from €599 setup, with optional Website Care from €49 a month. See exactly what each package includes.",
  plans: enPlans,
  addons: [["Additional page", "Quote"], ["Extra language setup (translation separate)", "€150 to €300+"], ["Advanced third party booking workflow", "€150 to €400+"], ["E-commerce", "Quote"], ["Domain and DNS setup", "Quote"], ["Business email setup", "Quote"], ["Ongoing Local SEO and Google Business", "Quote"], ["Google Ads setup & conversion tracking", "Quote"], ["Lead & booking automation", "Quote"], ["Custom AI integrations", "On request"], ["CRM integration", "Quote"], ["Newsletter integration", "Quote"], ["Monthly analytics reporting", "Quote"], ["Photography & video (through a partner)", "Quote"], ["Website migration after technical review", "Quote"]] as [string, string][],
  eyebrow: "Transparent pricing",
  titleLead: "Start with the",
  titleAccent: "right foundation.",
  lead: "Clear starting prices, defined scope and flexible support for businesses at different stages of growth.",
  summary: { head: "Pricing at a glance", setup: "Setup", care: "Care / month", popular: "Most popular", deposit: "deposit to begin", beforeLaunch: "before launch", optional: "Website Care is optional" },
  scopeNote: "Prices are starting points. Final scope, content, integrations and timeline are agreed before work begins.",
  policy: {
    eyebrow: "Website Care policy",
    title: "Small updates, handled.",
    body: "Website Care is available after launch for businesses that want ongoing hosting, backups, monitoring, technical support and minor content updates.",
    includedTitle: "Included minor updates",
    includedBody: "Included minor updates can cover text changes, image replacements, contact details, opening hours and small content adjustments.",
    quotedTitle: "Quoted separately",
    quotedBody: "New pages, custom functionality, integrations, redesign work, large content uploads and other work outside the agreed package are quoted separately.",
    rollover: "Unused maintenance time does not roll over.",
    term: "Website Care has an initial 3-month minimum term. After that, it continues month-to-month and can be cancelled with 30 days’ notice.",
  },
  addonsEyebrow: "Optional growth services",
  addonsTitle: "Build around what the business actually needs.",
  faqEyebrow: "Questions before you choose",
  faqTitle: "What business owners usually want to know.",
};

const el: typeof en = {
  metaTitle: "Πακέτα & Τιμές Κατασκευής Ιστοσελίδων",
  metaDescription: "Πακέτα κατασκευής ιστοσελίδων για επιχειρήσεις στην Κύπρο από 599 €, με προαιρετικό Website Care από 49 € τον μήνα. Δείτε τι ακριβώς περιλαμβάνει κάθε πακέτο.",
  plans: elPlans,
  addons: [["Επιπλέον σελίδα", "Με προσφορά"], ["Ρύθμιση επιπλέον γλώσσας (η μετάφραση χρεώνεται ξεχωριστά)", "150 € έως 300 €+"], ["Προηγμένη ροή κρατήσεων μέσω τρίτης πλατφόρμας", "150 € έως 400 €+"], ["E-commerce", "Με προσφορά"], ["Ρύθμιση domain και DNS", "Με προσφορά"], ["Ρύθμιση εταιρικού email", "Με προσφορά"], ["Συνεχές τοπικό SEO και Google Business", "Με προσφορά"], ["Ρύθμιση Google Ads & μέτρηση μετατροπών", "Με προσφορά"], ["Αυτοματοποίηση αιτημάτων & κρατήσεων", "Με προσφορά"], ["Εξειδικευμένες διασυνδέσεις AI", "Κατόπιν αιτήματος"], ["Διασύνδεση με CRM", "Με προσφορά"], ["Διασύνδεση newsletter", "Με προσφορά"], ["Μηνιαίες αναφορές analytics", "Με προσφορά"], ["Φωτογράφιση & βίντεο (μέσω συνεργάτη)", "Με προσφορά"], ["Μεταφορά ιστοσελίδας μετά από τεχνικό έλεγχο", "Με προσφορά"]],
  eyebrow: "Διαφανείς τιμές",
  titleLead: "Ξεκινήστε με",
  titleAccent: "τη σωστή βάση.",
  lead: "Ξεκάθαρες τιμές εκκίνησης, καθορισμένο εύρος εργασιών και ευέλικτη υποστήριξη για επιχειρήσεις σε κάθε στάδιο ανάπτυξης.",
  summary: { head: "Οι τιμές με μια ματιά", setup: "Κατασκευή", care: "Care / μήνα", popular: "Το πιο δημοφιλές", deposit: "προκαταβολή για να ξεκινήσουμε", beforeLaunch: "πριν από το λανσάρισμα", optional: "Το Website Care είναι προαιρετικό" },
  scopeNote: "Οι τιμές είναι τιμές εκκίνησης. Το τελικό εύρος, το περιεχόμενο, οι διασυνδέσεις και το χρονοδιάγραμμα συμφωνούνται πριν ξεκινήσει η δουλειά.",
  policy: {
    eyebrow: "Πολιτική Website Care",
    title: "Οι μικρές αλλαγές, στα χέρια μας.",
    body: "Το Website Care είναι διαθέσιμο μετά το λανσάρισμα για επιχειρήσεις που θέλουν συνεχές hosting, αντίγραφα ασφαλείας, παρακολούθηση, τεχνική υποστήριξη και μικρές αλλαγές περιεχομένου.",
    includedTitle: "Μικρές αλλαγές που περιλαμβάνονται",
    includedBody: "Οι μικρές αλλαγές που περιλαμβάνονται μπορούν να καλύψουν αλλαγές κειμένων, αντικατάσταση εικόνων, στοιχεία επικοινωνίας, ωράριο και μικρές προσαρμογές περιεχομένου.",
    quotedTitle: "Κοστολογούνται ξεχωριστά",
    quotedBody: "Νέες σελίδες, εξειδικευμένες λειτουργίες, διασυνδέσεις, επανασχεδιασμός, μεγάλες μεταφορτώσεις περιεχομένου και άλλες εργασίες εκτός του συμφωνημένου πακέτου κοστολογούνται ξεχωριστά.",
    rollover: "Ο χρόνος συντήρησης που δεν χρησιμοποιείται δεν μεταφέρεται στον επόμενο μήνα.",
    term: "Το Website Care έχει αρχική ελάχιστη διάρκεια 3 μηνών. Στη συνέχεια ανανεώνεται ανά μήνα και μπορεί να διακοπεί με ειδοποίηση 30 ημερών.",
  },
  addonsEyebrow: "Προαιρετικές υπηρεσίες ανάπτυξης",
  addonsTitle: "Χτίστε γύρω από ό,τι πραγματικά χρειάζεται η επιχείρηση.",
  faqEyebrow: "Ερωτήσεις πριν επιλέξετε",
  faqTitle: "Όσα συνήθως θέλουν να μάθουν οι επιχειρηματίες.",
};

const copy = { en, el };

export function pricingMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/pricing", title: t.metaTitle, description: t.metaDescription });
}

export function PricingView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <main className="motion-page pricing-motion-page"><PageMotion /><PageTracker event="pricing_view" />
    <section className="lit-hero pricing-lit-hero"><div className="site-container lit-hero-grid">
      <div><p className="eyebrow">{t.eyebrow}</p><h1>{t.titleLead} <em>{t.titleAccent}</em></h1><p className="lit-hero-lead">{t.lead}</p></div>
      <div className="price-summary">
        <div className="price-summary-head"><span>{t.summary.head}</span><span>{t.summary.setup}</span><span>{t.summary.care}</span></div>
        {t.plans.map((plan) => <div className={`price-summary-row${plan.popular ? " is-popular" : ""}`} key={plan.name}><span>{plan.name}{plan.popular && <em>{t.summary.popular}</em>}</span><strong>{plan.setup}</strong><small>{plan.monthly}</small></div>)}
        <div className="price-summary-foot"><span><b>50%</b> {t.summary.deposit}</span><span><b>50%</b> {t.summary.beforeLaunch}</span><span>{t.summary.optional}</span></div>
      </div>
    </div></section>
    <section className="pricing-section section-pad"><div className="site-container"><Pricing plans={t.plans} copy={getDictionary(locale).pricing} /><p className="pricing-scope-note">{t.scopeNote}</p></div></section>
    <section className="maintenance-policy"><div className="site-container policy-grid"><div data-motion="rise"><p className="eyebrow">{t.policy.eyebrow}</p><h2>{t.policy.title}</h2><p>{t.policy.body}</p></div><div className="policy-item" data-motion="rise"><i aria-hidden="true"><PencilLine /></i><h3>{t.policy.includedTitle}</h3><p>{t.policy.includedBody}</p></div><div className="policy-item" data-motion="rise"><i aria-hidden="true"><Receipt /></i><h3>{t.policy.quotedTitle}</h3><p>{t.policy.quotedBody}</p></div><div className="policy-note" data-motion="rise"><i aria-hidden="true"><CalendarClock /></i><div><p>{t.policy.rollover}</p><p>{t.policy.term}</p></div></div></div></section>
    <section className="addons-section section-pad"><div className="site-container"><div data-motion="rise"><p className="eyebrow">{t.addonsEyebrow}</p><h2>{t.addonsTitle}</h2></div><div className="addons-list">{t.addons.map(([name, price]) => <div key={name} data-motion="rise"><span>{name}</span><strong>{price}</strong></div>)}</div></div></section>
    <section className="pricing-faq section-pad"><div className="site-container faq-grid"><div data-motion="rise"><p className="eyebrow">{t.faqEyebrow}</p><h2>{t.faqTitle}</h2></div><FAQList list={getFaqs(locale)} limit={8} /></div></section>
  </main>;
}
