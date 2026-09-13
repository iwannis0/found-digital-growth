import { count, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { auditRequests, leads } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const db = getDb();
  const [leadCount] = await db.select({ value: count() }).from(leads); const [newCount] = await db.select({ value: count() }).from(leads).where(eq(leads.status, "NEW")); const [auditCount] = await db.select({ value: count() }).from(auditRequests); const [wonCount] = await db.select({ value: count() }).from(leads).where(eq(leads.status, "WON")); const [meetingCount] = await db.select({ value: count() }).from(leads).where(eq(leads.status, "MEETING_BOOKED")); const [proposalCount] = await db.select({ value: count() }).from(leads).where(eq(leads.status, "PROPOSAL_SENT")); const [revenue] = await db.select({ value: sql<number>`coalesce(sum(${leads.estimatedValue}), 0)` }).from(leads).where(eq(leads.status, "WON"));
  const metrics = [["Total Leads", leadCount.value], ["New Leads", newCount.value], ["Audits", auditCount.value], ["Meetings", meetingCount.value], ["Proposals", proposalCount.value], ["Won", wonCount.value], ["Won Value", `€${Number(revenue.value).toLocaleString()}`]];
  return <main className="admin-page"><div className="admin-heading"><div><p>FOUND. CONTROL ROOM</p><h1>Dashboard</h1></div><span>Live pipeline</span></div><section className="admin-metrics">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="admin-panel"><p className="eyebrow">Pipeline guide</p><h2>Lead → Audit → Discovery → Proposal → Deposit → Build → Launch → Grow</h2><p>Use Leads and Audits to update status, add private notes and export records for follow-up.</p></section></main>;
}
