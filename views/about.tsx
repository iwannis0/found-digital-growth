import Image from "next/image";
import { ArrowUpRight, ChartNoAxesColumnIncreasing, Gem, MessageSquareText, Rocket, TrendingUp, Wrench } from "lucide-react";
import { PageMotion } from "@/components/page-motion";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const founderLinks = [
  { image: "/images/team/ioannis.webp", linkedin: "https://www.linkedin.com/in/ioannis-georgiou-86b304273/" },
  { image: "/images/team/stylianos.webp", linkedin: "https://www.linkedin.com/in/stylianos-panagiotou-0444552a6/" },
];

const en = {
  metaTitle: "About Us: Web Design Studio in Cyprus",
  metaDescription: "Meet Ioannis Georgiou and Stylianos Panagiotou, the founders of VISION., a web design and digital growth studio working with businesses across Cyprus.",
  absoluteTitle: false,
  founders: [
    {
      name: "Ioannis Georgiou",
      role: "Co-founder · Strategy, structure & communication",
      description: "Ioannis leads discovery and website structure, and speaks directly with clients throughout each project. He works hands-on across both design and code to turn business priorities into clear customer journeys.",
      education: "Background: Practical branch graduate · BSc Computer Science, University of Cyprus · MSc Artificial Intelligence, UCY (in progress)",
    },
    {
      name: "Stylianos Panagiotou",
      role: "Co-founder · Design, development & communication",
      description: "Stylianos leads design direction, development and delivery, and speaks directly with clients throughout each project. He works hands-on across both design and code to make every website clear, reliable and ready to launch.",
      education: "Background: Practical branch graduate · BSc Computer Science, University of Cyprus · MSc Artificial Intelligence, UCY (in progress)",
    },
  ],
  linkedinLabel: "{name} on LinkedIn",
  linkedin: "View LinkedIn profile",
  eyebrow: "About VISION.",
  titleLead: "Two people.",
  titleAccent: "One clear direction.",
  lead: "Every project is shaped directly by both founders. We share the design, code and client communication, while Ioannis leads business clarity and structure, and Stylianos leads visual direction, build quality and delivery.",
  afterEyebrow: "After launch",
  afterLead: "Going live is",
  afterAccent: "where the work starts.",
  afterBody: "We help local businesses turn their website into a practical growth asset, not a one-off project.",
  afterLaunch: [
    ["Launch", "Tested, live and handed over with a clear walkthrough."],
    ["Measure", "Calls, enquiries and bookings tracked from day one."],
    ["Improve", "Updates, fixes and content changes when you need them."],
    ["Grow", "Local SEO and Google Business to bring in more customers."],
  ] as [string, string][],
  valuesEyebrow: "How we work",
  valuesLead: "Three things",
  valuesAccent: "we never skip.",
  valuesBody: "The principles behind every project, whatever its size.",
  values: [
    ["Clarity over jargon", "Clear scope and plain language from the first conversation."],
    ["Care in the details", "Thoughtful design and a website that works as well as it looks."],
    ["Progress with purpose", "Decisions guided by what the business and its customers need."],
  ] as [string, string][],
};

const el: typeof en = {
  metaTitle: "Σχετικά με τη VISION. | Web Design στην Κύπρο",
  metaDescription: "Γνωρίστε τον Ιωάννη Γεωργίου και τον Στυλιανό Παναγιώτου, τους ιδρυτές της VISION., ενός studio σχεδιασμού ιστοσελίδων και ψηφιακής ανάπτυξης για επιχειρήσεις σε όλη την Κύπρο.",
  absoluteTitle: true,
  founders: [
    {
      name: "Ιωάννης Γεωργίου",
      role: "Συνιδρυτής · Στρατηγική, δομή & επικοινωνία",
      description: "Ο Ιωάννης έχει την ευθύνη της φάσης ανακάλυψης και της δομής της ιστοσελίδας, και μιλά απευθείας με τους πελάτες σε κάθε έργο. Δουλεύει ο ίδιος τόσο στον σχεδιασμό όσο και στον κώδικα, μετατρέποντας τις προτεραιότητες της επιχείρησης σε ξεκάθαρες διαδρομές για τους πελάτες.",
      education: "Σπουδές: Απόφοιτος πρακτικής κατεύθυνσης · BSc Πληροφορική, Πανεπιστήμιο Κύπρου · MSc Τεχνητή Νοημοσύνη, Πανεπιστήμιο Κύπρου (σε εξέλιξη)",
    },
    {
      name: "Στυλιανός Παναγιώτου",
      role: "Συνιδρυτής · Σχεδιασμός, ανάπτυξη & επικοινωνία",
      description: "Ο Στυλιανός έχει την ευθύνη της σχεδιαστικής κατεύθυνσης, της ανάπτυξης και της παράδοσης, και μιλά απευθείας με τους πελάτες σε κάθε έργο. Δουλεύει ο ίδιος τόσο στον σχεδιασμό όσο και στον κώδικα, ώστε κάθε ιστοσελίδα να είναι ξεκάθαρη, αξιόπιστη και έτοιμη για λανσάρισμα.",
      education: "Σπουδές: Απόφοιτος πρακτικής κατεύθυνσης · BSc Πληροφορική, Πανεπιστήμιο Κύπρου · MSc Τεχνητή Νοημοσύνη, Πανεπιστήμιο Κύπρου (σε εξέλιξη)",
    },
  ],
  linkedinLabel: "Ο {name} στο LinkedIn",
  linkedin: "Προφίλ στο LinkedIn",
  eyebrow: "Σχετικά με τη VISION.",
  titleLead: "Δύο άνθρωποι.",
  titleAccent: "Μία ξεκάθαρη κατεύθυνση.",
  lead: "Κάθε έργο διαμορφώνεται απευθείας και από τους δύο ιδρυτές. Μοιραζόμαστε τον σχεδιασμό, τον κώδικα και την επικοινωνία με τους πελάτες, ενώ ο Ιωάννης έχει την ευθύνη για τη σαφήνεια της επιχείρησης και τη δομή, και ο Στυλιανός για την οπτική κατεύθυνση, την ποιότητα της κατασκευής και την παράδοση.",
  afterEyebrow: "Μετά το λανσάρισμα",
  afterLead: "Το λανσάρισμα",
  afterAccent: "είναι η αρχή της δουλειάς.",
  afterBody: "Βοηθάμε τις τοπικές επιχειρήσεις να κάνουν την ιστοσελίδα τους ένα πρακτικό εργαλείο ανάπτυξης, όχι ένα έργο που τελειώνει μια και έξω.",
  afterLaunch: [
    ["Λανσάρισμα", "Δοκιμασμένη, online και παραδομένη με μια ξεκάθαρη παρουσίαση."],
    ["Μέτρηση", "Κλήσεις, αιτήματα και κρατήσεις μετριούνται από την πρώτη μέρα."],
    ["Βελτίωση", "Ενημερώσεις, διορθώσεις και αλλαγές περιεχομένου όποτε τις χρειάζεστε."],
    ["Ανάπτυξη", "Τοπικό SEO και Google Business για να έρχονται περισσότεροι πελάτες."],
  ],
  valuesEyebrow: "Πώς δουλεύουμε",
  valuesLead: "Τρία πράγματα",
  valuesAccent: "που δεν παραλείπουμε ποτέ.",
  valuesBody: "Οι αρχές πίσω από κάθε έργο, όποιο κι αν είναι το μέγεθός του.",
  values: [
    ["Σαφήνεια αντί για ορολογία", "Ξεκάθαρο εύρος εργασιών και απλή γλώσσα από την πρώτη συζήτηση."],
    ["Φροντίδα στη λεπτομέρεια", "Προσεγμένος σχεδιασμός και μια ιστοσελίδα που λειτουργεί τόσο καλά όσο δείχνει."],
    ["Πρόοδος με σκοπό", "Αποφάσεις με γνώμονα το τι χρειάζονται η επιχείρηση και οι πελάτες της."],
  ],
};

