import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { PageMotion } from "@/components/page-motion";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const en = {
  metaTitle: "Book a Call with VISION.",
  metaDescription: "Pick a day and time that suits you and talk to VISION. about your website: Microsoft Teams, Zoom, Google Meet or a phone call. Free, with no obligation.",
  // Keep in step with the meeting types offered in the booking form.
  meetingTypes: [
    ["Microsoft Teams", "Video call, link in your confirmation"],
    ["Zoom", "Video call, link in your confirmation"],
    ["Google Meet", "Video call, link in your confirmation"],
    ["Phone call", "We call the number you give us"],
  ] as [string, string][],
  callSteps: [
    ["Pick a day and time", "Any weekday, 17:00 to 22:00 Cyprus time, or suggest a time of your own."],
    ["Choose how we meet", "Teams, Zoom, Google Meet or a phone call."],
    ["We confirm with you", "By email or phone, with the meeting link or the number we will call. If the slot is taken, we suggest the nearest free one."],
  ] as [string, string][],
  eyebrow: "Book a call",
  titleLead: "Talk it through,",
  titleAccent: "your way.",
  lead: "Pick a day and time that suits you and choose how we meet. We confirm it with you, then we talk about the business and what the website should do next.",
  heroCta: "Choose a time",
  deliverable: "Free, with no obligation.",
  panelLabel: "Ways to meet",
  panelHead: "How we meet",
  panelChoice: "Your choice",
  yourCost: "Your cost",
  stepsEyebrow: "How it works",
  stepsTitle: "Three steps, about a minute.",
  altBefore: "Prefer something in writing? Get a",
  altAudit: "free website audit",
  altBetween: "or a",
  altPrototype: "free prototype",
  altAfter: ".",
};

const el: typeof en = {
  metaTitle: "Κλείστε μια Κλήση με τη VISION.",
  metaDescription: "Διαλέξτε την ημέρα και την ώρα που σας εξυπηρετεί και μιλήστε με τη VISION. για την ιστοσελίδα σας: Microsoft Teams, Zoom, Google Meet ή τηλέφωνο. Δωρεάν και χωρίς καμία δέσμευση.",
  meetingTypes: [
    ["Microsoft Teams", "Βιντεοκλήση, με τον σύνδεσμο στην επιβεβαίωση"],
    ["Zoom", "Βιντεοκλήση, με τον σύνδεσμο στην επιβεβαίωση"],
    ["Google Meet", "Βιντεοκλήση, με τον σύνδεσμο στην επιβεβαίωση"],
    ["Τηλεφωνική κλήση", "Σας καλούμε στον αριθμό που μας δίνετε"],
  ],
  callSteps: [
    ["Διαλέξτε ημέρα και ώρα", "Οποιαδήποτε καθημερινή, 17:00 με 22:00 ώρα Κύπρου, ή προτείνετε τη δική σας ώρα."],
    ["Επιλέξτε πώς θα μιλήσουμε", "Teams, Zoom, Google Meet ή τηλέφωνο."],
    ["Επιβεβαιώνουμε μαζί σας", "Με email ή τηλέφωνο, με τον σύνδεσμο της συνάντησης ή τον αριθμό που θα καλέσουμε. Αν η ώρα δεν είναι διαθέσιμη, σας προτείνουμε την πιο κοντινή ελεύθερη."],
  ],
  eyebrow: "Κλείστε μια κλήση",
  titleLead: "Ας το συζητήσουμε,",
  titleAccent: "όπως σας βολεύει.",
  lead: "Διαλέξτε την ημέρα και την ώρα που σας εξυπηρετεί και επιλέξτε πώς θα μιλήσουμε. Την επιβεβαιώνουμε μαζί σας και μετά συζητάμε για την επιχείρησή σας και για το τι πρέπει να κάνει στη συνέχεια η ιστοσελίδα.",
  heroCta: "Διαλέξτε ώρα",
  deliverable: "Δωρεάν και χωρίς καμία δέσμευση.",
  panelLabel: "Τρόποι επικοινωνίας",
  panelHead: "Πώς θα μιλήσουμε",
  panelChoice: "Επιλέγετε εσείς",
  yourCost: "Το κόστος σας",
  stepsEyebrow: "Πώς λειτουργεί",
  stepsTitle: "Τρία βήματα, περίπου ένα λεπτό.",
  altBefore: "Προτιμάτε κάτι γραπτό; Ζητήστε μια",
  altAudit: "δωρεάν αξιολόγηση ιστοσελίδας",
  altBetween: "ή ένα",
  altPrototype: "δωρεάν πρωτότυπο",
  altAfter: ".",
};

const copy = { en, el };

export function bookMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/book", title: t.metaTitle, description: t.metaDescription });
}

export function BookView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const dictionary = getDictionary(locale);

  return (
    <main className="book-page motion-page">
      <PageMotion />

      <section className="lit-hero audit-lit-hero">
        <div className="site-container lit-hero-grid">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.titleLead} <em>{t.titleAccent}</em></h1>
            <p className="lit-hero-lead">{t.lead}</p>
            <a className="button button-accent button-large prototype-hero-cta" href="#book-call" data-track="book_cta_click" data-track-location="book_hero">
              {t.heroCta} <ArrowRight aria-hidden="true" />
            </a>
            <p className="audit-deliverable">{t.deliverable}</p>
          </div>

          <div className="hero-panel audit-scorecard" aria-label={t.panelLabel}>
            <p className="hero-panel-head"><span>{t.panelHead}</span><span>{t.panelChoice}</span></p>
            {t.meetingTypes.map(([title, detail], index) => (
              <div className="scorecard-row audit-priority" key={title}>
                <span>0{index + 1}</span>
                <div><strong>{title}</strong><small>{detail}</small></div>
              </div>
            ))}
            <p className="hero-panel-foot"><span>{t.yourCost}</span><strong>€0</strong></p>
          </div>
        </div>
      </section>

      <section className="book-section" id="book-call">
        <div className="site-container book-grid">
          <div data-motion="rise">
            <p className="eyebrow">{t.stepsEyebrow}</p>
            <h2>{t.stepsTitle}</h2>
            <ol className="book-steps">
              {t.callSteps.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}
            </ol>
            <p className="book-alt">{t.altBefore} <Link className="text-link" href={localizePath(locale, "/free-audit")}>{t.altAudit}</Link> {t.altBetween} <Link className="text-link" href={localizePath(locale, "/free-prototype")}>{t.altPrototype}</Link>{t.altAfter}</p>
          </div>

          <div className="book-calendar" data-motion="rise">
            <BookingForm locale={locale} copy={dictionary.bookingForm} formCopy={dictionary.forms} />
          </div>
        </div>
      </section>
    </main>
  );
}
