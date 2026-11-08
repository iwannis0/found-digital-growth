import { FAQView, faqMetadata } from "@/views/faq";

export const metadata = faqMetadata("en");

export default function FAQPage() {
  return <FAQView locale="en" />;
}
