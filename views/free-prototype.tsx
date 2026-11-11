import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, LayoutTemplate, MonitorSmartphone, Palette, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { FAQList } from "@/components/faq-list";
import { PageMotion } from "@/components/page-motion";
import { PrototypeForm } from "@/components/prototype-form";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const includedIcons = [LayoutTemplate, MonitorSmartphone, Target, Palette] as const;
const reassuranceIcons = [ShieldCheck, Clock, Users] as const;

const en = {
  metaTitle: "Free Website Prototype Cyprus: See Your New Website First",
  metaDescription: "Get a free homepage prototype for your Cyprus business before you pay anything. Designed around your services, on desktop and mobile, with no obligation.",
  offerName: "Free Website Prototype",
  steps: [
    ["Tell us about the business", "Two minutes, no website needed", "Day 1"],
    ["We design your homepage", "Your services, your area, your customers", "3-5 days"],
    ["We walk you through it", "A short call or a private link", "Online"],
    ["You decide", "Build the full site, or keep the idea", "No cost"],
  ] as [string, string, string][],
  included: [
    ["A real homepage", "Designed for your business, not a template with your logo dropped in"],
    ["Desktop and mobile", "See how it looks on the phone, where most customers will meet it"],
    ["Built to bring enquiries", "A clear first screen and one main action: call, book or enquire"],
    ["Your brand", "We work with your logo, colours and photos, or suggest a direction"],
  ] as [string, string][],
  reassurances: ["Free, with no obligation", "Homepage prototype in 3 to 5 working days", "Five prototypes a month, so each one gets real attention"],
  faqs: [
    ["Is the prototype really free?", "Yes. The homepage prototype costs nothing and you are under no obligation to continue. If you like it, we quote the full website. If not, that is the end of it."],
    ["Why do you offer it for free?", "Most business owners find it hard to judge a website from a proposal. Seeing your own business on screen makes the decision easier, and the businesses that like the prototype usually become clients."],
    ["What exactly do I receive?", "A designed homepage for your business on desktop and mobile, shared through a private link or on a short call. It is a design prototype, not a live website, so it is not published under your domain."],
    ["Do I need an existing website?", "No. Many requests come from businesses that only have a Facebook or Instagram page, or nothing online yet. Tell us what the business does and who it serves, and we design from there."],
    ["How is this different from the free audit?", "The audit reviews a website you already have and lists what to fix. The prototype shows what a new website could look like, so you can judge whether our style suits the business."],
    ["What happens if I want the full website?", "We send a fixed quote based on the pages and features you need. Website packages start at €499. The prototype becomes the starting point of the design, so the work is not wasted."],
  ] as [string, string][],
  eyebrow: "Free website prototype",
  titleLead: "See your new website",
  titleAccent: "before you pay.",
  lead: "We design the homepage of your new website for free, around your business and your customers. If the style suits you, we build the rest. If not, you owe nothing.",
  heroCta: "Request My Free Prototype",
  deliverable: "Five prototypes a month, for businesses in Cyprus.",
  panelLabel: "How the free prototype works",
  panelHead: "How it works",
  panelWhen: "When",
  yourCost: "Your cost",
  formEyebrow: "Request your prototype",
  formTitle: "Tell us who the website is for.",
  formBody: "A few details are enough to start. The more we know about your customers and what you want them to do, the closer the first design will be.",
  includedEyebrow: "What you receive",
  workPrompt: "Want to see the standard first?",
  workLink: "Browse our recent work",
  callPrompt: "Rather talk it through?",
  callLink: "Book a call",
  faqEyebrow: "Questions",
  faqTitle: "Free, and no catch.",
};

