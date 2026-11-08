import { TermsView, termsMetadata } from "@/views/terms";

export const metadata = termsMetadata("el");

export default function GreekTermsPage() {
  return <TermsView locale="el" />;
}
