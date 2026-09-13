import { requireAdminPage } from "@/lib/admin";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { auditRequests } from "@/db/schema";
import { AdminAuditsTable } from "@/components/admin-audits-table";
export const dynamic = "force-dynamic";
export default async function AdminAuditsPage() { await requireAdminPage("/admin/audits"); const rows = await getDb().select().from(auditRequests).orderBy(desc(auditRequests.createdAt)).limit(500); return <main className="admin-page"><div className="admin-heading"><div><p>WEBSITE REVIEWS</p><h1>Audits</h1></div></div><AdminAuditsTable initialRows={rows} /></main>; }
