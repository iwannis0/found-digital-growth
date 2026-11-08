import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, History, MousePointerClick, SearchX, Sparkles } from "lucide-react";
import { BeforeAfter } from "@/components/before-after";
import { CTASection } from "@/components/cta-section";
import { PageMotion } from "@/components/page-motion";
import { ProjectCover } from "@/components/project-cover";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { getDeployedProjects, getProcessSteps, getProjects, getServices } from "@/lib/localized-content";
import { pageMetadata } from "@/lib/seo";

const en = {
  metaTitle: "VISION. | Website Design & Local SEO in Cyprus",
  metaDescription: "Websites designed and built in Cyprus to bring you enquiries: web design, local SEO, Google Business Profile and ongoing care. Free website audit.",
  eyebrow: "Digital experiences",
  titleLead: "Built with clarity",
  titleAccent: "Designed for what’s next.",
  lead: "We design and build websites around the way Cyprus businesses work today, and where they want to go next.",
  auditButton: "Get a Free Website Audit",
  workButton: "View our work",
  artLabel: "Illustrative VISION. website concept",
  growthCard: ["What we", "cover", "Six focus areas", "One joined-up plan"],
  brandCard: ["A digital studio", "in Cyprus."],
  analyticsCard: ["What we measure", "Meaningful actions", "Calls · enquiries · bookings"],
  serviceIndexLabel: "What VISION. can help with",
  serviceIndex: ["Website Design & Development", "Local SEO", "Google Business", "Website Care", "Analytics", "Conversion Design"],
  footnote: ["Cyprus-based digital growth", "Design · Build · Care"],
  problem: {
    eyebrow: "The hidden cost",
    title: "Is your online presence costing you customers?",
    body: "A weak or outdated digital presence doesn’t just look bad. It creates doubt, loses visibility and makes the next step harder.",
    items: [
      { title: "Looks outdated", body: "A poor first impression makes even an excellent business feel less credible than it really is." },
      { title: "Hard to find", body: "A beautiful website has little value when customers cannot discover it at the moment they need you." },
      { title: "Doesn't convert", body: "Visitors should immediately know how to call, message, book or make an enquiry." },
    ],
    fix: "We fix all three",
  },
  services: {
    eyebrow: "What we do",
    title: "A connected digital presence, built around growth.",
    body: "Start with the foundation you need today, then add visibility, measurement and practical support as the business grows.",
  },
  work: {
    eyebrow: "Selected work",
    title: "Websites that look the part and pull their weight.",
    body: "Two live builds and two concept projects, each shaped around a different customer journey, from e-commerce and retail loyalty to appointments and property enquiries.",
    all: "See all work",
    liveAlt: "{name} live website",
    liveBadge: "Live site ↗",
    conceptAlt: "{name} concept website cover",
    conceptBadge: "Concept Project",
  },
  process: {
    eyebrow: "How a project runs",
    title: "A clear process, without the mystery.",
    body: "You always know what is happening, what we need from you and what comes next.",
    workflowLabel: "Client workflow",
    workflow: "Audit → Discovery → Proposal → Deposit → Design → Build → QA → Launch → Grow",
  },
  cta: {
    title: "Your digital presence can do more.",
    body: "Tell us where the business is today. We will show you what to fix first.",
  },
};