const copy = { en, el };
const afterLaunchIcons = [Rocket, ChartNoAxesColumnIncreasing, Wrench, TrendingUp] as const;
const valueIcons = [MessageSquareText, Gem, TrendingUp] as const;

export function aboutMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/about", title: t.metaTitle, description: t.metaDescription, absoluteTitle: t.absoluteTitle });
}

export function AboutView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const founders = t.founders.map((founder, index) => ({ ...founder, ...founderLinks[index] }));
  return <main className="motion-page about-motion-page"><PageMotion />
    <section className="lit-hero about-lit-hero"><div className="site-container lit-hero-grid">
      <div><p className="eyebrow">{t.eyebrow}</p><h1 id="founders-heading">{t.titleLead} <em>{t.titleAccent}</em></h1><p className="lit-hero-lead">{t.lead}</p></div>
      <div className="founder-stage">{founders.map((founder) => <figure className="founder-hero-card" key={founder.image}><div className="founder-hero-photo"><Image src={founder.image} alt={`${founder.name}, ${founder.role}`} fill unoptimized sizes="(max-width: 900px) 45vw, 260px" priority /></div><figcaption><strong>{founder.name}</strong><span>{founder.role.split(" · ").slice(1).join(" · ")}</span></figcaption></figure>)}</div>
    </div></section>
    <section className="founders-section section-pad" aria-labelledby="founders-heading">
      <div className="site-container">
        <div className="founders-grid">
          {founders.map((founder, index) => <article className="founder-profile" key={founder.image}>
            <span className="founder-number">0{index + 1} / VISION.</span>
            <div className="founder-content">
              <div className="founder-copy" data-motion="rise">
                <h2>{founder.name}</h2>
                <p className="founder-role">{founder.role}</p>
                <p className="founder-description">{founder.description}</p>
                <p className="founder-education">{founder.education}</p>
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t.linkedinLabel.replace("{name}", founder.name)}>{t.linkedin} <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="after-launch-section section-pad"><div className="site-container">
      <div className="about-section-head" data-motion="rise"><div><p className="eyebrow">{t.afterEyebrow}</p><h2>{t.afterLead} <em>{t.afterAccent}</em></h2></div><p>{t.afterBody}</p></div>
      <ol className="after-launch-track">{t.afterLaunch.map(([title, body], index) => { const Icon = afterLaunchIcons[index]; return <li key={title} data-motion="rise"><i aria-hidden="true"><Icon /></i><small>0{index + 1}</small><h3>{title}</h3><p>{body}</p></li>; })}</ol>
    </div></section>
    <section className="about-values" aria-labelledby="about-values-heading"><div className="site-container"><div className="about-section-head" data-motion="rise"><div><p className="eyebrow">{t.valuesEyebrow}</p><h2 id="about-values-heading">{t.valuesLead} <em>{t.valuesAccent}</em></h2></div><p>{t.valuesBody}</p></div><div className="about-values-grid">
      {t.values.map(([title, body], index) => { const Icon = valueIcons[index]; return <article data-motion="rise" key={title}><span>0{index + 1}</span><i className="value-icon" aria-hidden="true"><Icon /></i><h3>{title}</h3><p>{body}</p></article>; })}
    </div></div></section>
  </main>;
}
