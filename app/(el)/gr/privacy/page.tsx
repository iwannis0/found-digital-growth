import { PrivacyView, privacyMetadata } from "@/views/privacy";

export const metadata = privacyMetadata("el");

export default function GreekPrivacyPage() {
  return <PrivacyView locale="el" />;
}