const el: typeof en = {
  metaTitle: "Κατασκευή Ιστοσελίδων & SEO στην Κύπρο | VISION.",
  metaDescription: "Η VISION. δημιουργεί σύγχρονες, επαγγελματικές ιστοσελίδες για επιχειρήσεις στην Κύπρο. Ανακαλύψτε υπηρεσίες web design, SEO και ψηφιακής ανάπτυξης.",
  eyebrow: "Ψηφιακές εμπειρίες",
  titleLead: "Χτισμένο με σαφήνεια",
  titleAccent: "Σχεδιασμένο για ό,τι έρχεται.",
  lead: "Σχεδιάζουμε και κατασκευάζουμε ιστοσελίδες γύρω από τον τρόπο που δουλεύουν σήμερα οι επιχειρήσεις στην Κύπρο, και εκεί που θέλουν να φτάσουν αύριο.",
  auditButton: "Δωρεάν αξιολόγηση",
  workButton: "Τα έργα μας",
  artLabel: "Ενδεικτικό concept ιστοσελίδας της VISION.",
  growthCard: ["Τι", "καλύπτουμε", "Έξι τομείς", "Ένα ενιαίο πλάνο"],
  brandCard: ["Ένα ψηφιακό studio", "στην Κύπρο."],
  analyticsCard: ["Τι μετράμε", "Ενέργειες που μετράνε", "Κλήσεις · αιτήματα · κρατήσεις"],
  serviceIndexLabel: "Πώς μπορεί να βοηθήσει η VISION.",
  serviceIndex: ["Σχεδιασμός & Κατασκευή Ιστοσελίδων", "Τοπικό SEO", "Google Business", "Website Care", "Analytics", "Σχεδιασμός για Μετατροπές"],
  footnote: ["Ψηφιακή ανάπτυξη από την Κύπρο", "Σχεδιασμός · Κατασκευή · Φροντίδα"],
  problem: {
    eyebrow: "Το κρυφό κόστος",
    title: "Σας κοστίζει πελάτες η online παρουσία σας;",
    body: "Μια αδύναμη ή παρωχημένη ψηφιακή παρουσία δεν είναι απλώς άσχημη. Δημιουργεί αμφιβολίες, χάνει ορατότητα και δυσκολεύει το επόμενο βήμα.",
    items: [
      { title: "Δείχνει παρωχημένη", body: "Μια κακή πρώτη εντύπωση κάνει ακόμη και μια εξαιρετική επιχείρηση να φαίνεται λιγότερο αξιόπιστη απ’ ό,τι πραγματικά είναι." },
      { title: "Δύσκολα βρίσκεται", body: "Μια όμορφη ιστοσελίδα έχει μικρή αξία όταν οι πελάτες δεν μπορούν να τη βρουν τη στιγμή που σας χρειάζονται." },
      { title: "Δεν φέρνει πελάτες", body: "Ο επισκέπτης πρέπει να ξέρει αμέσως πώς να τηλεφωνήσει, να στείλει μήνυμα, να κλείσει ραντεβού ή να κάνει ένα αίτημα." },
    ],
    fix: "Τα διορθώνουμε και τα τρία",
  },
  services: {
    eyebrow: "Τι κάνουμε",
    title: "Μια ενιαία ψηφιακή παρουσία, χτισμένη για ανάπτυξη.",
    body: "Ξεκινήστε με τη βάση που χρειάζεστε σήμερα και προσθέστε ορατότητα, μέτρηση και πρακτική υποστήριξη καθώς μεγαλώνει η επιχείρηση.",
  },
  work: {
    eyebrow: "Επιλεγμένα έργα",
    title: "Ιστοσελίδες που δείχνουν σωστά και κάνουν τη δουλειά τους.",
    body: "Δύο ιστοσελίδες σε λειτουργία και δύο concept έργα, το καθένα σχεδιασμένο γύρω από μια διαφορετική διαδρομή πελάτη: από e-commerce και προγράμματα επιβράβευσης μέχρι ραντεβού και αιτήματα για ακίνητα.",
    all: "Όλα τα έργα",
    liveAlt: "Η ιστοσελίδα {name} σε λειτουργία",
    liveBadge: "Σε λειτουργία ↗",
    conceptAlt: "Εξώφυλλο concept ιστοσελίδας {name}",
    conceptBadge: "Concept έργο",
  },
  process: {
    eyebrow: "Πώς εξελίσσεται ένα έργο",
    title: "Μια ξεκάθαρη διαδικασία, χωρίς μυστήρια.",
    body: "Ξέρετε πάντα τι γίνεται, τι χρειαζόμαστε από εσάς και τι ακολουθεί.",
    workflowLabel: "Η διαδικασία συνεργασίας",
    workflow: "Αξιολόγηση → Ανακάλυψη → Πρόταση → Προκαταβολή → Σχεδιασμός → Κατασκευή → Έλεγχος → Λανσάρισμα → Ανάπτυξη",
  },
  cta: {
    title: "Η ψηφιακή σας παρουσία μπορεί να κάνει περισσότερα.",
    body: "Πείτε μας πού βρίσκεται σήμερα η επιχείρηση. Θα σας δείξουμε τι να διορθώσετε πρώτα.",
  },
};

const copy = { en, el };
const problemIcons = [History, SearchX, MousePointerClick] as const;

export function homeMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/", title: t.metaTitle, description: t.metaDescription, absoluteTitle: true });
}

