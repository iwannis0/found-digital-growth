import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageTracker } from "@/components/analytics";
import { PageMotion } from "@/components/page-motion";
import { hasProjectCover, ProjectCover } from "@/components/project-cover";
import { localizePath, type Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/localized-content";
import { pageMetadata } from "@/lib/seo";

const en = {
  metaTitle: "{name} Concept Project",
  kicker: "Concept Project",
  coverAlt: "{name} concept website cover",
  previewEyebrow: "Website concept",
  previews: {
    "aura-dental": { title: "Explore the AURA website.", body: "Open the full responsive concept to see the design as a website." },
    "nova-estates": { title: "Explore the NOVA website.", body: "Open the full responsive property concept and explore its listings." },
    "vela-studio": { title: "Explore the VELA website.", body: "Open the full responsive beauty and wellness concept." },
  } as Record<string, { title: string; body: string }>,
  previewButton: "View website mockup",
  meta: { type: "Project type", typeValue: "Website concept", scope: "Scope", sector: "Sector", status: "Status", statusValue: "Concept · by VISION." },
  story: { challenge: "The challenge", approach: "Our approach", direction: "Design direction" },
  talk: "Talk to us about yours",
  features: "Experience features",
  audit: "Get a Free Audit",
};

const el: typeof en = {
  metaTitle: "{name}: Concept Ιστοσελίδας",
  kicker: "Concept έργο",
  coverAlt: "Εξώφυλλο concept ιστοσελίδας {name}",
  previewEyebrow: "Concept ιστοσελίδας",
  previews: {
    "aura-dental": { title: "Εξερευνήστε την ιστοσελίδα AURA.", body: "Ανοίξτε το πλήρες responsive concept για να δείτε τον σχεδιασμό ως πραγματική ιστοσελίδα." },
    "nova-estates": { title: "Εξερευνήστε την ιστοσελίδα NOVA.", body: "Ανοίξτε το πλήρες responsive concept ακινήτων και περιηγηθείτε στις αγγελίες του." },
    "vela-studio": { title: "Εξερευνήστε την ιστοσελίδα VELA.", body: "Ανοίξτε το πλήρες responsive concept ομορφιάς και ευεξίας." },
  },
  // The concept demos themselves are English-only.
  previewButton: "Δείτε το mockup (στα αγγλικά)",
  meta: { type: "Τύπος έργου", typeValue: "Concept ιστοσελίδας", scope: "Εύρος", sector: "Κλάδος", status: "Κατάσταση", statusValue: "Concept · από τη VISION." },
  story: { challenge: "Η πρόκληση", approach: "Η προσέγγισή μας", direction: "Σχεδιαστική κατεύθυνση" },
  talk: "Μιλήστε μας για τη δική σας",
  features: "Λειτουργίες της εμπειρίας",
  audit: "Δωρεάν αξιολόγηση",
};

const copy = { en, el };

const getProject = (locale: Locale, slug: string) => getProjects(locale).find((item) => item.slug === slug);

export function projectMetadata(locale: Locale, slug: string) {
  const project = getProject(locale, slug);
  if (!project) return {};
  return pageMetadata({ locale, path: `/work/${project.slug}`, title: copy[locale].metaTitle.replace("{name}", project.name), description: project.concept });
}

/** Renders the case study, or returns null for an unknown slug so the route can 404. */
export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = copy[locale];
  const project = getProject(locale, slug);
  if (!project) return null;
  const preview = t.previews[project.slug];
  const coverAlt = t.coverAlt.replace("{name}", project.name);
  const audit = localizePath(locale, "/free-audit");
  return <main className={`case-study case-motion-page case-${project.tone} motion-page`}><PageMotion /><PageTracker event="project_view" label={project.name} />
    <section className={`case-hero case-hero-${project.slug}`}><div className="site-container"><div className="case-kicker"><span>{t.kicker}</span><span>{project.industry}</span></div><h1>{project.name}</h1><p>{project.statement}</p></div></section>
    <section className="case-image"><div className="site-container">{hasProjectCover(project.slug) ? <div className={`${project.tone}-case-cover`}><Image src={project.image} alt={coverAlt} fill sizes="(max-width: 1624px) 100vw, 1584px" quality={project.slug === "nova-estates" ? 90 : 75} unoptimized={project.slug === "nova-estates"} priority /><ProjectCover slug={project.slug} /></div> : <Image src={project.image} alt={coverAlt} width={1584} height={990} priority />}</div></section>
    {preview && <section className="aura-preview-entry"><div className="site-container"><div data-motion="rise"><p className="eyebrow">{t.previewEyebrow}</p><h2>{preview.title}</h2><p>{preview.body}</p></div><Link className="button button-dark button-large" href={`/work/${project.slug}/demo`} hrefLang="en">{t.previewButton} <ArrowRight /></Link></div></section>}
    <section className="case-meta"><div className="site-container"><dl><div><dt>{t.meta.type}</dt><dd>{t.meta.typeValue}</dd></div><div><dt>{t.meta.scope}</dt><dd>{project.scope}</dd></div><div><dt>{t.meta.sector}</dt><dd>{project.industry}</dd></div><div><dt>{t.meta.status}</dt><dd>{t.meta.statusValue}</dd></div></dl></div></section>
    <section className="case-story section-pad"><div className="site-container">
      {([[t.story.challenge, project.challenge], [t.story.approach, project.approach], [t.story.direction, project.direction]] as const).map(([label, { title, body }], index, parts) => <div className="case-story-grid" key={label}><div data-motion="rise"><p className="eyebrow">{label}</p><h2>{title}</h2></div><div data-motion="rise"><p>{body}</p>{index === parts.length - 1 && <Link href={audit} className="text-link">{t.talk} <ArrowRight /></Link>}</div></div>)}
    </div></section>
    <section className="case-features" id="experience-features"><div className="site-container"><p className="eyebrow">{t.features}</p><div className="feature-cloud">{project.features.map((feature) => <span key={feature} data-motion="rise"><Check />{feature}</span>)}</div></div></section>
    <section className="case-next"><div className="site-container"><p>{project.closing}</p><Link className="button button-accent button-large" href={audit}>{t.audit} <ArrowRight /></Link></div></section>
  </main>;
}
