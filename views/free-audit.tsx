import { Eye, FileText, Gauge, MapPin, MousePointerClick, Search, Smartphone, Users } from "lucide-react";
import { AuditForm } from "@/components/audit-form";
import { FAQList } from "@/components/faq-list";
import { PageMotion } from "@/components/page-motion";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const reviewIcons = [Eye, Smartphone, MousePointerClick, Search, MapPin, Gauge, Users, FileText] as const;

const en = {
  metaTitle: "Free Website Audit Cyprus",
  metaDescription: "Get a free review of your website: design, mobile experience, speed, SEO and Google presence, with clear recommendations and no obligation.",
  offerName: "Free Website Audit",
  reviewAreas: [["Design", "First impression and visual credibility"], ["Mobile", "Usability on the devices customers use"], ["Conversion", "Clarity of calls, forms and booking journeys"], ["SEO", "Technical and content foundations"], ["Google presence", "Local profile and search alignment"], ["Performance", "Speed and technical experience"], ["Trust", "Signals that help customers feel confident"], ["Content", "Clear messaging and service information"]] as [string, string][],
  // Illustrative only: the shape of the written review a client receives.
  examplePriorities: [
    { finding: "Add a clear booking button to the first screen", area: "Conversion", impact: "high", label: "High" },
    { finding: "Mobile pages take almost 6 seconds to load", area: "Performance", impact: "high", label: "High" },
    { finding: "Complete the Google Business profile", area: "Google presence", impact: "medium", label: "Medium" },
    { finding: "Show reviews and credentials on the homepage", area: "Trust", impact: "medium", label: "Medium" },
  ],
  faqs: (areaCount: number): [string, string][] => [
    ["Is the website audit really free?", "Yes. The audit costs nothing and there is no obligation to work with us afterwards. You receive the written review either way."],
    ["What does the website audit cover?", `We review ${areaCount} areas: design, mobile experience, conversion, SEO, Google presence, performance, trust and content. The review lists the issues that matter most, in order of impact.`],
    ["How long does it take?", "You receive the written review by email within two working days of sending the form."],
    ["Do you need access to my website?", "No. We review the website the way your customers and Google see it, so you do not need to share any logins and nothing on your site is changed."],
    ["What happens after the audit?", "You can act on the recommendations yourself or with your current provider. If you would like VISION. to handle them, or to redesign the site, we send a clear quote."],
    ["I do not have a website yet. Can you still help?", "The audit reviews an existing website, so it needs one to start from. If you are starting from nothing, get in touch through the contact page and we will talk through what the business needs."],
  ],
  eyebrow: "Free website audit",
  titleLead: "Find your",
  titleAccent: "next step.",
  lead: "A practical website review with clear priorities for visibility, trust and customer action.",
  deliverable: "Written review by email within two working days.",
  scorecardLabel: "Example of the written review",
  exampleReview: "Example review",
  impact: "Impact",
  areasReviewed: "{count} areas reviewed",
  priorities: "{count} priorities",
  formEyebrow: "Your details",
  formTitle: "Give us enough context to make the review useful.",
  formBody: "Only the essential details are required. Anything else helps us make the review more relevant to your business.",
  areasEyebrow: "What we review",
  faqEyebrow: "Questions",
  faqTitle: "Free, and no catch.",
};

