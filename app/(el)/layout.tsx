import "../globals.css";
import { rootMetadata, SiteShell } from "@/components/site-shell";

// Root layout for the Greek site under /gr (lang="el"). Moving between languages
// crosses root layouts, so the switch is a full page load with the correct document.
export const metadata = rootMetadata("el");

export default function GreekLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="el">{children}</SiteShell>;
}