const el: typeof en = {
  metaTitle: "Δωρεάν Πρωτότυπο Ιστοσελίδας στην Κύπρο",
  metaDescription: "Δωρεάν πρωτότυπο αρχικής σελίδας για την επιχείρησή σας στην Κύπρο, πριν πληρώσετε οτιδήποτε. Σχεδιασμένο γύρω από τις υπηρεσίες σας, για υπολογιστή και κινητό, χωρίς καμία δέσμευση.",
  offerName: "Δωρεάν Πρωτότυπο Ιστοσελίδας",
  steps: [
    ["Μας λέτε για την επιχείρησή σας", "Δύο λεπτά, δεν χρειάζεται ιστοσελίδα", "Ημέρα 1"],
    ["Σχεδιάζουμε την αρχική σας σελίδα", "Οι υπηρεσίες, η περιοχή και οι πελάτες σας", "3-5 ημέρες"],
    ["Σας την παρουσιάζουμε", "Μια σύντομη κλήση ή ένας ιδιωτικός σύνδεσμος", "Online"],
    ["Αποφασίζετε εσείς", "Προχωράμε στην πλήρη ιστοσελίδα ή κρατάτε την ιδέα", "Χωρίς κόστος"],
  ],
  included: [
    ["Μια πραγματική αρχική σελίδα", "Σχεδιασμένη για την επιχείρησή σας, όχι ένα έτοιμο template με το λογότυπό σας"],
    ["Υπολογιστής και κινητό", "Δείτε πώς φαίνεται στο κινητό, εκεί όπου θα τη δουν οι περισσότεροι πελάτες"],
    ["Φτιαγμένη για να φέρνει πελάτες", "Μια ξεκάθαρη πρώτη οθόνη και μία κύρια ενέργεια: κλήση, κράτηση ή αίτημα"],
    ["Η ταυτότητά σας", "Δουλεύουμε με το λογότυπο, τα χρώματα και τις φωτογραφίες σας ή σας προτείνουμε μια κατεύθυνση"],
  ],
  reassurances: ["Δωρεάν, χωρίς καμία δέσμευση", "Πρωτότυπο αρχικής σελίδας σε 3 έως 5 εργάσιμες ημέρες", "Πέντε πρωτότυπα τον μήνα, ώστε το καθένα να έχει την προσοχή που του αξίζει"],
  faqs: [
    ["Είναι πραγματικά δωρεάν το πρωτότυπο;", "Ναι. Το πρωτότυπο της αρχικής σελίδας δεν κοστίζει τίποτα και δεν έχετε καμία υποχρέωση να συνεχίσετε. Αν σας αρέσει, σας δίνουμε προσφορά για ολόκληρη την ιστοσελίδα. Αν όχι, σταματάμε εκεί."],
    ["Γιατί το προσφέρετε δωρεάν;", "Οι περισσότεροι επιχειρηματίες δυσκολεύονται να κρίνουν μια ιστοσελίδα από μια πρόταση. Όταν βλέπετε τη δική σας επιχείρηση στην οθόνη, η απόφαση γίνεται πιο εύκολη, και οι επιχειρήσεις που εκτιμούν το πρωτότυπο συνήθως γίνονται πελάτες μας."],
    ["Τι ακριβώς θα λάβω;", "Μια σχεδιασμένη αρχική σελίδα για την επιχείρησή σας, για υπολογιστή και κινητό, μέσω ιδιωτικού συνδέσμου ή σε μια σύντομη κλήση. Είναι σχεδιαστικό πρωτότυπο και όχι ζωντανή ιστοσελίδα, οπότε δεν δημοσιεύεται στο domain σας."],
    ["Χρειάζεται να έχω ήδη ιστοσελίδα;", "Όχι. Πολλά αιτήματα έρχονται από επιχειρήσεις που έχουν μόνο σελίδα στο Facebook ή στο Instagram ή τίποτα ακόμη στο διαδίκτυο. Πείτε μας τι κάνει η επιχείρησή σας και σε ποιους απευθύνεται, και ξεκινάμε τον σχεδιασμό από εκεί."],
    ["Σε τι διαφέρει από τη δωρεάν αξιολόγηση;", "Η αξιολόγηση εξετάζει μια ιστοσελίδα που ήδη έχετε και καταγράφει τι πρέπει να διορθωθεί. Το πρωτότυπο δείχνει πώς θα μπορούσε να είναι μια νέα ιστοσελίδα, ώστε να κρίνετε αν το στυλ μας ταιριάζει στην επιχείρησή σας."],
    ["Τι γίνεται αν θέλω ολόκληρη την ιστοσελίδα;", "Σας στέλνουμε σταθερή προσφορά με βάση τις σελίδες και τις λειτουργίες που χρειάζεστε. Τα πακέτα ιστοσελίδων ξεκινούν από 499 €. Το πρωτότυπο γίνεται η αφετηρία του σχεδιασμού, οπότε η δουλειά δεν πάει χαμένη."],
  ],
  eyebrow: "Δωρεάν πρωτότυπο ιστοσελίδας",
  titleLead: "Δείτε τη νέα σας ιστοσελίδα",
  titleAccent: "πριν πληρώσετε.",
  lead: "Σχεδιάζουμε δωρεάν την αρχική σελίδα της νέας σας ιστοσελίδας, γύρω από την επιχείρηση και τους πελάτες σας. Αν σας ταιριάζει το στυλ, φτιάχνουμε τα υπόλοιπα. Αν όχι, δεν μας χρωστάτε τίποτα.",
  heroCta: "Ζητήστε το δωρεάν πρωτότυπο",
  deliverable: "Πέντε πρωτότυπα τον μήνα, για επιχειρήσεις στην Κύπρο.",
  panelLabel: "Πώς λειτουργεί το δωρεάν πρωτότυπο",
  panelHead: "Πώς λειτουργεί",
  panelWhen: "Πότε",
  yourCost: "Το κόστος σας",
  formEyebrow: "Ζητήστε το πρωτότυπό σας",
  formTitle: "Πείτε μας για ποιους είναι η ιστοσελίδα.",
  formBody: "Λίγα στοιχεία αρκούν για να ξεκινήσουμε. Όσο περισσότερα γνωρίζουμε για τους πελάτες σας και για το τι θέλετε να κάνουν, τόσο πιο κοντά θα είναι ο πρώτος σχεδιασμός.",
  includedEyebrow: "Τι λαμβάνετε",
  workPrompt: "Θέλετε να δείτε πρώτα το επίπεδο της δουλειάς μας;",
  workLink: "Δείτε τα πρόσφατα έργα μας",
  callPrompt: "Προτιμάτε να το συζητήσουμε;",
  callLink: "Κλείστε μια κλήση",
  faqEyebrow: "Ερωτήσεις",
  faqTitle: "Δωρεάν, χωρίς παγίδες.",
};

