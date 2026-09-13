import { requireAdminPage } from "@/lib/admin";
import Link from "next/link";
import { count, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { auditRequests, leads } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminPage("/admin");
  const db = getDb();
  const [leadCount] = await db.select({ value: count() }).from(leads); const [newCount] = await db.select({ value: count() }).from(leads).where(eq(leads.status, "NEW")); const [auditCount] = await db.select({ value: count() }).from(auditRequests); const [wonCount] = await db.select({ value: count() }).from(leads).where(eq(leads.status, "WON")); const [meetingCount] = await db.select({ value: count() }).from(leads).where(eq(leads.status, "MEETING_BOOKED")); const [proposalCount] = await db.select({ value: count() }).from(leads).where(eq(leads.status, "PROPOSAL_SENT")); const [revenue] = await db.select({ value: sql<number>`coalesce(sum(${leads.estimatedValue}), 0)` }).from(leads).where(eq(leads.status, "WON")); const recentAudits = await db.select({ id: auditRequests.id, businessName: auditRequests.businessName, name: auditRequests.name, status: auditRequests.status, createdAt: auditRequests.createdAt }).from(auditRequests).orderBy(desc(auditRequests.createdAt)).limit(5);
  const metrics = [["Total Leads", leadCount.value], ["New Leads", newCount.value], ["Audits", auditCount.value], ["Meetings", meetingCount.value], ["Proposals", proposalCount.value], ["Won", wonCount.value], ["Won Value", `€${Number(revenue.value).toLocaleString()}`]];
  return <main className="admin-page"><div className="admin-heading"><div><p>FOUND. CONTROL ROOM</p><h1>Dashboard</h1></div><span>Live pipeline</span></div><section className="admin-metrics">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="admin-panel"><div className="admin-panel-heading"><div><p className="eyebrow">Latest audit requests</p><h2>Recently submitted</h2></div><Link className="text-link" href="/admin/audits">View all audits</Link></div>{recentAudits.length ? <div className="recent-audits">{recentAudits.map((audit)=><Link href={`/admin/audits?audit=${audit.id}`} key={audit.id}><span><strong>{audit.businessName}</strong><small>{audit.name} · {new Date(audit.createdAt).toLocaleDateString("en-GB")}</small></span><em>{audit.status.replaceAll("_"," ")}</em></Link>)}</div> : <p>No audit requests yet.</p>}</section><section className="admin-panel"><p className="eyebrow">Pipeline guide</p><h2>Lead → Audit → Discovery → Proposal → Deposit → Build → Launch → Grow</h2><p>Use Leads and Audits to update status, add private notes and export records for follow-up.</p></section></main>;
}
