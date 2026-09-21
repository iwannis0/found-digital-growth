import { requireAdminPage } from "@/lib/admin";
import Link from "next/link";
import { and, count, desc, eq, inArray, lt, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { auditRequests, leads } from "@/db/schema";

export const dynamic = "force-dynamic";

const activePipelineStatuses = ["QUALIFIED", "CONTACTED", "AUDIT_SENT", "MEETING_BOOKED", "PROPOSAL_SENT", "NEGOTIATION", "NURTURE"];
const formatCurrency = (value: number) => `€${Number(value).toLocaleString()}`;

export default async function AdminPage() {
  await requireAdminPage("/admin");
  const db = getDb();
  async function countStatus(status: string) {
    const [[leadResult], [auditResult]] = await Promise.all([
      db.select({ value: count() }).from(leads).where(eq(leads.status, status)),
      db.select({ value: count() }).from(auditRequests).where(eq(auditRequests.status, status)),
    ]);
    return leadResult.value + auditResult.value;
  }

  const [[leadCount], [auditCount], newCount, qualifiedCount, meetingCount, proposalCount, wonCount, [wonRevenue], [pipelineValue], [overdueLeads], [overdueAudits], [latestLead], [latestAudit], recentAudits] = await Promise.all([
    db.select({ value: count() }).from(leads),
    db.select({ value: count() }).from(auditRequests),
    countStatus("NEW"), countStatus("QUALIFIED"), countStatus("MEETING_BOOKED"), countStatus("PROPOSAL_SENT"), countStatus("WON"),
    db.select({ value: sql<number>`coalesce(sum(${leads.estimatedValue}), 0)` }).from(leads).where(eq(leads.status, "WON")),
    db.select({ value: sql<number>`coalesce(sum(${leads.estimatedValue}), 0)` }).from(leads).where(inArray(leads.status, activePipelineStatuses)),
    db.select({ value: count() }).from(leads).where(and(eq(leads.status, "NEW"), lt(leads.createdAt, sql`datetime('now', '-2 days')`))),
    db.select({ value: count() }).from(auditRequests).where(and(eq(auditRequests.status, "NEW"), lt(auditRequests.createdAt, sql`datetime('now', '-2 days')`))),
    db.select({ updatedAt: leads.updatedAt }).from(leads).orderBy(desc(leads.updatedAt)).limit(1),
    db.select({ updatedAt: auditRequests.updatedAt }).from(auditRequests).orderBy(desc(auditRequests.updatedAt)).limit(1),
    db.select({ id: auditRequests.id, businessName: auditRequests.businessName, name: auditRequests.name, status: auditRequests.status, createdAt: auditRequests.createdAt }).from(auditRequests).orderBy(desc(auditRequests.createdAt)).limit(5),
  ]);

  const latestUpdate = [latestLead?.updatedAt, latestAudit?.updatedAt].filter(Boolean).sort().at(-1);
  const metrics = [["Total Requests", leadCount.value + auditCount.value], ["New Requests", newCount], ["Audits", auditCount.value], ["Meetings", meetingCount], ["Proposals", proposalCount], ["Won", wonCount], ["Lead Won Value", formatCurrency(wonRevenue.value)], ["Pipeline Value", formatCurrency(pipelineValue.value)]];
  const funnel = [["New", newCount], ["Qualified", qualifiedCount], ["Meetings", meetingCount], ["Proposals", proposalCount], ["Won", wonCount]];
  const overdueCount = overdueLeads.value + overdueAudits.value;

  return <main className="admin-page"><div className="admin-heading"><div><p>FOUND. CONTROL ROOM</p><h1>Dashboard</h1>{latestUpdate && <small className="admin-last-updated">Last updated {new Date(`${latestUpdate.replace(" ", "T")}Z`).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</small>}</div><span>Live pipeline</span></div><section className="admin-metrics">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="admin-insights-grid"><div className="admin-panel admin-funnel"><p className="eyebrow">Pipeline view</p><h2>From first request to won work.</h2><div>{funnel.map(([label, value]) => <span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div></div><div className={`admin-panel admin-follow-up${overdueCount ? " is-attention" : ""}`}><p className="eyebrow">Follow-up</p><h2>{overdueCount ? `${overdueCount} new request${overdueCount === 1 ? "" : "s"} needs attention.` : "No overdue new requests."}</h2><p>Requests still marked New after two days appear here. Review them from Leads or Audits.</p></div></section><section className="admin-panel"><div className="admin-panel-heading"><div><p className="eyebrow">Latest audit requests</p><h2>Recently submitted</h2></div><Link className="text-link" href="/admin/audits">View all audits</Link></div>{recentAudits.length ? <div className="recent-audits">{recentAudits.map((audit) => <Link href={`/admin/audits?audit=${audit.id}`} key={audit.id}><span><strong>{audit.businessName}</strong><small>{audit.name} · {new Date(audit.createdAt).toLocaleDateString("en-GB")}</small></span><em>{audit.status.replaceAll("_", " ")}</em></Link>)}</div> : <p>No audit requests yet.</p>}</section><section className="admin-panel"><p className="eyebrow">Pipeline guide</p><h2>Lead → Audit → Discovery → Proposal → Deposit → Build → Launch → Grow</h2><p>Use Leads and Audits to update status, add private notes and export records for follow-up.</p></section></main>;
}
