import { AboutView, aboutMetadata } from "@/views/about";

export const metadata = aboutMetadata("el");

export default function GreekAboutPage() {
  return <AboutView locale="el" />;
}
