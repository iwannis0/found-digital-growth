import Link from "next/link";
import { ArrowRight, CalendarCheck, CalendarClock, ChefHat, LayoutDashboard, PencilLine, Receipt, ShoppingBag, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Pricing, type PricingPlan } from "@/components/blocks/pricing";
import { localizePath } from "@/lib/i18n";
import { blackFriday, priced, savingLabel } from "@/lib/offers";
import { OfferCountdown } from "@/components/offer-countdown";
import { siteConfig } from "@/lib/site-config";
import { FAQList } from "@/components/faq-list";
import { PageTracker } from "@/components/analytics";
import { PageMotion } from "@/components/page-motion";
import { getDictionary } from "@/lib/dictionaries";
import { getFaqs } from "@/lib/faqs-el";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// Package names stay in English in both languages: they are the product names, and the
// same values travel to the contact form, the lead record and the package_click event.
// Solution names stay in English for the same reason: they travel to the contact form as the package.
type Solution = { name: string; icon: keyof typeof solutionIcons; title: string; body: string; price: string; sale?: string; unit: string; note: string; saleNote?: string };
type MonthlyPlan = { name: string; price: string; sale?: string; unit: string; body: string; from?: boolean; featured?: boolean };
type Industry = { title: string; body: string; price: string; sale?: string; href: string; cta: string };

const solutionIcons = { booking: CalendarCheck, shop: ShoppingBag, restaurant: UtensilsCrossed, ordering: ChefHat, app: LayoutDashboard } satisfies Record<string, LucideIcon>;

const toNumber = (price: string) => price.replace(/[^\d]/g, "");

