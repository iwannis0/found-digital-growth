import { ArticlesView, articlesMetadata } from "@/views/articles";

export const metadata = articlesMetadata("el");

export default function GreekArticlesPage() {
  return <ArticlesView locale="el" />;
}
