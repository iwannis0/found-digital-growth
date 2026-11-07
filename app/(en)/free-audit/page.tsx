import { FreeAuditView, freeAuditMetadata } from "@/views/free-audit";

export const metadata = freeAuditMetadata("en");

export default function FreeAuditPage() {
  return <FreeAuditView locale="en" />;
}
