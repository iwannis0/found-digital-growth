import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TreatmentPage } from "../../treatment-detail";
import { treatmentDetails } from "../../treatment-data";
import "../../aura-demo.css";
import "../../treatment-detail.css";

export function generateStaticParams() {
  return treatmentDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatmentDetails.find((item) => item.slug === slug);
  return treatment ? {
    title: `${treatment.name} | AURA Dental Website Concept`,
    description: treatment.intro,
    robots: { index: false, follow: true },
    alternates: { canonical: `/work/aura-dental/demo/treatments/${slug}` },
  } : {};
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = treatmentDetails.find((item) => item.slug === slug);
  if (!treatment) notFound();
  return <TreatmentPage treatment={treatment} />;
}
