import { notFound } from "next/navigation";
import { serviceSlugs } from "@/lib/routes";
import { ServiceDetailView, serviceMetadata } from "@/views/service-detail";

// The old /services/maintenance and /services/conversion-optimisation URLs redirect in next.config.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return serviceMetadata("el", (await params).slug);
}

export default async function GreekServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(serviceSlugs as readonly string[]).includes(slug)) notFound();
  return <ServiceDetailView locale="el" slug={slug} />;
}