const enPlans: PricingPlan[] = [
  { name: "Professional Website Foundation", short: "Foundation", setup: "€699", sale: "€599", monthly: "€49", monthlySale: "€29", best: "Small businesses that need a professional, credible online presence.", minutes: "15 minutes", popular: false,
    items: ["Up to 4 pages", "1 design revision round", "Responsive, mobile-first design", "Contact form", "Google Maps", "WhatsApp / click-to-call", "SEO foundations: titles, sitemap and structured data", "Google Analytics setup", "Launch on your domain with SSL"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates"] },
  { name: "Custom Growth Website", short: "Growth", setup: "€899", sale: "€699", monthly: "€69", monthlySale: "€49", best: "Businesses that want a stronger website built around visibility, enquiries and bookings.", minutes: "30 minutes", popular: true,
    items: ["5 to 7 pages", "2 design revision rounds", "Custom design direction", "Conversion-focused page structure", "Content refinement", "Google Business Profile setup & optimisation", "Local SEO foundations", "Analytics, Search Console & conversion tracking", "Enquiry or booking form", "WhatsApp and click-to-call", "Speed optimisation"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates", "Monthly analytics check"] },
  { name: "Advanced Digital Presence", short: "Advanced", setup: "€1,099", sale: "€899", monthly: "€119", monthlySale: "€89", best: "Businesses that need a larger website with more functionality, a stronger conversion structure and priority care.", minutes: "60 minutes", popular: false,
    items: ["8 to 10 pages", "3 design revision rounds", "Tailored design direction", "Advanced conversion-focused structure", "Refined interactions and animations", "Editable content / blog (CMS) or booking system integration", "Multilingual-ready structure", "Enhanced Local SEO foundations", "Analytics, Search Console & conversion tracking"],
    care: ["Hosting, SSL and backups", "Uptime and security monitoring", "Technical updates", "Priority support: reply within one working day", "Quarterly technical & SEO health check"] },
];

const elPlans: PricingPlan[] = [
  { name: "Professional Website Foundation", short: "Foundation", setup: "699 €", sale: "599 €", monthly: "49 €", monthlySale: "29 €", best: "Μικρές επιχειρήσεις που χρειάζονται μια επαγγελματική, αξιόπιστη online παρουσία.", minutes: "15 λεπτά", popular: false,
    items: ["Έως 4 σελίδες", "1 γύρος αλλαγών στον σχεδιασμό", "Responsive σχεδιασμός, με προτεραιότητα στο κινητό", "Φόρμα επικοινωνίας", "Google Maps", "WhatsApp / κλήση με ένα πάτημα", "Βάσεις SEO: τίτλοι, sitemap και δομημένα δεδομένα", "Ρύθμιση Google Analytics", "Δημοσίευση στο domain σας με SSL"],
    care: ["Hosting, SSL και αντίγραφα ασφαλείας", "Παρακολούθηση διαθεσιμότητας και ασφάλειας", "Τεχνικές ενημερώσεις"] },
  { name: "Custom Growth Website", short: "Growth", setup: "899 €", sale: "699 €", monthly: "69 €", monthlySale: "49 €", best: "Επιχειρήσεις που θέλουν μια πιο δυνατή ιστοσελίδα, χτισμένη γύρω από την ορατότητα, τα αιτήματα και τις κρατήσεις.", minutes: "30 λεπτά", popular: true,
    items: ["5 έως 7 σελίδες", "2 γύροι αλλαγών στον σχεδιασμό", "Εξατομικευμένη σχεδιαστική κατεύθυνση", "Δομή σελίδων με στόχο τις μετατροπές", "Βελτίωση κειμένων", "Δημιουργία & βελτιστοποίηση Google Business Profile", "Βάσεις τοπικού SEO", "Analytics, Search Console & μέτρηση μετατροπών", "Φόρμα αιτήματος ή κράτησης", "WhatsApp και κλήση με ένα πάτημα", "Βελτιστοποίηση ταχύτητας"],
    care: ["Hosting, SSL και αντίγραφα ασφαλείας", "Παρακολούθηση διαθεσιμότητας και ασφάλειας", "Τεχνικές ενημερώσεις", "Μηνιαίος έλεγχος analytics"] },
  { name: "Advanced Digital Presence", short: "Advanced", setup: "1.099 €", sale: "899 €", monthly: "119 €", monthlySale: "89 €", best: "Επιχειρήσεις που χρειάζονται μεγαλύτερη ιστοσελίδα, με περισσότερες λειτουργίες, πιο δυνατή δομή μετατροπών και προτεραιότητα στην υποστήριξη.", minutes: "60 λεπτά", popular: false,
    items: ["8 έως 10 σελίδες", "3 γύροι αλλαγών στον σχεδιασμό", "Σχεδιαστική κατεύθυνση στα μέτρα σας", "Προηγμένη δομή με στόχο τις μετατροπές", "Προσεγμένες αλληλεπιδράσεις και animations", "Επεξεργάσιμο περιεχόμενο / blog (CMS) ή σύνδεση συστήματος κρατήσεων", "Δομή έτοιμη για πολλές γλώσσες", "Ενισχυμένες βάσεις τοπικού SEO", "Analytics, Search Console & μέτρηση μετατροπών"],
    care: ["Hosting, SSL και αντίγραφα ασφαλείας", "Παρακολούθηση διαθεσιμότητας και ασφάλειας", "Τεχνικές ενημερώσεις", "Προτεραιότητα στην υποστήριξη: απάντηση μέσα σε μία εργάσιμη ημέρα", "Τριμηνιαίος τεχνικός έλεγχος και έλεγχος SEO"] },
];

const en = {
  metaTitle: "Website Design Pricing Cyprus",
  metaDescription: "Website packages for Cyprus businesses from {website}, online booking from {booking}, e-shops from {shop} and hosting from €19 a month. See exactly what each includes.",
  plans: enPlans,
  solutions: [
    { name: "Online Booking System", icon: "booking", title: "Online bookings", body: "Live availability, email confirmations and reminders, and a calendar you manage yourself. SMS reminders are optional, charged at cost.", price: "€790", sale: "€690", unit: "", note: "or +€390 added to any website package", saleNote: "or +€290 added to any website package" },
    { name: "E-shop", icon: "shop", title: "E-shops", body: "Up to 50 products, card payments through Viva Wallet or Stripe, delivery options, discount codes and stock you can update yourself.", price: "€1,190", sale: "€1,050", unit: "", note: "Payment provider fees are paid to the provider" },
    { name: "Restaurant & Café Website", icon: "restaurant", title: "Restaurants & cafés", body: "A website with your menu, a QR menu for every table and online table booking, in English and Greek.", price: "€990", sale: "€890", unit: "", note: "Menu updates included with Website Care" },
    { name: "Restaurant Ordering", icon: "ordering", title: "Restaurant ordering", body: "Customers order from the QR menu, orders go straight to a kitchen screen and they can pay by card at the table.", price: "€1,690", sale: "€1,550", unit: "", note: "Includes the restaurant website" },
    { name: "Custom Web App", icon: "app", title: "Custom web apps", body: "Client portals, dashboards, staff tools and automations that work in the browser and install on any phone, with no app-store fees.", price: "€2,500", sale: "€2,350", unit: "", note: "Fixed quote after a scoping call" },
  ] as Solution[],
  monthlyEyebrow: "Monthly plans",
  monthlyTitle: "Keep it running. Keep it growing.",
  monthlyLead: "All monthly plans are optional and start after launch.",
  monthly: [
    { name: "Hosting only", price: "€19", unit: "/month", body: "Hosting, SSL and backups. Content changes are quoted when you need them." },
    { name: "Website Care", price: "€49", sale: "€29", unit: "/month", body: "Hosting, monitoring, technical updates and minor content updates. {growth} or {advanced} a month for the Growth and Advanced packages.", featured: true },
    { name: "Local SEO & Google Business", price: "€149", unit: "/month", body: "Google Business updates, review requests, local page improvements and a short monthly report.", from: true },
  ] as MonthlyPlan[],
  industriesEyebrow: "Built for your type of business",
  industriesTitle: "See what it looks like for a business like yours.",
  industries: [
    { title: "Dental & medical clinics", body: "Clear treatment pages that answer patients’ worries, with booking one step away.", price: "€899", sale: "€699", href: "/work/aura-dental", cta: "See the Aura Dental concept" },
    { title: "Real estate agencies", body: "Property search with filters, editorial listing pages and private enquiries.", price: "€1,099", sale: "€899", href: "/work/nova-estates", cta: "See the Nova Estates concept" },
    { title: "Beauty & wellness studios", body: "A short treatment menu, therapists by name and booking or WhatsApp on every page.", price: "€899", sale: "€699", href: "/work/vela-studio", cta: "See the Vela Studio concept" },
    { title: "Restaurants, cafés & taverns", body: "Menu, QR menu and table booking, with ordering to the kitchen when you are ready.", price: "€990", sale: "€890", href: "/free-prototype", cta: "Get a free homepage prototype" },
  ] as Industry[],
  addons: [["Additional page", "from €69"], ["Extra language setup (translation separate)", "€150 to €300"], ["Business email setup", "€49"], ["Domain and DNS setup (plus the domain itself)", "€29"], ["Google Ads setup & conversion tracking", "Quote"], ["CRM integration", "Quote"], ["Newsletter integration", "Quote"], ["Custom AI integrations", "On request"], ["Monthly analytics reporting", "Quote"], ["Photography & video (through a partner)", "Quote"], ["Website migration after technical review", "Quote"]] as [string, string][],
  solutionsEyebrow: "Beyond a website",
  solutionsTitle: "Solutions with clear starting prices.",
  solutionsLead: "For businesses that need more than pages: bookings, online sales, restaurant ordering or a tool built around how you work.",
  fromLabel: "From",
  ask: "Ask about this",
  finalNote: "Prices in euro. No hidden fees.",
  care: {
    eyebrow: "Website Care",
    title: "Launch is the start. We look after it every month.",
    body: "Hosting, SSL, backups, uptime and security monitoring, technical updates and minor content changes, handled for you so the site stays fast, secure and current.",
    perMonth: "/ month",
    updates: "Up to {minutes} of updates a month",
    terms: "Optional. 3-month minimum, then month-to-month, cancel with 30 days’ notice.",
    offerNote: "Black Friday Website Care prices",
    cta: "Add Website Care",
  },
  offer: { lead: "Black Friday: up to €200 off every website package, €100 to €150 off every solution and Website Care from €29 a month, for projects agreed by Monday 30 November.", was: "Regular price" },
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
  metaDescription: "Πακέτα ιστοσελίδων για επιχειρήσεις στην Κύπρο από {website}, online κρατήσεις από {booking}, e-shops από {shop} και hosting από 19 € τον μήνα. Δείτε τι περιλαμβάνει το καθένα.",
  plans: elPlans,
  solutions: [
    { name: "Online Booking System", icon: "booking", title: "Online κρατήσεις", body: "Διαθεσιμότητα σε πραγματικό χρόνο, επιβεβαιώσεις και υπενθυμίσεις με email και ημερολόγιο που διαχειρίζεστε εσείς. Οι υπενθυμίσεις SMS είναι προαιρετικές και χρεώνονται στο κόστος.", price: "790 €", sale: "690 €", unit: "", note: "ή +390 € μαζί με οποιοδήποτε πακέτο ιστοσελίδας", saleNote: "ή +290 € μαζί με οποιοδήποτε πακέτο ιστοσελίδας" },
    { name: "E-shop", icon: "shop", title: "E-shops", body: "Έως 50 προϊόντα, πληρωμές με κάρτα μέσω Viva Wallet ή Stripe, επιλογές αποστολής, εκπτωτικοί κωδικοί και απόθεμα που ενημερώνετε εσείς.", price: "1.190 €", sale: "1.050 €", unit: "", note: "Οι χρεώσεις του παρόχου πληρωμών πληρώνονται στον πάροχο" },
    { name: "Restaurant & Café Website", icon: "restaurant", title: "Εστιατόρια & καφέ", body: "Ιστοσελίδα με το μενού σας, QR μενού σε κάθε τραπέζι και online κράτηση τραπεζιού, στα ελληνικά και στα αγγλικά.", price: "990 €", sale: "890 €", unit: "", note: "Οι αλλαγές στο μενού περιλαμβάνονται στο Website Care" },
    { name: "Restaurant Ordering", icon: "ordering", title: "Παραγγελίες εστιατορίου", body: "Οι πελάτες παραγγέλνουν από το QR μενού, οι παραγγελίες πάνε κατευθείαν σε οθόνη στην κουζίνα και πληρώνουν με κάρτα στο τραπέζι.", price: "1.690 €", sale: "1.550 €", unit: "", note: "Περιλαμβάνει την ιστοσελίδα του εστιατορίου" },
    { name: "Custom Web App", icon: "app", title: "Εξειδικευμένες web εφαρμογές", body: "Πύλες πελατών, dashboards, εργαλεία προσωπικού και αυτοματοποιήσεις που δουλεύουν στον browser και εγκαθίστανται σε κάθε κινητό, χωρίς χρεώσεις app store.", price: "2.500 €", sale: "2.350 €", unit: "", note: "Σταθερή προσφορά μετά από μια κλήση γνωριμίας" },
  ],
  monthlyEyebrow: "Μηνιαία πλάνα",
  monthlyTitle: "Να δουλεύει. Να μεγαλώνει.",
  monthlyLead: "Όλα τα μηνιαία πλάνα είναι προαιρετικά και ξεκινούν μετά το λανσάρισμα.",
  monthly: [
    { name: "Μόνο hosting", price: "19 €", unit: "/μήνα", body: "Hosting, SSL και αντίγραφα ασφαλείας. Οι αλλαγές περιεχομένου κοστολογούνται όταν τις χρειαστείτε." },
    { name: "Website Care", price: "49 €", sale: "29 €", unit: "/μήνα", body: "Hosting, παρακολούθηση, τεχνικές ενημερώσεις και μικρές αλλαγές περιεχομένου. {growth} ή {advanced} τον μήνα για τα πακέτα Growth και Advanced.", featured: true },
    { name: "Τοπικό SEO & Google Business", price: "149 €", unit: "/μήνα", body: "Ενημερώσεις στο Google Business, αιτήματα για κριτικές, βελτιώσεις τοπικών σελίδων και σύντομη μηνιαία αναφορά.", from: true },
  ],
  industriesEyebrow: "Για το είδος της επιχείρησής σας",
  industriesTitle: "Δείτε πώς φαίνεται για μια επιχείρηση σαν τη δική σας.",
  industries: [
    { title: "Οδοντιατρεία & ιατρεία", body: "Ξεκάθαρες σελίδες θεραπειών που απαντούν στις ανησυχίες των ασθενών, με την κράτηση ένα βήμα μακριά.", price: "899 €", sale: "699 €", href: "/work/aura-dental", cta: "Δείτε το concept Aura Dental" },
    { title: "Μεσιτικά γραφεία", body: "Αναζήτηση ακινήτων με φίλτρα, προσεγμένες σελίδες ακινήτων και ιδιωτικά αιτήματα.", price: "1.099 €", sale: "899 €", href: "/work/nova-estates", cta: "Δείτε το concept Nova Estates" },
    { title: "Studios ομορφιάς & ευεξίας", body: "Σύντομο μενού θεραπειών, οι θεραπευτές με το όνομά τους και κράτηση ή WhatsApp σε κάθε σελίδα.", price: "899 €", sale: "699 €", href: "/work/vela-studio", cta: "Δείτε το concept Vela Studio" },
    { title: "Εστιατόρια, καφέ & ταβέρνες", body: "Μενού, QR μενού και κράτηση τραπεζιού, με παραγγελίες στην κουζίνα όταν είστε έτοιμοι.", price: "990 €", sale: "890 €", href: "/free-prototype", cta: "Πάρτε δωρεάν πρωτότυπο αρχικής σελίδας" },
  ],
  addons: [["Επιπλέον σελίδα", "από 69 €"], ["Ρύθμιση επιπλέον γλώσσας (η μετάφραση χρεώνεται ξεχωριστά)", "150 € έως 300 €"], ["Ρύθμιση εταιρικού email", "49 €"], ["Ρύθμιση domain και DNS (συν το κόστος του domain)", "29 €"], ["Ρύθμιση Google Ads & μέτρηση μετατροπών", "Με προσφορά"], ["Διασύνδεση με CRM", "Με προσφορά"], ["Διασύνδεση newsletter", "Με προσφορά"], ["Εξειδικευμένες διασυνδέσεις AI", "Κατόπιν αιτήματος"], ["Μηνιαίες αναφορές analytics", "Με προσφορά"], ["Φωτογράφιση & βίντεο (μέσω συνεργάτη)", "Με προσφορά"], ["Μεταφορά ιστοσελίδας μετά από τεχνικό έλεγχο", "Με προσφορά"]],
  solutionsEyebrow: "Πέρα από μια ιστοσελίδα",
  solutionsTitle: "Λύσεις με ξεκάθαρες τιμές εκκίνησης.",
  solutionsLead: "Για επιχειρήσεις που χρειάζονται κάτι παραπάνω από σελίδες: κρατήσεις, online πωλήσεις, παραγγελίες εστιατορίου ή ένα εργαλείο φτιαγμένο γύρω από τον τρόπο που δουλεύετε.",
  fromLabel: "Από",
  ask: "Ρωτήστε μας",
  finalNote: "Τιμές σε ευρώ. Χωρίς κρυφές χρεώσεις.",
  care: {
    eyebrow: "Website Care",
    title: "Το λανσάρισμα είναι η αρχή. Τη φροντίζουμε κάθε μήνα.",
    body: "Hosting, SSL, αντίγραφα ασφαλείας, παρακολούθηση διαθεσιμότητας και ασφάλειας, τεχνικές ενημερώσεις και μικρές αλλαγές περιεχομένου, για να μένει η ιστοσελίδα γρήγορη, ασφαλής και ενημερωμένη.",
    perMonth: "/ μήνα",
    updates: "Έως {minutes} αλλαγές τον μήνα",
    terms: "Προαιρετικό. Ελάχιστη διάρκεια 3 μηνών, μετά ανά μήνα, με ειδοποίηση διακοπής 30 ημερών.",
    offerNote: "Τιμές Website Care για τη Black Friday",
    cta: "Προσθήκη Website Care",
  },
  offer: { lead: "Black Friday: έως 200 € έκπτωση σε κάθε πακέτο ιστοσελίδας, 100 € έως 150 € σε κάθε λύση και Website Care από 29 € τον μήνα, για έργα που θα συμφωνηθούν έως τη Δευτέρα 30 Νοεμβρίου.", was: "Κανονική τιμή" },
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

/** The page copy with the offer applied: offer prices shown, regular ones kept as `was`. */
function resolved(locale: Locale) {
  const t = copy[locale];
  const plans = t.plans.map((plan) => {
    if (!blackFriday.active) return plan;
    const setup = plan.sale ? { setup: plan.sale, was: plan.setup, saving: savingLabel(locale, plan.setup, plan.sale) } : {};
    const care = plan.monthlySale ? { monthly: plan.monthlySale, monthlyWas: plan.monthly, careSaving: savingLabel(locale, plan.monthly, plan.monthlySale) } : {};
    return { ...plan, ...setup, ...care };
  });
  const monthly = t.monthly.map((m) => { const x = priced(m); return { ...x, body: x.body.replace("{growth}", plans[1].monthly).replace("{advanced}", plans[2].monthly) }; });
  const solutions = t.solutions.map((s) => { const x = priced(s); return blackFriday.active && s.saleNote ? { ...x, note: s.saleNote } : x; });
  const industries = t.industries.map(priced);
  const solutionPrice = (name: string) => solutions.find((s) => s.name === name)?.price ?? "";
  const metaDescription = t.metaDescription.replace("{website}", plans[0].setup).replace("{booking}", solutionPrice("Online Booking System")).replace("{shop}", solutionPrice("E-shop"));
  return { ...t, plans, solutions, industries, monthly, metaDescription };
}

export function pricingMetadata(locale: Locale) {
  const t = resolved(locale);
  return pageMetadata({ locale, path: "/pricing", title: t.metaTitle, description: t.metaDescription });
}

/** Every price on the page as schema.org offers, so search and AI answers can quote them exactly. */
function pricingSchema(locale: Locale) {
  const t = resolved(locale);
  const url = `${siteConfig.url}${localizePath(locale, "/pricing")}`;
  const provider = { "@id": `${siteConfig.url}/#business` };
  const offer = (name: string, description: string, price: string, perMonth = false) => ({
    "@type": "Offer",
    price: toNumber(price),
    priceCurrency: "EUR",
    url,
    ...(blackFriday.active ? { priceValidUntil: blackFriday.until } : {}),
    itemOffered: { "@type": "Service", name, description, provider, areaServed: { "@type": "Country", name: "Cyprus" } },
    ...(perMonth ? { priceSpecification: { "@type": "UnitPriceSpecification", price: toNumber(price), priceCurrency: "EUR", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } } } : {}),
  });
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: t.metaTitle,
    url,
    inLanguage: locale,
    itemListElement: [
      ...t.plans.map((plan) => offer(plan.name, plan.best, plan.setup)),
      ...t.plans.map((plan) => offer(`Website Care: ${plan.short}`, plan.care.join(", "), plan.monthly, true)),
      ...t.solutions.map((s) => offer(s.title, s.body, s.price)),
      ...t.monthly.filter((m) => m.name !== "Website Care").map((m) => offer(m.name, m.body, m.price, true)),
    ],
  };
}

export function PricingView({ locale }: { locale: Locale }) {
  const t = resolved(locale);
  const was = (price?: string) => price ? <s className="price-was"><span className="sr-only">{t.offer.was}: </span>{price}</s> : null;
  const save = (regular: string | undefined, now: string) => regular ? <span className="save-chip">{savingLabel(locale, regular, now)}</span> : null;
  const ribbon = blackFriday.ribbon[locale];
  const contactPath = getDictionary(locale).pricing.contactPath;
  return <main className="motion-page pricing-motion-page"><PageMotion /><PageTracker event="pricing_view" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema(locale)).replace(/</g, "\\u003c") }} />
    {blackFriday.active && <div className="offer-ribbon"><div className="offer-ribbon-track">{[0, 1].map((copyIndex) => <p key={copyIndex} aria-hidden={copyIndex === 1 || undefined}>{[...ribbon, ...ribbon].map((item, i) => <span key={i}>{item}</span>)}</p>)}</div></div>}
    <section className={`lit-hero pricing-lit-hero${blackFriday.active ? " is-offer" : ""}`}><div className="site-container lit-hero-grid">
      <div>{blackFriday.active ? <p className="offer-badge"><b>{blackFriday.label[locale]}</b><span>{blackFriday.ends[locale]}</span></p> : <p className="eyebrow">{t.eyebrow}</p>}<h1>{t.titleLead} <em>{t.titleAccent}</em></h1><p className="lit-hero-lead">{blackFriday.active ? t.offer.lead : t.lead}</p>{blackFriday.active && <OfferCountdown endsAt={blackFriday.endsAt} labels={blackFriday.countdown[locale]} />}</div>
      <div className="price-summary">
        <div className="price-summary-head"><span>{t.summary.head}</span><span>{t.summary.setup}</span><span>{t.summary.care}</span></div>
        {t.plans.map((plan) => <div className={`price-summary-row${plan.popular ? " is-popular" : ""}`} key={plan.name}><span>{plan.name}{plan.popular && <em>{t.summary.popular}</em>}</span><strong>{was(plan.was)}{plan.setup}</strong><small>{was(plan.monthlyWas)}{plan.monthly}</small></div>)}
        <div className="price-summary-foot"><span><b>50%</b> {t.summary.deposit}</span><span><b>50%</b> {t.summary.beforeLaunch}</span><span>{t.summary.optional}</span></div>
      </div>
    </div></section>
    <section className="pricing-section section-pad"><div className="site-container"><Pricing plans={t.plans} copy={getDictionary(locale).pricing} wasLabel={t.offer.was} careOffer={blackFriday.active ? `${blackFriday.label[locale]} · ${t.fromLabel.toLowerCase()} ${t.plans[0].monthly}${t.care.perMonth}` : ""} /><p className="pricing-scope-note">{t.scopeNote} {t.finalNote}</p></div></section>
    <section className="care-band section-pad" id="website-care"><div className="site-container care-band-grid">
      <div data-motion="rise"><p className="eyebrow">{t.care.eyebrow}</p><h2>{t.care.title}</h2><p>{t.care.body}</p><p className="care-terms">{t.care.terms}</p></div>
      <div className="care-tiers" data-motion="rise">
        {blackFriday.active && <p className="care-offer"><b>{blackFriday.label[locale]}</b><span>{t.care.offerNote}</span></p>}
        {t.plans.map((plan) => <div className={`care-tier${plan.popular ? " is-popular" : ""}`} key={plan.name}>
          <div><strong className="care-tier-name">{plan.short}</strong><span>{t.care.updates.replace("{minutes}", plan.minutes)}</span></div>
          <div className="care-tier-price">{was(plan.monthlyWas)}<strong>{plan.monthly}</strong><small>{t.care.perMonth}</small>{plan.careSaving && <span className="save-chip">{plan.careSaving} {t.care.perMonth}</span>}</div>
        </div>)}
        <Link className="button button-accent button-large" href={`${contactPath}?service=${encodeURIComponent("Website Care")}`} data-track="care_click" data-track-location="pricing_care">{t.care.cta}<ArrowRight aria-hidden="true" /></Link>
      </div>
    </div></section>
    <section className="solutions-section section-pad"><div className="site-container">
      <div className="pricing-section-head" data-motion="rise"><p className="eyebrow">{t.solutionsEyebrow}</p><h2>{t.solutionsTitle}</h2><p>{t.solutionsLead}</p></div>
      <div className="solution-grid">{t.solutions.map((s) => { const Icon = solutionIcons[s.icon]; return <article className="solution-card" key={s.name} data-motion="rise">
        <i aria-hidden="true"><Icon /></i>
        <h3>{s.title}</h3>
        <p>{s.body}</p>
        <div className="solution-price"><small>{t.fromLabel}</small>{was(s.was)}<strong>{s.price}</strong>{save(s.was, s.price)}</div>
        <p className="solution-note">{s.note}</p>
        <Link href={`${contactPath}?package=${encodeURIComponent(s.name)}`} data-track="package_click" data-track-label={s.name} data-track-package-name={s.name} data-track-location="pricing_solutions">{t.ask}<ArrowRight aria-hidden="true" /></Link>
      </article>; })}</div>
    </div></section>
    <section className="monthly-section section-pad"><div className="site-container">
      <div className="pricing-section-head" data-motion="rise"><p className="eyebrow">{t.monthlyEyebrow}</p><h2>{t.monthlyTitle}</h2><p>{t.monthlyLead}</p></div>
      <div className="monthly-grid">{t.monthly.map((m) => <article className={`monthly-card${m.featured ? " is-featured" : ""}`} key={m.name} data-motion="rise">
        <h3>{m.name}</h3>
        <div className="solution-price">{(m.from || m.name === "Website Care") && <small>{t.fromLabel}</small>}{was(m.was)}<strong>{m.price}</strong><span>{m.unit}</span></div>
        <p>{m.body}</p>
      </article>)}</div>
    </div></section>
    <section className="industries-section section-pad"><div className="site-container">
      <div className="pricing-section-head" data-motion="rise"><p className="eyebrow">{t.industriesEyebrow}</p><h2>{t.industriesTitle}</h2></div>
      <div className="industry-grid">{t.industries.map((ind) => <Link className="industry-card" key={ind.title} href={localizePath(locale, ind.href)} data-motion="rise" data-track="industry_click" data-track-label={ind.title} data-track-location="pricing">
        <h3>{ind.title}</h3>
        <p>{ind.body}</p>
        <div className="solution-price"><small>{t.fromLabel}</small>{was(ind.was)}<strong>{ind.price}</strong>{save(ind.was, ind.price)}</div>
        <span className="industry-cta">{ind.cta}<ArrowRight aria-hidden="true" /></span>
      </Link>)}</div>
    </div></section>
    <section className="maintenance-policy"><div className="site-container policy-grid"><div data-motion="rise"><p className="eyebrow">{t.policy.eyebrow}</p><h2>{t.policy.title}</h2><p>{t.policy.body}</p></div><div className="policy-item" data-motion="rise"><i aria-hidden="true"><PencilLine /></i><h3>{t.policy.includedTitle}</h3><p>{t.policy.includedBody}</p></div><div className="policy-item" data-motion="rise"><i aria-hidden="true"><Receipt /></i><h3>{t.policy.quotedTitle}</h3><p>{t.policy.quotedBody}</p></div><div className="policy-note" data-motion="rise"><i aria-hidden="true"><CalendarClock /></i><div><p>{t.policy.rollover}</p><p>{t.policy.term}</p></div></div></div></section>
    <section className="addons-section section-pad"><div className="site-container"><div data-motion="rise"><p className="eyebrow">{t.addonsEyebrow}</p><h2>{t.addonsTitle}</h2></div><div className="addons-list">{t.addons.map(([name, price]) => <div key={name} data-motion="rise"><span>{name}</span><strong>{price}</strong></div>)}</div></div></section>
    <section className="pricing-faq section-pad"><div className="site-container faq-grid"><div data-motion="rise"><p className="eyebrow">{t.faqEyebrow}</p><h2>{t.faqTitle}</h2></div><FAQList list={getFaqs(locale)} limit={8} /></div></section>
  </main>;
}