const el: typeof en = {
  metaTitle: "Δωρεάν Αξιολόγηση Ιστοσελίδας στην Κύπρο",
  metaDescription: "Δωρεάν αξιολόγηση της ιστοσελίδας σας: σχεδιασμός, εμπειρία στο κινητό, ταχύτητα, SEO και παρουσία στο Google, με ξεκάθαρες προτάσεις και χωρίς καμία δέσμευση.",
  offerName: "Δωρεάν Αξιολόγηση Ιστοσελίδας",
  reviewAreas: [["Σχεδιασμός", "Πρώτη εντύπωση και οπτική αξιοπιστία"], ["Κινητό", "Ευχρηστία στις συσκευές που χρησιμοποιούν οι πελάτες"], ["Μετατροπές", "Σαφήνεια σε κλήσεις, φόρμες και διαδρομές κράτησης"], ["SEO", "Τεχνικές βάσεις και βάσεις περιεχομένου"], ["Παρουσία στο Google", "Τοπικό προφίλ και ευθυγράμμιση με τις αναζητήσεις"], ["Απόδοση", "Ταχύτητα και τεχνική εμπειρία"], ["Αξιοπιστία", "Στοιχεία που δίνουν σιγουριά στους πελάτες"], ["Περιεχόμενο", "Ξεκάθαρα μηνύματα και πληροφορίες για τις υπηρεσίες"]],
  examplePriorities: [
    { finding: "Προσθέστε ένα ξεκάθαρο κουμπί κράτησης στην πρώτη οθόνη", area: "Μετατροπές", impact: "high", label: "Υψηλή" },
    { finding: "Οι σελίδες στο κινητό χρειάζονται σχεδόν 6 δευτερόλεπτα για να φορτώσουν", area: "Απόδοση", impact: "high", label: "Υψηλή" },
    { finding: "Ολοκληρώστε το προφίλ Google Business", area: "Παρουσία στο Google", impact: "medium", label: "Μεσαία" },
    { finding: "Δείξτε κριτικές και πιστοποιήσεις στην αρχική σελίδα", area: "Αξιοπιστία", impact: "medium", label: "Μεσαία" },
  ],
  faqs: (areaCount: number): [string, string][] => [
    ["Είναι πραγματικά δωρεάν η αξιολόγηση;", "Ναι. Η αξιολόγηση δεν κοστίζει τίποτα και δεν έχετε καμία υποχρέωση να συνεργαστείτε μαζί μας μετά. Θα λάβετε τη γραπτή αξιολόγηση σε κάθε περίπτωση."],
    ["Τι καλύπτει η αξιολόγηση της ιστοσελίδας;", `Εξετάζουμε ${areaCount} τομείς: σχεδιασμό, εμπειρία στο κινητό, μετατροπές, SEO, παρουσία στο Google, απόδοση, αξιοπιστία και περιεχόμενο. Η αξιολόγηση καταγράφει τα ζητήματα που μετράνε περισσότερο, με σειρά προτεραιότητας.`],
    ["Πόσο χρόνο χρειάζεται;", "Λαμβάνετε τη γραπτή αξιολόγηση με email μέσα σε δύο εργάσιμες ημέρες από την αποστολή της φόρμας."],
    ["Χρειάζεστε πρόσβαση στην ιστοσελίδα μου;", "Όχι. Εξετάζουμε την ιστοσελίδα όπως τη βλέπουν οι πελάτες σας και το Google, οπότε δεν χρειάζεται να μοιραστείτε κωδικούς και δεν αλλάζει τίποτα στην ιστοσελίδα σας."],
    ["Τι γίνεται μετά την αξιολόγηση;", "Μπορείτε να εφαρμόσετε τις προτάσεις μόνοι σας ή με τον σημερινό σας πάροχο. Αν θέλετε να τις αναλάβει η VISION. ή να ανανεώσει την ιστοσελίδα, σας στέλνουμε μια ξεκάθαρη προσφορά."],
    ["Δεν έχω ακόμη ιστοσελίδα. Μπορείτε να βοηθήσετε;", "Η αξιολόγηση αφορά μια υπάρχουσα ιστοσελίδα, οπότε χρειάζεται μία για να ξεκινήσουμε. Αν ξεκινάτε από το μηδέν, επικοινωνήστε μαζί μας μέσα από τη σελίδα επικοινωνίας και θα συζητήσουμε τι χρειάζεται η επιχείρησή σας."],
  ],
  eyebrow: "Δωρεάν αξιολόγηση ιστοσελίδας",
  titleLead: "Βρείτε",
  titleAccent: "το επόμενο βήμα.",
  lead: "Μια πρακτική αξιολόγηση της ιστοσελίδας σας, με ξεκάθαρες προτεραιότητες για ορατότητα, αξιοπιστία και ενέργειες πελατών.",
  deliverable: "Γραπτή αξιολόγηση με email μέσα σε δύο εργάσιμες ημέρες.",
  scorecardLabel: "Παράδειγμα γραπτής αξιολόγησης",
  exampleReview: "Παράδειγμα αξιολόγησης",
  impact: "Επίδραση",
  areasReviewed: "{count} τομείς αξιολόγησης",
  priorities: "{count} προτεραιότητες",
  formEyebrow: "Τα στοιχεία σας",
  formTitle: "Δώστε μας αρκετές πληροφορίες για να είναι η αξιολόγηση χρήσιμη.",
  formBody: "Μόνο τα βασικά στοιχεία είναι υποχρεωτικά. Ό,τι άλλο προσθέσετε μας βοηθά να κάνουμε την αξιολόγηση πιο σχετική με την επιχείρησή σας.",
  areasEyebrow: "Τι αξιολογούμε",
  faqEyebrow: "Ερωτήσεις",
  faqTitle: "Δωρεάν, χωρίς παγίδες.",
};

