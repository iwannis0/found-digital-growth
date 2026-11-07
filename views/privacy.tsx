import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const privacyEmail = siteConfig.email;
const email = <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>;

const meta = {
  en: { title: "Privacy Policy", description: "How VISION. collects, uses and protects personal information sent through this website, including contact and audit requests, analytics consent and your rights." },
  el: { title: "Πολιτική Απορρήτου", description: "Πώς η VISION. συλλέγει, χρησιμοποιεί και προστατεύει τις προσωπικές πληροφορίες που αποστέλλονται μέσω της ιστοσελίδας, όπως αιτήματα επικοινωνίας και αξιολόγησης, συγκατάθεση για analytics και τα δικαιώματά σας." },
};

const hero: Record<Locale, { eyebrow: string; title: string; intro: string }> = {
  en: { eyebrow: "Legal", title: "Privacy Policy", intro: "This policy explains how VISION. may collect and use personal information when you use this website or communicate with us." },
  el: { eyebrow: "Νομικά", title: "Πολιτική Απορρήτου", intro: "Η παρούσα πολιτική εξηγεί πώς η VISION. μπορεί να συλλέγει και να χρησιμοποιεί προσωπικές πληροφορίες όταν χρησιμοποιείτε αυτή την ιστοσελίδα ή επικοινωνείτε μαζί μας." },
};

