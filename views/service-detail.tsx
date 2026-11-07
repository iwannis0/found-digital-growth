import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageMotion } from "@/components/page-motion";
import { ServiceProgress } from "@/components/service-progress";
import { PageTracker } from "@/components/analytics";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { getCustomCapabilities, getServices } from "@/lib/localized-content";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type ServiceDetail = { eyebrow: string; title: string; intro: string; items: Array<{ label: string; body: string }> };
type ServiceApproach = Array<{ title: string; body: string }>;
type OngoingService = ServiceDetail & { cta: string; href: string };

const en = {
  serviceDetails: {
    "web-design": {
      eyebrow: "What the build looks like",
      title: "A website scoped around the business, not a template.",
      intro: "The final page count, content and integrations are agreed after discovery. These are the practical areas we define before design begins.",
      items: [
        { label: "Typical timeline", body: "A focused small-business website usually takes 4 to 8 weeks once content and feedback are available." },
        { label: "Page scope", body: "Most projects begin with 4 to 12 essential service, trust, contact and conversion pages." },
        { label: "Integrations", body: "Calls, WhatsApp, forms, booking tools, maps and analytics are selected around the customer journey." },
      ],
    },
    "google-business": {
      eyebrow: "Profile checklist",
      title: "Small profile details shape the first local impression.",
      intro: "A strong Google Business Profile makes it easier for nearby customers to trust the business and take action before they even reach the website.",
      items: [
        { label: "Accurate foundations", body: "Correct category, hours, contact details, service area and website link." },
        { label: "Useful information", body: "Clear services, descriptions, photos and answers to the questions customers ask first." },
        { label: "A clear next step", body: "A profile aligned with calls, directions, website visits, reviews and enquiries." },
      ],
    },
    analytics: {
      eyebrow: "What we measure",
      title: "Measure the actions that show real intent.",
      intro: "Traffic alone does not tell you whether the website is helping the business. We configure measurement around the customer signals that matter after a visit.",
      items: [
        { label: "Calls & WhatsApp", body: "See when visitors choose a direct conversation from the website." },
        { label: "Forms & bookings", body: "Track submitted enquiries and clicks that begin an appointment or booking journey." },
        { label: "Campaign source", body: "Understand which search, social or campaign source created useful evidence for an action." },
      ],
    },
    "conversion-design": {
      eyebrow: "Customer journeys",
      title: "The right action depends on the business.",
      intro: "Conversion design means choosing the most useful action for the way customers decide, rather than adding the same button to every page.",
      items: [
        { label: "Calls & WhatsApp", body: "For local services where a fast conversation is the easiest route forward." },
        { label: "Bookings", body: "For consultations, treatments, classes and appointments where availability matters." },
        { label: "Enquiries & quotes", body: "For considered purchases, projects and services that need useful context before a response." },
      ],
    },
    "website-care": {
      eyebrow: "What care covers",
      title: "Keep routine website work consistent and well maintained.",
      intro: "Website Care supports technical health and small monthly changes. Larger improvements are scoped separately so there are no surprises.",
      items: [
        { label: "Minor updates", body: "Text, images, contact details, opening hours and small content adjustments." },
        { label: "Technical care", body: "Hosting, backups, monitoring, updates and routine form or performance checks." },
        { label: "Quoted separately", body: "New pages, redesigns, integrations, custom features and large content uploads." },
      ],
    },
    automation: {
      eyebrow: "When automation helps",
      title: "Remove repetitive steps without overcomplicating the business.",
      intro: "Automation is added only when it makes a follow-up, booking or handover process clearer for the team and the customer.",
      items: [
        { label: "Lead handover", body: "Send a website enquiry to the right inbox, CRM or internal workflow." },
        { label: "Booking follow-up", body: "Connect booking confirmations and useful next steps after an appointment is made." },
        { label: "Simple by design", body: "Keep the workflow easy to understand, manage and change as the business grows." },
      ],
    },
  } as Record<string, ServiceDetail>,
  serviceCtas: {
    "web-design": "Get a Free Website Audit",
    "local-seo": "Review my local visibility",
    "google-business": "Review my Google profile",
    "website-care": "Review my website health",
    analytics: "Review what to track",
    "conversion-design": "Review my conversion path",
  } as Record<string, string>,
  defaultCta: "Get a Free Website Audit",
  customCta: "Discuss a custom capability",
  serviceApproaches: {
    "web-design": [
      { title: "Define the foundation", body: "We agree the pages, content priorities and integrations before visual design begins." },
      { title: "Design for decisions", body: "Structure, messaging and trust signals are shaped around the action each visitor needs to take." },
      { title: "Build and launch", body: "The website is developed responsively, tested and prepared for a confident launch." },
    ],
    "local-seo": [
      { title: "Understand local demand", body: "We review the services, locations and searches that matter most to the business." },
      { title: "Build in local signals", body: "We set up the technical, content and location signals search engines need to understand the business." },
      { title: "Launch ready for search", body: "Before launch we connect Search Console, submit the sitemap and check every page can be indexed." },
    ],
    "google-business": [
      { title: "Audit the profile", body: "We check categories, contact details, services, photos and the information customers see first." },
      { title: "Make actions clearer", body: "Calls, directions, reviews and website visits are aligned with the right next step." },
      { title: "Keep it accurate", body: "The profile is left clear and practical for the business to keep current after launch." },
    ],
    "website-care": [
      { title: "Protect technical health", body: "Hosting, backups, monitoring and technical updates keep the website dependable." },
      { title: "Handle routine changes", body: "Small content updates stay simple, from opening hours to text and image changes." },
      { title: "Scope larger work clearly", body: "New pages, redesigns and integrations are discussed separately before work begins." },
    ],
    analytics: [
      { title: "Choose meaningful actions", body: "We identify the calls, forms, bookings and journeys that show real customer intent." },
      { title: "Connect the signals", body: "Analytics and tracking are set up around those actions, with reporting that stays useful." },
      { title: "Use the evidence", body: "The resulting data helps guide future website or marketing decisions." },
    ],
    "conversion-design": [
      { title: "Clarify the decision", body: "We identify what visitors need to understand before they are ready to act." },
      { title: "Design the path", body: "Content hierarchy, reassurance and calls to action are shaped around the right journey." },
      { title: "Improve with intent", body: "The path can then be refined using the actions visitors actually take." },
    ],
    automation: [
      { title: "Map the handover", body: "We find the repeated step between an enquiry, booking or form and the team that handles it." },
      { title: "Build only what helps", body: "One practical workflow is scoped around the tools and process the business already uses." },
      { title: "Keep ownership clear", body: "The workflow is tested and explained so the team can understand and manage it." },
    ],
  } as Record<string, ServiceApproach>,
  // Where "What is included" would overpromise: not every package includes every item, and
  // Local SEO separates the foundations built into a project from the optional ongoing service.
  includedHeadings: {
    "web-design": { eyebrow: "Websites can include", title: "A complete service, focused on the parts that create value." },
    "local-seo": { eyebrow: "Local SEO foundations", title: "Set up during your website project." },
  } as Record<string, { eyebrow: string; title: string }>,
  defaultIncludedHeading: { eyebrow: "What is included", title: "A complete service, focused on the parts that create value." },
  // Optional monthly work that sits outside the website project, shown near the bottom of the page.
  ongoingServices: {
    "local-seo": {
      eyebrow: "Optional monthly service",
      title: "Ongoing Local SEO",
      intro: "Local SEO foundations are part of the website project. If you want search visibility worked on after launch, Ongoing Local SEO is available as a separate monthly service, quoted for your business.",
      items: [
        { label: "Monitoring & competitors", body: "Regular checks on search visibility and on what local competitors are doing." },
        { label: "Content planning", body: "New service, location and FAQ content planned around the searches that bring enquiries." },
        { label: "Google Business & improvements", body: "Continued profile optimisation and steady improvements as search behaviour changes." },
      ],
      cta: "Ask about Ongoing Local SEO",
      href: "/contact?service=Local+SEO",
    },
  } as Record<string, OngoingService>,
  // The part of each headline set in the accent serif, as on the other lit heroes.
  headlineAccents: {
    "web-design": "and turn it into business.",
    "local-seo": "are actively searching.",
    "google-business": "work harder.",
    "website-care": "fast, secure and up to date.",
    analytics: "Actions are more useful.",
    "conversion-design": "from interest to action.",
    automation: "where they make sense.",
  } as Record<string, string>,
  sections: { overview: "Overview", included: "Included", details: "Details", outcome: "Outcome", approach: "Approach", ongoing: "Ongoing" },
  outcome: "The outcome",
  howWeWork: "How we work",
  stepsLead: "Three steps,",
  stepsAccent: "no surprises.",
  breadcrumbServices: "Services",
};

