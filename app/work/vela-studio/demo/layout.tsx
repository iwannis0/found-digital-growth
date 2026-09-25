import type { Metadata } from "next";
import "./vela-demo.css";
import { VelaBooking, VelaConceptBar, VelaMotion, VelaNav } from "./vela-client";

export const metadata: Metadata = {
  title: "VELA Studio — Beauty & Wellness",
  description: "A fictional editorial beauty and wellness website concept by FOUND.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/work/vela-studio/demo" },
};

export default function VelaDemoLayout({ children }: { children: React.ReactNode }) {
  return <div className="vela-demo"><VelaConceptBar /><VelaNav /><VelaMotion /><VelaBooking />{children}</div>;
}
