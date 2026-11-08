import { PrivacyView, privacyMetadata } from "@/views/privacy";

export const metadata = privacyMetadata("en");

export default function PrivacyPage() {
  return <PrivacyView locale="en" />;
}
