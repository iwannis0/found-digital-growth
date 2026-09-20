import type { Metadata } from "next";
import { AuraDentalDemo } from "@/components/aura-dental-demo";
import "../../../aura-dental.css";

export const metadata: Metadata = {
  title: "AURA Dental Website Concept",
  description: "Explore the AURA Dental responsive website concept created by FOUND.",
  alternates: { canonical: "/work/aura-dental/demo" },
  robots: { index: false, follow: true },
};

export default function AuraDentalDemoPage() {
  return <AuraDentalDemo />;
}
