import { requireAdminPage } from "@/lib/admin";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { auditRequests } from "@/db/schema";
import { AdminAuditsTable } from "@/components/admin-audits-table";
export const dynamic = "force-dynamic";
export default async function AdminAuditsPage({ searchParams }: { searchParams: Promise<{ audit?: string }> }) { const { audit } = await searchParams; const selectedAuditId = Number(audit); await requireAdminPage(audit ? `/admin/audits?audit=${encodeURIComponent(audit)}` : "/admin/audits"); const rows = await getDb().select().from(auditRequests).orderBy(desc(auditRequests.createdAt)).limit(500); return <main className="admin-page"><div className="admin-heading"><div><p>WEBSITE REVIEWS</p><h1>Audits</h1></div><a className="button button-dark" href="/api/admin/export/audits">Export CSV</a></div><AdminAuditsTable initialRows={rows} selectedAuditId={Number.isInteger(selectedAuditId) && selectedAuditId > 0 ? selectedAuditId : undefined} /></main>; }
