import { FreeAuditView, freeAuditMetadata } from "@/views/free-audit";

export const metadata = freeAuditMetadata("el");

export default function GreekFreeAuditPage() {
  return <FreeAuditView locale="el" />;
}