const body: Record<Locale, ReactNode> = {
  en: <>
    <section><h2>1. Introduction</h2><p>VISION., based in Cyprus, may collect and process personal information when you submit the Contact form, request a Free Website Audit, communicate directly with us, or use this website where optional analytics or cookies have been enabled with your consent.</p></section>
    <section><h2>2. Information we may collect</h2><p>Depending on how you interact with VISION., we may collect:</p><ul><li>Your name and business or company name.</li><li>Your email address and phone number.</li><li>Your website address, industry and city or location.</li><li>Your business goals, current problems, message or request details and budget information.</li><li>Information included in a Free Website Audit request and any audit scores or internal follow-up notes created while handling that request.</li><li>Source and campaign attribution, such as UTM parameters, where available.</li><li>Technical, cookie and analytics information where those features are configured and optional analytics consent has been given.</li></ul></section>
    <section><h2>3. How information is used</h2><p>We may use information to respond to enquiries, prepare website audit responses, manage potential client relationships, provide requested services, maintain internal business records, understand website performance where analytics consent is given, and prevent spam, misuse or security abuse.</p></section>
    <section><h2>4. Legal basis</h2><p>Where applicable, information may be processed with your consent, to take steps at your request before entering into a contract, for reasonable business interests such as responding to enquiries and operating the website, or to meet legal obligations. The basis used depends on the information and the reason it is processed.</p></section>
    <section><h2>5. Cookies, analytics and spam protection</h2><p>Essential storage may be used for core website functions and to remember your cookie choice. Optional analytics only starts after consent and only where an analytics service has been configured. You can change your analytics choice through Cookie Settings.</p><p>Where configured, technical spam-protection tools may process limited technical information needed to assess and prevent automated or abusive submissions. We do not describe analytics or spam-protection services as active unless they have been enabled for the website.</p></section>
    <section><h2>6. Third-party services</h2><p>VISION. may use third-party providers for hosting, database services, analytics, email delivery, spam protection or other operational functions. Those providers may process information only where needed to provide their services and remain subject to their own terms and privacy practices.</p></section>
    <section><h2>7. Data retention and security</h2><p>We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, subject to any applicable legal or operational requirements.</p><p>Reasonable technical and organisational measures are used to protect information. No website or online transmission method can guarantee absolute security.</p></section>
    <section><h2>8. Data sharing</h2><p>VISION. does not sell personal information. Information may be shared with service providers where reasonably necessary to operate the website, respond to a request or provide an agreed service. It may also be disclosed where required by applicable law.</p></section>
    <section><h2>9. Your rights</h2><p>Depending on applicable law and the circumstances, you may have rights to request access to your personal information, ask for inaccurate information to be corrected, request deletion or restriction, object to certain processing, and withdraw consent where processing relies on consent.</p><p>Some rights may be subject to legal or operational limits. We may need enough information to verify and respond to a request.</p></section>
    <section><h2>10. Contact</h2><p>For privacy questions or requests, contact VISION. at {email}.</p></section>
  </>,
  el: <>
    <section><h2>1. Εισαγωγή</h2><p>Η VISION., με έδρα την Κύπρο, μπορεί να συλλέγει και να επεξεργάζεται προσωπικές πληροφορίες όταν υποβάλλετε τη φόρμα επικοινωνίας, ζητάτε Δωρεάν Αξιολόγηση Ιστοσελίδας, επικοινωνείτε απευθείας μαζί μας ή χρησιμοποιείτε αυτή την ιστοσελίδα, εφόσον έχουν ενεργοποιηθεί με τη συγκατάθεσή σας προαιρετικά analytics ή cookies.</p></section>
    <section><h2>2. Πληροφορίες που μπορεί να συλλέξουμε</h2><p>Ανάλογα με τον τρόπο που αλληλεπιδράτε με τη VISION., μπορεί να συλλέξουμε:</p><ul><li>Το όνομά σας και την επωνυμία της επιχείρησης ή της εταιρείας σας.</li><li>Τη διεύθυνση email και τον αριθμό τηλεφώνου σας.</li><li>Τη διεύθυνση της ιστοσελίδας σας, τον κλάδο και την πόλη ή την τοποθεσία σας.</li><li>Τους επιχειρηματικούς σας στόχους, τα τρέχοντα προβλήματα, το μήνυμα ή τις λεπτομέρειες του αιτήματός σας και πληροφορίες για τον προϋπολογισμό σας.</li><li>Πληροφορίες που περιλαμβάνονται σε ένα αίτημα Δωρεάν Αξιολόγησης Ιστοσελίδας, καθώς και τυχόν βαθμολογίες αξιολόγησης ή εσωτερικές σημειώσεις παρακολούθησης που δημιουργούνται κατά τη διαχείριση του αιτήματος.</li><li>Πληροφορίες για την πηγή και την καμπάνια από την οποία ήρθατε, όπως παράμετροι UTM, όπου είναι διαθέσιμες.</li><li>Τεχνικές πληροφορίες, πληροφορίες cookies και analytics, όπου αυτές οι λειτουργίες είναι ρυθμισμένες και έχει δοθεί συγκατάθεση για τα προαιρετικά analytics.</li></ul></section>
    <section><h2>3. Πώς χρησιμοποιούνται οι πληροφορίες</h2><p>Μπορεί να χρησιμοποιήσουμε πληροφορίες για να απαντήσουμε σε αιτήματα, να ετοιμάσουμε αξιολογήσεις ιστοσελίδων, να διαχειριστούμε σχέσεις με πιθανούς πελάτες, να παρέχουμε υπηρεσίες που ζητήθηκαν, να τηρούμε εσωτερικά επιχειρηματικά αρχεία, να κατανοούμε την απόδοση της ιστοσελίδας όπου έχει δοθεί συγκατάθεση για analytics, και να αποτρέπουμε spam, κατάχρηση ή παραβιάσεις ασφαλείας.</p></section>
    <section><h2>4. Νομική βάση</h2><p>Όπου ισχύει, οι πληροφορίες μπορεί να υποβάλλονται σε επεξεργασία με τη συγκατάθεσή σας, για τη λήψη μέτρων κατόπιν αιτήματός σας πριν από τη σύναψη σύμβασης, για εύλογα επιχειρηματικά συμφέροντα όπως η απάντηση σε αιτήματα και η λειτουργία της ιστοσελίδας, ή για τη συμμόρφωση με νομικές υποχρεώσεις. Η βάση που χρησιμοποιείται εξαρτάται από τις πληροφορίες και τον λόγο για τον οποίο υποβάλλονται σε επεξεργασία.</p></section>
    <section><h2>5. Cookies, analytics και προστασία από spam</h2><p>Η απαραίτητη αποθήκευση μπορεί να χρησιμοποιείται για τις βασικές λειτουργίες της ιστοσελίδας και για να θυμάται την επιλογή σας για τα cookies. Τα προαιρετικά analytics ξεκινούν μόνο μετά από συγκατάθεση και μόνο όπου έχει ρυθμιστεί υπηρεσία analytics. Μπορείτε να αλλάξετε την επιλογή σας για τα analytics από τις Ρυθμίσεις cookies.</p><p>Όπου έχουν ρυθμιστεί, τεχνικά εργαλεία προστασίας από spam μπορεί να επεξεργάζονται περιορισμένες τεχνικές πληροφορίες που χρειάζονται για την αξιολόγηση και την αποτροπή αυτοματοποιημένων ή καταχρηστικών υποβολών. Δεν περιγράφουμε υπηρεσίες analytics ή προστασίας από spam ως ενεργές, εκτός αν έχουν ενεργοποιηθεί για την ιστοσελίδα.</p></section>
    <section><h2>6. Υπηρεσίες τρίτων</h2><p>Η VISION. μπορεί να χρησιμοποιεί παρόχους τρίτων για hosting, υπηρεσίες βάσεων δεδομένων, analytics, αποστολή email, προστασία από spam ή άλλες λειτουργικές ανάγκες. Οι πάροχοι αυτοί μπορεί να επεξεργάζονται πληροφορίες μόνο όπου χρειάζεται για την παροχή των υπηρεσιών τους και υπόκεινται στους δικούς τους όρους και πρακτικές απορρήτου.</p></section>
    <section><h2>7. Διατήρηση και ασφάλεια δεδομένων</h2><p>Διατηρούμε προσωπικές πληροφορίες μόνο για όσο διάστημα είναι εύλογα απαραίτητο για τον σκοπό για τον οποίο συλλέχθηκαν, με την επιφύλαξη τυχόν ισχυουσών νομικών ή λειτουργικών απαιτήσεων.</p><p>Χρησιμοποιούνται εύλογα τεχνικά και οργανωτικά μέτρα για την προστασία των πληροφοριών. Καμία ιστοσελίδα ή μέθοδος online μετάδοσης δεν μπορεί να εγγυηθεί απόλυτη ασφάλεια.</p></section>
    <section><h2>8. Κοινοποίηση δεδομένων</h2><p>Η VISION. δεν πουλά προσωπικές πληροφορίες. Οι πληροφορίες μπορεί να κοινοποιούνται σε παρόχους υπηρεσιών όπου είναι εύλογα απαραίτητο για τη λειτουργία της ιστοσελίδας, την απάντηση σε ένα αίτημα ή την παροχή μιας συμφωνημένης υπηρεσίας. Μπορεί επίσης να γνωστοποιούνται όπου απαιτείται από την ισχύουσα νομοθεσία.</p></section>
    <section><h2>9. Τα δικαιώματά σας</h2><p>Ανάλογα με την ισχύουσα νομοθεσία και τις περιστάσεις, μπορεί να έχετε το δικαίωμα να ζητήσετε πρόσβαση στις προσωπικές σας πληροφορίες, να ζητήσετε τη διόρθωση ανακριβών πληροφοριών, να ζητήσετε διαγραφή ή περιορισμό, να αντιταχθείτε σε ορισμένες επεξεργασίες και να ανακαλέσετε τη συγκατάθεσή σας όπου η επεξεργασία βασίζεται σε συγκατάθεση.</p><p>Ορισμένα δικαιώματα μπορεί να υπόκεινται σε νομικούς ή λειτουργικούς περιορισμούς. Μπορεί να χρειαστούμε επαρκείς πληροφορίες για να επαληθεύσουμε και να απαντήσουμε σε ένα αίτημα.</p></section>
    <section><h2>10. Επικοινωνία</h2><p>Για ερωτήσεις ή αιτήματα σχετικά με το απόρρητο, επικοινωνήστε με τη VISION. στο {email}.</p></section>
  </>,
};

export function privacyMetadata(locale: Locale) {
  return { ...pageMetadata({ locale, path: "/privacy", title: meta[locale].title, description: meta[locale].description }), robots: { index: true, follow: true } };
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const t = hero[locale];
  return <main>
    <section className="legal-hero"><div className="site-container"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p></div></section>
    <article className="legal-content site-container">{body[locale]}</article>
  </main>;
}
