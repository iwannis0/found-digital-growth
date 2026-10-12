import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageMotion } from "@/components/page-motion";
import { articles, formatArticleDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles: Websites & Local SEO in Cyprus",
  description: "Practical guides for Cyprus business owners on website costs, design, local SEO and getting found on Google.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <main className="articles-page motion-page">
      <PageMotion />
      <section className="lit-hero">
        <div className="site-container">
          <p className="eyebrow">Articles</p>
          <h1>Straight answers <em>for business owners.</em></h1>
          <p className="lit-hero-lead">Practical guides on websites, costs and getting found on Google in Cyprus.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container article-list">
          {articles.map((article) => (
            <Link className="article-card" href={`/articles/${article.slug}`} key={article.slug} data-motion="rise">
              <p className="eyebrow">{article.eyebrow}</p>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <span className="article-card-meta">
                <time dateTime={article.published}>{formatArticleDate(article.published)}</time> · {article.readingMinutes} min read
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
