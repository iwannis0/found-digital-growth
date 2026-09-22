import type { Metadata } from "next";
import { AuraDemo } from "./aura-demo";
import "./aura-demo.css";

export const metadata: Metadata = {
  title: "AURA Dental Website Concept",
  description: "Explore a complete, responsive dental website concept created for the FOUND. portfolio.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/work/aura-dental/demo" },
};

export default function AuraDentalDemoPage() {
  return <AuraDemo />;
}
