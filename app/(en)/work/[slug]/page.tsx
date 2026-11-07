import { notFound } from "next/navigation";
import { projectSlugs } from "@/lib/routes";
import { ProjectView, projectMetadata } from "@/views/project";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return projectMetadata("en", (await params).slug);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(projectSlugs as readonly string[]).includes(slug)) notFound();
  return <ProjectView locale="en" slug={slug} />;
}