const copy = { en, el };

export function freePrototypeMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/free-prototype", title: t.metaTitle, description: t.metaDescription });
}

export function FreePrototypeView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const dictionary = getDictionary(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Offer",
        name: t.offerName,
        description: t.metaDescription,
        url: `${siteConfig.url}${localizePath(locale, "/free-prototype")}`,
        price: "0",
        priceCurrency: "EUR",
        areaServed: { "@type": "Country", name: "Cyprus" },
        seller: { "@id": `${siteConfig.url}/#business` },
      },
      {
        "@type": "FAQPage",
        ...(locale === "en" ? {} : { inLanguage: locale }),
        mainEntity: t.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  };

  return (
    <main className="prototype-page motion-page">
      <PageMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <section className="lit-hero audit-lit-hero">
        <div className="site-container lit-hero-grid">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.titleLead} <em>{t.titleAccent}</em></h1>
            <p className="lit-hero-lead">{t.lead}</p>
            <a className="button button-accent button-large prototype-hero-cta" href="#prototype-form" data-track="prototype_cta_click" data-track-location="prototype_hero">
              {t.heroCta} <ArrowRight aria-hidden="true" />
            </a>
            <p className="audit-deliverable">{t.deliverable}</p>
          </div>

          <div className="hero-panel audit-scorecard" aria-label={t.panelLabel}>
            <p className="hero-panel-head"><span>{t.panelHead}</span><span>{t.panelWhen}</span></p>
            {t.steps.map(([title, detail, when], index) => (
              <div className="scorecard-row audit-priority" key={title}>
                <span>0{index + 1}</span>
                <div><strong>{title}</strong><small>{detail}</small></div>
                <em data-impact={index === t.steps.length - 1 ? "high" : undefined}>{when}</em>
              </div>
            ))}
            <p className="hero-panel-foot"><span>{t.yourCost}</span><strong>€0</strong></p>
          </div>
        </div>
      </section>

      <section className="audit-form-section" id="prototype-form">
        <div className="site-container audit-form-grid">
          <div data-motion="rise">
            <p className="eyebrow">{t.formEyebrow}</p>
            <h2>{t.formTitle}</h2>
            <p>{t.formBody}</p>
            <ul className="prototype-reassurance">
              {t.reassurances.map((text, index) => { const Icon = reassuranceIcons[index]; return <li key={text}><Icon aria-hidden="true" /><span>{text}</span></li>; })}
            </ul>
          </div>
          <div className="form-panel" data-motion="rise"><PrototypeForm locale={locale} copy={dictionary.prototypeForm} formCopy={dictionary.forms} /></div>
        </div>
      </section>

      <section className="audit-areas section-pad">
        <div className="site-container">
          <p className="eyebrow" data-motion="rise">{t.includedEyebrow}</p>
          <div className="audit-area-grid">
            {t.included.map(([title, body], index) => { const Icon = includedIcons[index]; return <article key={title} data-motion="rise"><i aria-hidden="true"><Icon /></i><h2>{title}</h2><p>{body}</p></article>; })}
          </div>
          <p className="prototype-links" data-motion="rise">
            <span><Sparkles aria-hidden="true" /> {t.workPrompt} <Link className="text-link" href={localizePath(locale, "/work")}>{t.workLink}</Link></span>
            <span><CalendarDays aria-hidden="true" /> {t.callPrompt} <Link className="text-link" href={localizePath(locale, "/book")}>{t.callLink}</Link></span>
          </p>
        </div>
      </section>

      <section className="audit-faq section-pad">
        <div className="site-container">
          <div className="section-heading" data-motion="rise">
            <p className="eyebrow">{t.faqEyebrow}</p>
            <h2>{t.faqTitle}</h2>
          </div>
          <FAQList list={t.faqs} />
        </div>
      </section>
    </main>
  );
}
