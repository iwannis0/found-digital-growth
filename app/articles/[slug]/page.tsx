import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FAQList } from "@/components/faq-list";
import { PageMotion } from "@/components/page-motion";
import { articles, defaultArticleCta, formatArticleDate, getArticle } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.published, modifiedTime: article.updated },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const cta = article.cta ?? defaultArticleCta;
  const related = articles.filter((other) => other.slug !== article.slug).slice(0, 2);

  const url = `${siteConfig.url}/articles/${article.slug}`;
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
        inLanguage: "en",
        image: `${siteConfig.url}/images/social/og-default.jpg`,
        citation: article.sources.map(([name, href]) => ({ "@type": "CreativeWork", name, url: href })),
        author: { "@id": `${siteConfig.url}/#organization` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Articles", item: `${siteConfig.url}/articles` },
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
          <Link className="article-back" href="/articles"><ArrowLeft aria-hidden="true" /> All articles</Link>
          <p className="eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="article-meta">
            <time dateTime={article.published}>{formatArticleDate(article.published)}</time> · {article.readingMinutes} min read · VISION.
          </p>
        </div>
      </section>

      <article className="article-body site-container">
        {article.body}
        <aside className="article-sources" aria-labelledby="article-sources-title">
          <h2 id="article-sources-title">Sources</h2>
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
        <h2>Common questions</h2>
        <FAQList list={article.faqs} />
      </section>

      {related.length > 0 && (
        <section className="article-related site-container">
          <h2>Keep reading</h2>
          <div className="article-list">
            {related.map((other) => (
              <Link className="article-card" href={`/articles/${other.slug}`} key={other.slug}>
                <p className="eyebrow">{other.eyebrow}</p>
                <h3>{other.title}</h3>
                <span className="article-card-meta">{other.readingMinutes} min read <ArrowRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
