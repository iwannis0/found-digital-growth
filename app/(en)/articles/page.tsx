import { ArticlesView, articlesMetadata } from "@/views/articles";

export const metadata = articlesMetadata("en");

export default function ArticlesPage() {
  return <ArticlesView locale="en" />;
}
