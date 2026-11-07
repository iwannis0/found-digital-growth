import "../globals.css";
import { rootMetadata, SiteShell } from "@/components/site-shell";

// Root layout for the English site, served without a prefix. The Greek site has its own
// root layout in app/(el) so each language ships server-rendered with the right lang.
export const metadata = rootMetadata("en");

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