export function HomeView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const path = (href: string) => localizePath(locale, href);
  const services = getServices(locale);
  const deployedProjects = getDeployedProjects(locale);
  const featuredConcepts = getProjects(locale).filter((project) => project.slug === "aura-dental" || project.slug === "nova-estates");
  const processSteps = getProcessSteps(locale);

  return (
    <main className="motion-page home-motion-page">
      <PageMotion />
      <section className="hero home-hero">
        <div className="site-container home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-hero-eyebrow">{t.eyebrow}</p>
            <h1>{t.titleLead}<span>.</span><br /><em>{t.titleAccent}</em></h1>
            <p className="home-hero-lead">{t.lead}</p>
            <div className="home-hero-actions">
              <Link className="button button-dark home-hero-button" href={path("/free-audit")}>{t.auditButton} <ArrowRight aria-hidden="true" /></Link>
              <Link className="button button-outline home-hero-button" href={path("/work")}>{t.workButton} <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="home-hero-art" aria-label={t.artLabel}>
                        <div className="home-growth-card" aria-hidden="true"><span>{t.growthCard[0]}<br />{t.growthCard[1]}</span><div className="home-growth-bars"><i /><i /><i /><i /></div><strong>{t.growthCard[2]}</strong><small>{t.growthCard[3]}</small></div>
            <div className="home-screen" aria-hidden="true">
              <div className="home-screen-top"><b>VISION<span>.</span></b><span>Websites &nbsp; Visibility &nbsp; Growth</span><i>☰</i></div>
              <div className="home-screen-image"><Image src="/images/home-hero-architecture.webp" alt="" fill sizes="(max-width: 760px) 90vw, 650px" priority /></div>
              <div className="home-screen-copy"><p>Better<br />Brands.<br />Real<br />Growth.</p><small>Web design<br />&amp; digital growth</small></div>
              <div className="home-screen-footer"><span>Homepage</span><span>01 / 04</span></div>
            </div>
            <div className="home-brand-card" aria-hidden="true"><strong>v<span>.</span></strong><small>{t.brandCard[0]}<br />{t.brandCard[1]}</small></div>
            <div className="home-analytics-card" aria-hidden="true"><small>{t.analyticsCard[0]}</small><strong>{t.analyticsCard[1]}</strong><svg viewBox="0 0 230 62" preserveAspectRatio="none"><path d="M0 52 C22 50 27 36 43 41 S72 52 89 30 S116 43 132 29 S157 37 173 15 S205 29 230 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg><span>{t.analyticsCard[2]}</span></div>
          </div>
          <div className="home-service-index" aria-label={t.serviceIndexLabel}>
            {t.serviceIndex.map((label, index) => [String(index + 1).padStart(2, "0"), label]).map(([number, label]) => <div key={number}><span>{number}</span><strong>{label}</strong></div>)}
          </div>
        </div>
        <div className="site-container home-hero-footnote"><span>{t.footnote[0]}</span><span>{t.footnote[1]}</span></div>
      </section>

      <section className="problem-section section-pad">
        <div className="site-container">
          <SectionHeading className="motion-reveal" eyebrow={t.problem.eyebrow} title={t.problem.title} body={t.problem.body} />
          <div className="problem-grid">
            {t.problem.items.map(({ title, body }, index) => { const Icon = problemIcons[index]; const number = `0${index + 1}`; return <article key={number} className="problem-item" data-motion="rise"><span>{number}</span><i className="problem-icon" aria-hidden="true"><Icon /></i><h3>{title}</h3><p>{body}</p></article>; })}
          </div>
          <p className="fix-statement" data-motion="rise">{t.problem.fix}<span>.</span></p>
        </div>
      </section>

      <section className="services-section section-pad">
        <div className="site-container">
          <SectionHeading className="motion-reveal" eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body} />
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={path(`/services/${service.slug}`)} className="service-row" data-motion="rise">
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" />
                  <div><h3>{service.title}</h3><p>{service.short}</p></div>
                  <ArrowUpRight className="service-arrow" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="site-container">
          <div className="section-topline"><SectionHeading className="motion-reveal" eyebrow={t.work.eyebrow} title={t.work.title} body={t.work.body} /><Link className="text-link" href={path("/work")}>{t.work.all} <ArrowUpRight /></Link></div>
          <div className="project-grid">
            {deployedProjects.map((project, index) => (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card project-live" key={project.slug} data-motion="rise">
                <div className="project-image-wrap" data-motion-parallax>
                  <Image src={project.image} alt={t.work.liveAlt.replace("{name}", project.name)} fill sizes="(max-width: 900px) 100vw, 50vw" className="project-image project-image-live" />
                  <span className="concept-badge live-badge">{t.work.liveBadge}</span>
                </div>
                <div className="project-meta"><div><span>{project.industry}</span><h3>{project.name}</h3></div><span className="project-index">0{index + 1}</span></div>
              </a>
            ))}
            {featuredConcepts.map((project, index) => (
              <Link href={path(`/work/${project.slug}`)} className={`project-card project-${project.tone}`} key={project.slug} data-motion="rise">
                <div className="project-image-wrap" data-motion-parallax>
                  <Image src={project.image} alt={t.work.conceptAlt.replace("{name}", project.name)} fill sizes="(max-width: 900px) 100vw, 50vw" quality={project.slug === "nova-estates" ? 90 : 75} unoptimized={project.slug === "nova-estates"} className="project-image" />
                  <ProjectCover slug={project.slug} fallback={<span className="concept-badge">{t.work.conceptBadge}</span>} />
                </div>
                <div className="project-meta"><div><span>{project.industry}</span><h3>{project.name}</h3></div><span className="project-index">0{deployedProjects.length + index + 1}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfter copy={getDictionary(locale).beforeAfter} />

      <section className="process-section section-pad">
        <div className="site-container">
          <SectionHeading className="motion-reveal" eyebrow={t.process.eyebrow} title={t.process.title} body={t.process.body} light />
          <div className="process-list">
            {processSteps.map(([number, title, body]) => <article key={number} data-motion="rise"><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className="workflow-line" aria-label={t.process.workflowLabel}>
            <Sparkles aria-hidden="true" />
            <p>{t.process.workflow}</p>
          </div>
        </div>
      </section>

      <CTASection locale={locale} title={t.cta.title} body={t.cta.body} />
    </main>
  );
}
