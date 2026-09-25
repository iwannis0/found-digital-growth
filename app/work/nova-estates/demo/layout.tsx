import type { Metadata } from "next";
import { NovaConceptBar } from "./nova-header";

export const metadata: Metadata = {
  title: "NOVA Estates Website Concept",
  description: "A fictional luxury property website concept created for the FOUND. portfolio.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/work/nova-estates/demo" },
};

export default function NovaDemoLayout({children}:{children:React.ReactNode}) { return <><NovaConceptBar />{children}</>; }