const el: typeof en = {
  serviceDetails: {
    "web-design": {
      eyebrow: "Πώς είναι το έργο στην πράξη",
      title: "Μια ιστοσελίδα σχεδιασμένη γύρω από την επιχείρηση, όχι ένα template.",
      intro: "Ο τελικός αριθμός σελίδων, το περιεχόμενο και οι διασυνδέσεις συμφωνούνται μετά τη φάση ανακάλυψης. Αυτά είναι τα πρακτικά ζητήματα που ορίζουμε πριν ξεκινήσει ο σχεδιασμός.",
      items: [
        { label: "Ενδεικτικό χρονοδιάγραμμα", body: "Μια στοχευμένη ιστοσελίδα για μικρή επιχείρηση χρειάζεται συνήθως 4 έως 8 εβδομάδες, αφού είναι διαθέσιμα το περιεχόμενο και τα σχόλιά σας." },
        { label: "Εύρος σελίδων", body: "Τα περισσότερα έργα ξεκινούν με 4 έως 12 βασικές σελίδες για υπηρεσίες, αξιοπιστία, επικοινωνία και μετατροπές." },
        { label: "Διασυνδέσεις", body: "Κλήσεις, WhatsApp, φόρμες, εργαλεία κρατήσεων, χάρτες και analytics επιλέγονται με βάση τη διαδρομή του πελάτη." },
      ],
    },
    "google-business": {
      eyebrow: "Λίστα ελέγχου προφίλ",
      title: "Οι μικρές λεπτομέρειες του προφίλ διαμορφώνουν την πρώτη τοπική εντύπωση.",
      intro: "Ένα δυνατό Google Business Profile κάνει πιο εύκολο για τους πελάτες της περιοχής να εμπιστευτούν την επιχείρηση και να προχωρήσουν, πριν καν φτάσουν στην ιστοσελίδα.",
      items: [
        { label: "Σωστές βάσεις", body: "Σωστή κατηγορία, ωράριο, στοιχεία επικοινωνίας, περιοχή εξυπηρέτησης και σύνδεσμος ιστοσελίδας." },
        { label: "Χρήσιμες πληροφορίες", body: "Ξεκάθαρες υπηρεσίες, περιγραφές, φωτογραφίες και απαντήσεις στις ερωτήσεις που κάνουν πρώτα οι πελάτες." },
        { label: "Ένα ξεκάθαρο επόμενο βήμα", body: "Ένα προφίλ ευθυγραμμισμένο με κλήσεις, οδηγίες, επισκέψεις στην ιστοσελίδα, κριτικές και αιτήματα." },
      ],
    },
    analytics: {
      eyebrow: "Τι μετράμε",
      title: "Μετρήστε τις ενέργειες που δείχνουν πραγματική πρόθεση.",
      intro: "Η επισκεψιμότητα από μόνη της δεν δείχνει αν η ιστοσελίδα βοηθά την επιχείρηση. Ρυθμίζουμε τη μέτρηση γύρω από τα σήματα των πελατών που μετράνε μετά από μια επίσκεψη.",
      items: [
        { label: "Κλήσεις & WhatsApp", body: "Δείτε πότε οι επισκέπτες επιλέγουν να μιλήσουν απευθείας μαζί σας μέσα από την ιστοσελίδα." },
        { label: "Φόρμες & κρατήσεις", body: "Μετρήστε τα αιτήματα που υποβάλλονται και τα κλικ που ξεκινούν ένα ραντεβού ή μια κράτηση." },
        { label: "Πηγή καμπάνιας", body: "Καταλάβετε ποια αναζήτηση, ποιο κανάλι social ή ποια καμπάνια οδήγησε σε μια ενέργεια." },
      ],
    },
    "conversion-design": {
      eyebrow: "Διαδρομές πελατών",
      title: "Η σωστή ενέργεια εξαρτάται από την επιχείρηση.",
      intro: "Ο σχεδιασμός για μετατροπές σημαίνει να επιλέγουμε την πιο χρήσιμη ενέργεια για τον τρόπο που αποφασίζουν οι πελάτες σας, αντί να βάζουμε το ίδιο κουμπί σε κάθε σελίδα.",
      items: [
        { label: "Κλήσεις & WhatsApp", body: "Για τοπικές υπηρεσίες, όπου μια γρήγορη συζήτηση είναι ο πιο εύκολος δρόμος." },
        { label: "Κρατήσεις", body: "Για συμβουλευτικές συναντήσεις, θεραπείες, μαθήματα και ραντεβού, όπου μετράει η διαθεσιμότητα." },
        { label: "Αιτήματα & προσφορές", body: "Για μελετημένες αγορές, έργα και υπηρεσίες που χρειάζονται πληροφορίες πριν από μια απάντηση." },
      ],
    },
    "website-care": {
      eyebrow: "Τι καλύπτει το Care",
      title: "Οι τακτικές εργασίες της ιστοσελίδας γίνονται με συνέπεια και φροντίδα.",
      intro: "Το Website Care καλύπτει την τεχνική υγεία της ιστοσελίδας και τις μικρές μηνιαίες αλλαγές. Οι μεγαλύτερες βελτιώσεις κοστολογούνται ξεχωριστά, ώστε να μην υπάρχουν εκπλήξεις.",
      items: [
        { label: "Μικρές αλλαγές", body: "Κείμενα, εικόνες, στοιχεία επικοινωνίας, ωράριο και μικρές προσαρμογές περιεχομένου." },
        { label: "Τεχνική φροντίδα", body: "Hosting, αντίγραφα ασφαλείας, παρακολούθηση, ενημερώσεις και τακτικοί έλεγχοι φορμών και απόδοσης." },
        { label: "Κοστολογούνται ξεχωριστά", body: "Νέες σελίδες, επανασχεδιασμοί, διασυνδέσεις, εξειδικευμένες λειτουργίες και μεγάλες μεταφορτώσεις περιεχομένου." },
      ],
    },
    automation: {
      eyebrow: "Πότε βοηθά η αυτοματοποίηση",
      title: "Αφαιρέστε τα επαναλαμβανόμενα βήματα χωρίς να περιπλέξετε την επιχείρηση.",
      intro: "Η αυτοματοποίηση προστίθεται μόνο όταν κάνει πιο ξεκάθαρη μια διαδικασία follow-up, κράτησης ή παράδοσης για την ομάδα και τον πελάτη.",
      items: [
        { label: "Παράδοση αιτημάτων", body: "Ένα αίτημα από την ιστοσελίδα πηγαίνει στο σωστό inbox, στο CRM ή στην εσωτερική σας ροή." },
        { label: "Follow-up κρατήσεων", body: "Συνδέστε επιβεβαιώσεις κρατήσεων και χρήσιμα επόμενα βήματα μετά το κλείσιμο ενός ραντεβού." },
        { label: "Απλή από τη σχεδίαση", body: "Η ροή μένει εύκολη στην κατανόηση, στη διαχείριση και στην αλλαγή καθώς μεγαλώνει η επιχείρηση." },
      ],
    },
  },
  serviceCtas: {
    "web-design": "Ζητήστε δωρεάν αξιολόγηση",
    "local-seo": "Ελέγξτε την τοπική μου ορατότητα",
    "google-business": "Ελέγξτε το προφίλ μου στο Google",
    "website-care": "Ελέγξτε την υγεία της ιστοσελίδας μου",
    analytics: "Ελέγξτε τι πρέπει να μετράω",
    "conversion-design": "Ελέγξτε τη διαδρομή μετατροπής μου",
  },
  defaultCta: "Ζητήστε δωρεάν αξιολόγηση",
  customCta: "Συζητήστε μια εξειδικευμένη λύση",
  serviceApproaches: {
    "web-design": [
      { title: "Ορίζουμε τη βάση", body: "Συμφωνούμε τις σελίδες, τις προτεραιότητες του περιεχομένου και τις διασυνδέσεις πριν ξεκινήσει ο οπτικός σχεδιασμός." },
      { title: "Σχεδιάζουμε για αποφάσεις", body: "Η δομή, τα μηνύματα και τα στοιχεία εμπιστοσύνης διαμορφώνονται γύρω από την ενέργεια που πρέπει να κάνει κάθε επισκέπτης." },
      { title: "Κατασκευή και λανσάρισμα", body: "Η ιστοσελίδα αναπτύσσεται responsive, δοκιμάζεται και ετοιμάζεται για ένα σίγουρο λανσάρισμα." },
    ],
    "local-seo": [
      { title: "Κατανοούμε την τοπική ζήτηση", body: "Εξετάζουμε τις υπηρεσίες, τις περιοχές και τις αναζητήσεις που μετράνε περισσότερο για την επιχείρηση." },
      { title: "Ενσωματώνουμε τοπικά σήματα", body: "Ρυθμίζουμε τα τεχνικά σήματα, το περιεχόμενο και τα σήματα τοποθεσίας που χρειάζονται οι μηχανές αναζήτησης για να κατανοήσουν την επιχείρηση." },
      { title: "Έτοιμη για τις αναζητήσεις", body: "Πριν από το λανσάρισμα συνδέουμε το Search Console, υποβάλλουμε το sitemap και ελέγχουμε ότι κάθε σελίδα μπορεί να μπει στο ευρετήριο." },
    ],
    "google-business": [
      { title: "Ελέγχουμε το προφίλ", body: "Εξετάζουμε κατηγορίες, στοιχεία επικοινωνίας, υπηρεσίες, φωτογραφίες και τις πληροφορίες που βλέπουν πρώτα οι πελάτες." },
      { title: "Κάνουμε τις ενέργειες πιο ξεκάθαρες", body: "Κλήσεις, οδηγίες, κριτικές και επισκέψεις στην ιστοσελίδα ευθυγραμμίζονται με το σωστό επόμενο βήμα." },
      { title: "Το κρατάμε ακριβές", body: "Το προφίλ μένει ξεκάθαρο και πρακτικό, ώστε η επιχείρηση να το διατηρεί ενημερωμένο μετά το λανσάρισμα." },
    ],
    "website-care": [
      { title: "Προστατεύουμε την τεχνική υγεία", body: "Hosting, αντίγραφα ασφαλείας, παρακολούθηση και τεχνικές ενημερώσεις κρατούν την ιστοσελίδα αξιόπιστη." },
      { title: "Αναλαμβάνουμε τις τακτικές αλλαγές", body: "Οι μικρές αλλαγές περιεχομένου μένουν απλές, από το ωράριο μέχρι κείμενα και εικόνες." },
      { title: "Ξεκάθαρο εύρος για τις μεγαλύτερες εργασίες", body: "Νέες σελίδες, επανασχεδιασμοί και διασυνδέσεις συζητούνται ξεχωριστά πριν ξεκινήσει η δουλειά." },
    ],
    analytics: [
      { title: "Επιλέγουμε τις ενέργειες που μετράνε", body: "Εντοπίζουμε τις κλήσεις, τις φόρμες, τις κρατήσεις και τις διαδρομές που δείχνουν πραγματική πρόθεση πελάτη." },
      { title: "Συνδέουμε τα σήματα", body: "Τα analytics και η μέτρηση ρυθμίζονται γύρω από αυτές τις ενέργειες, με αναφορές που μένουν χρήσιμες." },
      { title: "Αξιοποιούμε τα στοιχεία", body: "Τα δεδομένα που προκύπτουν καθοδηγούν τις επόμενες αποφάσεις για την ιστοσελίδα ή το marketing." },
    ],
    "conversion-design": [
      { title: "Ξεκαθαρίζουμε την απόφαση", body: "Εντοπίζουμε τι πρέπει να καταλάβουν οι επισκέπτες πριν είναι έτοιμοι να προχωρήσουν." },
      { title: "Σχεδιάζουμε τη διαδρομή", body: "Η ιεράρχηση του περιεχομένου, η διαβεβαίωση και τα calls to action διαμορφώνονται γύρω από τη σωστή διαδρομή." },
      { title: "Βελτιώνουμε με σκοπό", body: "Η διαδρομή μπορεί στη συνέχεια να βελτιωθεί με βάση τις ενέργειες που πραγματικά κάνουν οι επισκέπτες." },
    ],
    automation: [
      { title: "Χαρτογραφούμε την παράδοση", body: "Βρίσκουμε το επαναλαμβανόμενο βήμα ανάμεσα σε ένα αίτημα, μια κράτηση ή μια φόρμα και την ομάδα που το διαχειρίζεται." },
      { title: "Χτίζουμε μόνο ό,τι βοηθά", body: "Μια πρακτική ροή σχεδιάζεται γύρω από τα εργαλεία και τη διαδικασία που ήδη χρησιμοποιεί η επιχείρηση." },
      { title: "Ξεκάθαρη διαχείριση", body: "Η ροή δοκιμάζεται και εξηγείται, ώστε η ομάδα να την καταλαβαίνει και να τη διαχειρίζεται." },
    ],
  },
  includedHeadings: {
    "web-design": { eyebrow: "Μια ιστοσελίδα μπορεί να περιλαμβάνει", title: "Μια ολοκληρωμένη υπηρεσία, εστιασμένη σε ό,τι δημιουργεί αξία." },
    "local-seo": { eyebrow: "Βάσεις τοπικού SEO", title: "Στήνονται κατά την κατασκευή της ιστοσελίδας σας." },
  },
  defaultIncludedHeading: { eyebrow: "Τι περιλαμβάνεται", title: "Μια ολοκληρωμένη υπηρεσία, εστιασμένη σε ό,τι δημιουργεί αξία." },
  ongoingServices: {
    "local-seo": {
      eyebrow: "Προαιρετική μηνιαία υπηρεσία",
      title: "Συνεχές Τοπικό SEO",
      intro: "Οι βάσεις του τοπικού SEO είναι μέρος της κατασκευής της ιστοσελίδας. Αν θέλετε να συνεχίσουμε να δουλεύουμε την ορατότητά σας στις αναζητήσεις μετά το λανσάρισμα, το Συνεχές Τοπικό SEO διατίθεται ως ξεχωριστή μηνιαία υπηρεσία, με προσφορά για τη δική σας επιχείρηση.",
      items: [
        { label: "Παρακολούθηση & ανταγωνισμός", body: "Τακτικοί έλεγχοι της ορατότητας στις αναζητήσεις και του τι κάνουν οι τοπικοί ανταγωνιστές." },
        { label: "Σχεδιασμός περιεχομένου", body: "Νέο περιεχόμενο για υπηρεσίες, περιοχές και συχνές ερωτήσεις, γύρω από τις αναζητήσεις που φέρνουν αιτήματα." },
        { label: "Google Business & βελτιώσεις", body: "Συνεχής βελτιστοποίηση του προφίλ και σταθερές βελτιώσεις καθώς αλλάζει η συμπεριφορά αναζήτησης." },
      ],
      cta: "Ρωτήστε για το Συνεχές Τοπικό SEO",
      href: "/contact?service=Local+SEO",
    },
  },
  headlineAccents: {
    "web-design": "τη μετατρέπει σε δουλειά.",
    "local-seo": "ψάχνουν ενεργά.",
    "google-business": "να δουλεύει περισσότερο για εσάς.",
    "website-care": "γρήγορη, ασφαλής και ενημερωμένη.",
    analytics: "Οι ενέργειες είναι πιο χρήσιμες.",
    "conversion-design": "από το ενδιαφέρον στην ενέργεια.",
    automation: "εκεί που έχουν νόημα.",
  },
  sections: { overview: "Επισκόπηση", included: "Περιλαμβάνει", details: "Λεπτομέρειες", outcome: "Αποτέλεσμα", approach: "Προσέγγιση", ongoing: "Συνέχεια" },
  outcome: "Το αποτέλεσμα",
  howWeWork: "Πώς δουλεύουμε",
  stepsLead: "Τρία βήματα,",
  stepsAccent: "χωρίς εκπλήξεις.",
  breadcrumbServices: "Υπηρεσίες",
};

