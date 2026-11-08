import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FAQList } from "@/components/faq-list";
import { PageMotion } from "@/components/page-motion";
import { formatArticleDate } from "@/lib/articles";
import { getArticles, getDefaultArticleCta, getLocalizedArticle } from "@/lib/articles-el";
import { localeSettings, localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const en = {
  metaTitle: "Articles: Websites & Local SEO in Cyprus",
  metaDescription: "Practical guides for Cyprus business owners on website costs, design, local SEO and getting found on Google.",
  eyebrow: "Articles",
  titleLead: "Straight answers",
  titleAccent: "for business owners.",
  lead: "Practical guides on websites, costs and getting found on Google in Cyprus.",
  minRead: "{count} min read",
  allArticles: "All articles",
  sources: "Sources",
  commonQuestions: "Common questions",
  keepReading: "Keep reading",
  home: "Home",
};

const el: typeof en = {
  metaTitle: "Άρθρα: Ιστοσελίδες & Τοπικό SEO στην Κύπρο",
  metaDescription: "Πρακτικοί οδηγοί για επιχειρηματίες στην Κύπρο: κόστος ιστοσελίδας, σχεδιασμός, τοπικό SEO και πώς να σας βρίσκουν στο Google.",
  eyebrow: "Άρθρα",
  titleLead: "Ξεκάθαρες απαντήσεις",
  titleAccent: "για επιχειρηματίες.",
  lead: "Πρακτικοί οδηγοί για ιστοσελίδες, κόστος και πώς να σας βρίσκουν στο Google στην Κύπρο.",
  minRead: "{count} λεπτά ανάγνωσης",
  allArticles: "Όλα τα άρθρα",
  sources: "Πηγές",
  commonQuestions: "Συχνές ερωτήσεις",
  keepReading: "Διαβάστε επίσης",
  home: "Αρχική",
};

const copy = { en, el };

export function articlesMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/articles", title: t.metaTitle, description: t.metaDescription });
}

export function ArticlesView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { dateLocale } = localeSettings[locale];
  return (
    <main className="articles-page motion-page">
      <PageMotion />
      <section className="lit-hero">
        <div className="site-container">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.titleLead} <em>{t.titleAccent}</em></h1>
          <p className="lit-hero-lead">{t.lead}</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container article-list">
          {getArticles(locale).map((article) => (
            <Link className="article-card" href={localizePath(locale, `/articles/${article.slug}`)} key={article.slug} data-motion="rise">
              <p className="eyebrow">{article.eyebrow}</p>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <span className="article-card-meta">
                <time dateTime={article.published}>{formatArticleDate(article.published, dateLocale)}</time> · {t.minRead.replace("{count}", String(article.readingMinutes))}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function articleMetadata(locale: Locale, slug: string) {
  const article = getLocalizedArticle(locale, slug);
  if (!article) return {};
  return pageMetadata({ locale, path: `/articles/${article.slug}`, title: article.seoTitle, description: article.description, article: { publishedTime: article.published, modifiedTime: article.updated } });
}

/** Renders the article, or returns null for an unknown slug so the route can 404. */
export function ArticleView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = copy[locale];
  const article = getLocalizedArticle(locale, slug);
  if (!article) return null;
  const { dateLocale } = localeSettings[locale];
  const cta = article.cta ?? getDefaultArticleCta(locale);
  const related = getArticles(locale).filter((other) => other.slug !== article.slug).slice(0, 2);
  const path = (href: string) => localizePath(locale, href);
  const minRead = (minutes: number) => t.minRead.replace("{count}", String(minutes));

  const url = `${siteConfig.url}${path(`/articles/${article.slug}`)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        url,
        mainEntityOfPage: url,
        datePublished: article.published,
        dateModified: article.updated,
        inLanguage: locale,
        image: `${siteConfig.url}/images/social/og-default.jpg`,
        citation: article.sources.map(([name, href]) => ({ "@type": "CreativeWork", name, url: href })),
        author: { "@id": `${siteConfig.url}/#organization` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: `${siteConfig.url}${locale === "en" ? "" : path("/")}` },
          { "@type": "ListItem", position: 2, name: t.eyebrow, item: `${siteConfig.url}${path("/articles")}` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  };

  return (
    <main className="article-page motion-page">
      <PageMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <section className="lit-hero article-hero">
        <div className="site-container">
          <Link className="article-back" href={path("/articles")}><ArrowLeft aria-hidden="true" /> {t.allArticles}</Link>
          <p className="eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="article-meta">
            <time dateTime={article.published}>{formatArticleDate(article.published, dateLocale)}</time> · {minRead(article.readingMinutes)} · VISION.
          </p>
        </div>
      </section>

      <article className="article-body site-container">
        {article.body}
        <aside className="article-sources" aria-labelledby="article-sources-title">
          <h2 id="article-sources-title">{t.sources}</h2>
          <ol>
            {article.sources.map(([label, href]) => (
              <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>
            ))}
          </ol>
        </aside>
      </article>

      <section className="article-cta site-container" data-motion="rise">
        <div>
          <p className="eyebrow">{cta.eyebrow}</p>
          <h2>{cta.title}</h2>
          <p>{cta.body}</p>
        </div>
        <Link className="button button-accent button-large" href={cta.href} data-track="article_cta_click" data-track-location={`article_${article.slug}`}>
          {cta.label} <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="article-faq site-container">
        <h2>{t.commonQuestions}</h2>
        <FAQList list={article.faqs} />
      </section>

      {related.length > 0 && (
        <section className="article-related site-container">
          <h2>{t.keepReading}</h2>
          <div className="article-list">
            {related.map((other) => (
              <Link className="article-card" href={path(`/articles/${other.slug}`)} key={other.slug}>
                <p className="eyebrow">{other.eyebrow}</p>
                <h3>{other.title}</h3>
                <span className="article-card-meta">{minRead(other.readingMinutes)} <ArrowRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