const copy = { en, el };

export function freeAuditMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/free-audit", title: t.metaTitle, description: t.metaDescription, image: "/images/social/og-free-audit.jpg" });
}

export function FreeAuditView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const dictionary = getDictionary(locale);
  const auditFaqs = t.faqs(t.reviewAreas.length);
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Offer", name: t.offerName, description: t.metaDescription, url: `${siteConfig.url}${localizePath(locale, "/free-audit")}`, price: "0", priceCurrency: "EUR", areaServed: { "@type": "Country", name: "Cyprus" }, seller: { "@id": `${siteConfig.url}/#business` } }, { "@type": "FAQPage", ...(locale === "en" ? {} : { inLanguage: locale }), mainEntity: auditFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }] };
  return <main className="audit-page motion-page"><PageMotion /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
  <section className="lit-hero audit-lit-hero"><div className="site-container lit-hero-grid"><div><p className="eyebrow">{t.eyebrow}</p><h1>{t.titleLead} <em>{t.titleAccent}</em></h1><p className="lit-hero-lead">{t.lead}</p><p className="audit-deliverable">{t.deliverable}</p></div>
    <div className="hero-panel audit-scorecard" aria-label={t.scorecardLabel}><p className="hero-panel-head"><span>{t.exampleReview}</span><span>{t.impact}</span></p>{t.examplePriorities.map(({ finding, area, impact, label }, index) => <div className="scorecard-row audit-priority" key={finding}><span>0{index + 1}</span><div><strong>{finding}</strong><small>{area}</small></div><em data-impact={impact}>{label}</em></div>)}<p className="hero-panel-foot"><span>{t.areasReviewed.replace("{count}", String(t.reviewAreas.length))}</span><strong>{t.priorities.replace("{count}", String(t.examplePriorities.length))}</strong></p></div>
  </div></section>
  <section className="audit-form-section"><div className="site-container audit-form-grid"><div data-motion="rise"><p className="eyebrow">{t.formEyebrow}</p><h2>{t.formTitle}</h2><p>{t.formBody}</p></div><div className="form-panel" data-motion="rise"><AuditForm locale={locale} copy={dictionary.auditForm} formCopy={dictionary.forms} /></div></div></section>
  <section className="audit-areas section-pad"><div className="site-container"><p className="eyebrow" data-motion="rise">{t.areasEyebrow}</p><div className="audit-area-grid">{t.reviewAreas.map(([title, body], index) => { const Icon = reviewIcons[index]; return <article key={title} data-motion="rise"><i aria-hidden="true"><Icon /></i><h2>{title}</h2><p>{body}</p></article>; })}</div></div></section>
  <section className="audit-faq section-pad"><div className="site-container"><div className="section-heading" data-motion="rise"><p className="eyebrow">{t.faqEyebrow}</p><h2>{t.faqTitle}</h2></div><FAQList list={auditFaqs} /></div></section>
  </main>; }