const copy = { en, el };

function getService(locale: Locale, slug: string) {
  return [...getServices(locale), ...getCustomCapabilities(locale)].find((item) => item.slug === slug);
}

export function serviceMetadata(locale: Locale, slug: string) {
  const service = getService(locale, slug);
  if (!service) return {};
  // Search titles add the location people search with; the on-page headings stay short.
  return pageMetadata({ locale, path: `/services/${service.slug}`, title: service.seoTitle, description: service.seoDescription });
}

/** Renders the service page, or returns null for an unknown slug so the route can 404. */
export function ServiceDetailView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = copy[locale];
  const service = getService(locale, slug);
  if (!service) return null;
  const path = (href: string) => localizePath(locale, href);
  const Icon = service.icon;
  const custom = service.slug === "automation";
  const detail = t.serviceDetails[service.slug];
  const ctaLabel = custom ? t.customCta : t.serviceCtas[service.slug] ?? t.defaultCta;
  const approach = t.serviceApproaches[service.slug];
  const included = t.includedHeadings[service.slug] ?? t.defaultIncludedHeading;
  const ongoing = t.ongoingServices[service.slug];
  // The side rail lists only the sections this page actually has, in page order.
  const progressSections = [
    { id: "service-overview", label: t.sections.overview },
    { id: "service-included", label: t.sections.included },
    ...(detail ? [{ id: "service-detail", label: t.sections.details }] : []),
    { id: "service-outcome", label: t.sections.outcome },
    { id: "service-approach", label: t.sections.approach },
    ...(ongoing ? [{ id: "service-ongoing", label: t.sections.ongoing }] : []),
  ];
  const accent = t.headlineAccents[service.slug];
  const lead = accent && service.headline.endsWith(accent) ? service.headline.slice(0, -accent.length).trim() : service.headline;
  const url = `${siteConfig.url}${path(`/services/${service.slug}`)}`;
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: service.title, description: service.short, provider: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: "VISION.", url: siteConfig.url }, areaServed: { "@type": "Country", name: "Cyprus" }, url, ...(locale === "en" ? {} : { inLanguage: locale }) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t.breadcrumbServices, item: `${siteConfig.url}${path("/services")}` }, { "@type": "ListItem", position: 2, name: service.title, item: url }] },
  ] };
  return (
    <main className="motion-page service-motion-page"><PageMotion /><ServiceProgress sections={progressSections} label={getDictionary(locale).serviceProgress} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><PageTracker event="service_view" label={getService("en", service.slug)!.title} />
      <section id="service-overview" className="lit-hero service-lit-hero"><div className="site-container lit-hero-grid">
        <div><p className="eyebrow">{service.eyebrow}</p><h1>{accent && lead !== service.headline ? <>{lead} <em>{accent}</em></> : service.headline}</h1><p className="lit-hero-lead">{service.intro}</p><Link className="button button-accent button-large" href={path(custom ? "/contact?service=Lead+%26+Booking+Automation" : "/free-audit")}>{ctaLabel}<ArrowRight /></Link></div>
        <div className="service-emblem" aria-hidden="true">
          <svg viewBox="0 0 100 100"><circle className="service-emblem-ring" cx="50" cy="50" r="47" /><circle className="service-emblem-comet" cx="50" cy="50" r="47" pathLength="100" /><circle className="service-emblem-dash" cx="50" cy="50" r="37" /></svg>
          <div className="service-emblem-core"><Icon /></div>
          <span>{service.title}</span>
        </div>
      </div></section>
      <section id="service-included" className="deliverables-section section-pad"><div className="site-container deliverables-grid">
        <div data-motion="rise"><p className="eyebrow">{included.eyebrow}</p><h2>{included.title}</h2></div>
        <div className="deliverable-list">{service.benefits.map((benefit) => <div data-motion="rise" key={benefit}><Check aria-hidden="true" /><span>{benefit}</span></div>)}</div>
      </div></section>
      {detail && <section id="service-detail" className="service-detail-section section-pad"><div className="site-container"><div className="about-section-head service-detail-head" data-motion="rise"><div><p className="eyebrow">{detail.eyebrow}</p><h2>{detail.title}</h2></div><p>{detail.intro}</p></div><div className="service-detail-grid">{detail.items.map((item, index) => <article data-motion="rise" key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.body}</p></article>)}</div></div></section>}
      <section id="service-outcome" className="result-section"><div className="site-container" data-motion="rise"><p className="eyebrow">{t.outcome}</p><blockquote>{service.result}</blockquote></div></section>
      <section id="service-approach" className="service-note"><header className="site-container service-note-head" data-motion="rise"><p className="eyebrow">{t.howWeWork}</p><h2>{t.stepsLead} <em>{t.stepsAccent}</em></h2></header><div className="site-container">{approach.map((step, index) => <div data-motion="rise" key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{step.title}</h2><p>{step.body}</p></div>)}</div></section>
      {ongoing && <section id="service-ongoing" className="service-detail-section section-pad"><div className="site-container"><div className="about-section-head service-detail-head" data-motion="rise"><div><p className="eyebrow">{ongoing.eyebrow}</p><h2>{ongoing.title}</h2></div><p>{ongoing.intro}</p></div><div className="service-detail-grid">{ongoing.items.map((item, index) => <article data-motion="rise" key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.body}</p></article>)}</div><Link className="text-link service-ongoing-link" href={path(ongoing.href)} data-motion="rise">{ongoing.cta} <ArrowRight aria-hidden="true" /></Link></div></section>}
    </main>
  );
}
