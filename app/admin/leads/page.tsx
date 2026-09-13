import { requireAdminPage } from "@/lib/admin";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { AdminLeadsTable } from "@/components/admin-leads-table";
export const dynamic = "force-dynamic";
export default async function AdminLeadsPage() { await requireAdminPage("/admin/leads"); const rows = await getDb().select().from(leads).orderBy(desc(leads.createdAt)).limit(500); return <main className="admin-page"><div className="admin-heading"><div><p>PIPELINE</p><h1>Leads</h1></div><a className="button button-dark" href="/api/admin/export">Export CSV</a></div><AdminLeadsTable initialRows={rows} /></main>; }
