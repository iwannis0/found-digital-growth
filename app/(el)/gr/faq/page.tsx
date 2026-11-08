import { FAQView, faqMetadata } from "@/views/faq";

export const metadata = faqMetadata("el");

export default function GreekFAQPage() {
  return <FAQView locale="el" />;
}
