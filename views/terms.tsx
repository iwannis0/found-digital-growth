import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const termsEmail = siteConfig.email;
const email = <a href={`mailto:${termsEmail}`}>{termsEmail}</a>;

const meta = {
  en: { title: "Terms of Use", description: "The terms for using the VISION. website, with general information about proposals, pricing and payments, Website Care, design revisions and ownership." },
  el: { title: "Όροι Χρήσης", description: "Οι όροι χρήσης της ιστοσελίδας της VISION., με γενικές πληροφορίες για προτάσεις, τιμές και πληρωμές, Website Care, γύρους αλλαγών στον σχεδιασμό και ιδιοκτησία." },
};

const hero: Record<Locale, { eyebrow: string; title: string; intro: string }> = {
  en: { eyebrow: "Legal", title: "Terms of Use", intro: "These terms govern use of the VISION. website and provide general information about engaging with VISION. Individual client work remains subject to its agreed proposal, quotation or project agreement." },
  el: { eyebrow: "Νομικά", title: "Όροι Χρήσης", intro: "Οι παρόντες όροι διέπουν τη χρήση της ιστοσελίδας της VISION. και παρέχουν γενικές πληροφορίες για τη συνεργασία με τη VISION. Κάθε έργο πελάτη εξακολουθεί να διέπεται από τη συμφωνημένη πρόταση, προσφορά ή συμφωνία έργου." },
};

