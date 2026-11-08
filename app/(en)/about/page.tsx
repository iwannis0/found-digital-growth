import { AboutView, aboutMetadata } from "@/views/about";

export const metadata = aboutMetadata("en");

export default function AboutPage() {
  return <AboutView locale="en" />;
}
