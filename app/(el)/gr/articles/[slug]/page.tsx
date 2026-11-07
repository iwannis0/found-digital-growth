import { notFound } from "next/navigation";
import { articleSlugs } from "@/lib/routes";
import { ArticleView, articleMetadata } from "@/views/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return articleMetadata("el", (await params).slug);
}

export default async function GreekArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(articleSlugs as readonly string[]).includes(slug)) notFound();
  return <ArticleView locale="el" slug={slug} />;
}