const body: Record<Locale, ReactNode> = {
  en: <>
    <section><h2>1. About these terms</h2><p>By using this website, you agree to use it in accordance with these terms. These website terms do not replace a signed client proposal, quotation or service agreement.</p></section>
    <section><h2>2. Website use</h2><p>You may use this website for lawful purposes. You must not attempt to disrupt its operation, misuse its forms or content, gain unauthorised access, or use it in a way that could harm VISION., its service providers or other users.</p></section>
    <section><h2>3. Services and proposals</h2><p>Website and service descriptions are general information. The exact scope, deliverables, price, timeline, responsibilities and dependencies for client work are agreed separately in writing. Where applicable, the accepted proposal, quotation or project agreement takes precedence for that work.</p></section>
    <section><h2>4. Pricing and payments</h2><p>Public pricing shows the current setup price for the described packages. Unless agreed otherwise in writing, the standard website process requires a 50% deposit to begin and the remaining 50% before launch.</p><p>Website Care is optional after launch where selected. New pages, custom functionality, advanced integrations and other work outside the agreed package are quoted separately. VAT, where applicable, will be confirmed before work begins.</p></section>
    <section><h2>5. Website Care</h2><p>Website Care is optional after launch and is available for businesses that want managed hosting, backups, monitoring, technical support and ongoing minor content updates.</p><p>It has an initial 3-month minimum term. After that, it continues month-to-month and can be cancelled with 30 days’ notice. Included minor updates may cover text changes, image replacements, contact details, opening hours and small content adjustments. Unused maintenance time does not roll over.</p><p>New pages, custom functionality, integrations, redesign work, large content uploads and other work outside the agreed package are quoted separately. If a website is hosted or managed through VISION., available handover or migration options will be explained before the service ends.</p></section>
    <section><h2>6. Design revisions</h2><p>Professional Website Foundation includes 1 design revision round, Custom Growth Website includes 2 design revision rounds, and Advanced Digital Presence includes 3 design revision rounds during the agreed design phase.</p><p>A revision round means one consolidated set of feedback on the current design direction. Additional revision rounds or significant changes outside the agreed scope may be quoted separately.</p></section>
    <section><h2>7. Ownership and domains</h2><p>Once the project has been paid in full, the client owns the final website content and agreed project deliverables. The domain should be registered in the client’s name, and VISION. can assist with setup and management where required.</p><p>Third-party platforms, software, fonts, plugins and services remain subject to their own licences and terms.</p></section>
    <section><h2>8. Third-party services</h2><p>Websites may depend on hosting services, integrations, platforms or other third-party providers. Those services may have their own terms, pricing and availability. VISION. is not responsible for changes, interruptions or outages caused by third-party providers beyond its reasonable control.</p></section>
    <section><h2>9. Results and responsibilities</h2><p>Digital, SEO, advertising and marketing outcomes cannot be guaranteed. Search platforms, customer behaviour and third-party systems can change. Specific responsibilities, warranties and reasonable limitations for paid client work should be set out in the relevant project or service agreement.</p></section>
    <section><h2>10. Changes to these terms</h2><p>These terms may be updated as the website and service offering develop. The version available on this page applies to website use from the time it is published.</p></section>
    <section><h2>11. Contact</h2><p>Questions about these terms can be sent to {email}.</p></section>
  </>,
  el: <>
    <section><h2>1. Σχετικά με τους όρους</h2><p>Χρησιμοποιώντας αυτή την ιστοσελίδα, συμφωνείτε να τη χρησιμοποιείτε σύμφωνα με τους παρόντες όρους. Οι όροι της ιστοσελίδας δεν αντικαθιστούν μια υπογεγραμμένη πρόταση, προσφορά ή συμφωνία παροχής υπηρεσιών.</p></section>
    <section><h2>2. Χρήση της ιστοσελίδας</h2><p>Μπορείτε να χρησιμοποιείτε αυτή την ιστοσελίδα για νόμιμους σκοπούς. Δεν επιτρέπεται να επιχειρήσετε να διαταράξετε τη λειτουργία της, να κάνετε κατάχρηση των φορμών ή του περιεχομένου της, να αποκτήσετε μη εξουσιοδοτημένη πρόσβαση ή να τη χρησιμοποιήσετε με τρόπο που θα μπορούσε να βλάψει τη VISION., τους παρόχους υπηρεσιών της ή άλλους χρήστες.</p></section>
    <section><h2>3. Υπηρεσίες και προτάσεις</h2><p>Οι περιγραφές της ιστοσελίδας και των υπηρεσιών αποτελούν γενικές πληροφορίες. Το ακριβές εύρος, τα παραδοτέα, η τιμή, το χρονοδιάγραμμα, οι υποχρεώσεις και οι εξαρτήσεις κάθε έργου πελάτη συμφωνούνται ξεχωριστά και γραπτώς. Όπου ισχύει, η αποδεκτή πρόταση, προσφορά ή συμφωνία έργου υπερισχύει για το συγκεκριμένο έργο.</p></section>
    <section><h2>4. Τιμές και πληρωμές</h2><p>Οι δημοσιευμένες τιμές δείχνουν την τρέχουσα τιμή κατασκευής για τα πακέτα που περιγράφονται. Εκτός αν συμφωνηθεί διαφορετικά γραπτώς, η συνήθης διαδικασία για μια ιστοσελίδα απαιτεί προκαταβολή 50% για να ξεκινήσει το έργο και το υπόλοιπο 50% πριν από το λανσάρισμα.</p><p>Το Website Care είναι προαιρετικό μετά το λανσάρισμα, όπου επιλεγεί. Νέες σελίδες, εξειδικευμένες λειτουργίες, προηγμένες διασυνδέσεις και άλλες εργασίες εκτός του συμφωνημένου πακέτου κοστολογούνται ξεχωριστά. Ο ΦΠΑ, όπου ισχύει, θα επιβεβαιώνεται πριν ξεκινήσει η δουλειά.</p></section>
    <section><h2>5. Website Care</h2><p>Το Website Care είναι προαιρετικό μετά το λανσάρισμα και απευθύνεται σε επιχειρήσεις που θέλουν διαχειριζόμενο hosting, αντίγραφα ασφαλείας, παρακολούθηση, τεχνική υποστήριξη και συνεχείς μικρές αλλαγές περιεχομένου.</p><p>Έχει αρχική ελάχιστη διάρκεια 3 μηνών. Στη συνέχεια ανανεώνεται ανά μήνα και μπορεί να διακοπεί με ειδοποίηση 30 ημερών. Οι μικρές αλλαγές που περιλαμβάνονται μπορεί να καλύπτουν αλλαγές κειμένων, αντικατάσταση εικόνων, στοιχεία επικοινωνίας, ωράριο και μικρές προσαρμογές περιεχομένου. Ο χρόνος συντήρησης που δεν χρησιμοποιείται δεν μεταφέρεται.</p><p>Νέες σελίδες, εξειδικευμένες λειτουργίες, διασυνδέσεις, επανασχεδιασμός, μεγάλες μεταφορτώσεις περιεχομένου και άλλες εργασίες εκτός του συμφωνημένου πακέτου κοστολογούνται ξεχωριστά. Αν μια ιστοσελίδα φιλοξενείται ή διαχειρίζεται μέσω της VISION., οι διαθέσιμες επιλογές παράδοσης ή μεταφοράς θα εξηγούνται πριν από τη λήξη της υπηρεσίας.</p></section>
    <section><h2>6. Γύροι αλλαγών στον σχεδιασμό</h2><p>Το Professional Website Foundation περιλαμβάνει 1 γύρο αλλαγών στον σχεδιασμό, το Custom Growth Website 2 γύρους και το Advanced Digital Presence 3 γύρους, κατά τη συμφωνημένη φάση σχεδιασμού.</p><p>Ως γύρος αλλαγών νοείται ένα ενιαίο σύνολο σχολίων πάνω στην τρέχουσα σχεδιαστική κατεύθυνση. Επιπλέον γύροι ή σημαντικές αλλαγές εκτός του συμφωνημένου εύρους μπορεί να κοστολογηθούν ξεχωριστά.</p></section>
    <section><h2>7. Ιδιοκτησία και domains</h2><p>Μόλις εξοφληθεί πλήρως το έργο, ο πελάτης έχει την κυριότητα του τελικού περιεχομένου της ιστοσελίδας και των συμφωνημένων παραδοτέων. Το domain πρέπει να είναι καταχωρημένο στο όνομα του πελάτη, και η VISION. μπορεί να βοηθήσει με τη ρύθμιση και τη διαχείρισή του όπου χρειάζεται.</p><p>Πλατφόρμες, λογισμικό, γραμματοσειρές, plugins και υπηρεσίες τρίτων παραμένουν υπό τις δικές τους άδειες και όρους.</p></section>
    <section><h2>8. Υπηρεσίες τρίτων</h2><p>Οι ιστοσελίδες μπορεί να βασίζονται σε υπηρεσίες hosting, διασυνδέσεις, πλατφόρμες ή άλλους παρόχους τρίτων. Οι υπηρεσίες αυτές μπορεί να έχουν τους δικούς τους όρους, τιμές και διαθεσιμότητα. Η VISION. δεν ευθύνεται για αλλαγές, διακοπές ή βλάβες που προκαλούνται από παρόχους τρίτων και βρίσκονται εκτός του εύλογου ελέγχου της.</p></section>
    <section><h2>9. Αποτελέσματα και ευθύνες</h2><p>Τα αποτελέσματα στο ψηφιακό marketing, στο SEO, στη διαφήμιση και στην προώθηση δεν μπορούν να είναι εγγυημένα. Οι πλατφόρμες αναζήτησης, η συμπεριφορά των πελατών και τα συστήματα τρίτων μπορούν να αλλάξουν. Συγκεκριμένες ευθύνες, εγγυήσεις και εύλογοι περιορισμοί για εργασίες επί πληρωμή πρέπει να ορίζονται στη σχετική συμφωνία έργου ή παροχής υπηρεσιών.</p></section>
    <section><h2>10. Αλλαγές στους όρους</h2><p>Οι παρόντες όροι μπορεί να ενημερώνονται καθώς εξελίσσονται η ιστοσελίδα και οι υπηρεσίες. Η εκδοχή που είναι διαθέσιμη σε αυτή τη σελίδα ισχύει για τη χρήση της ιστοσελίδας από τη στιγμή της δημοσίευσής της.</p></section>
    <section><h2>11. Επικοινωνία</h2><p>Ερωτήσεις σχετικά με τους παρόντες όρους μπορούν να αποστέλλονται στο {email}.</p></section>
  </>,
};

export function termsMetadata(locale: Locale) {
  return pageMetadata({ locale, path: "/terms", title: meta[locale].title, description: meta[locale].description });
}

export function TermsView({ locale }: { locale: Locale }) {
  const t = hero[locale];
  return <main>
    <section className="legal-hero"><div className="site-container"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p></div></section>
    <article className="legal-content site-container">{body[locale]}</article>
  </main>;
}
