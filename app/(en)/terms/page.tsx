import { TermsView, termsMetadata } from "@/views/terms";

export const metadata = termsMetadata("en");

export default function TermsPage() {
  return <TermsView locale="en" />;
}
