import "./globals.css";
import type { Metadata } from "next";
import { NotFoundContent } from "@/components/state-pages";
import { rootMetadata, SiteShell } from "@/components/site-shell";

// Answers URLs that match no route at all (the site has two root layouts, so there is no
// single layout to wrap a 404). Unknown /gr/... paths are caught earlier by the Greek catch-all.
export const metadata: Metadata = { ...rootMetadata("en"), title: "Page not found | VISION.", robots: { index: false } };

export default function GlobalNotFound() {
  return <SiteShell locale="en"><NotFoundContent locale="en" /></SiteShell>;
}
