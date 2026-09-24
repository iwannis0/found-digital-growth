import { requireAdminPage } from "@/lib/admin";
import Link from "next/link";
import { desc, inArray, lt, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { auditRequests, leads } from "@/db/schema";

export const dynamic = "force-dynamic";

const activePipelineStatuses = ["QUALIFIED", "CONTACTED", "AUDIT_SENT", "MEETING_BOOKED", "PROPOSAL_SENT", "NEGOTIATION", "NURTURE"];
const formatCurrency = (value: number) => `€${Number(value).toLocaleString()}`;

export default async function AdminPage() {
  await requireAdminPage("/admin");
  const db = getDb();
  // One aggregate row per table instead of ~19 parallel queries: keeps the dashboard to a
  // couple of pooled connections, which matters on the Supabase transaction pooler.
  const overdue = sql`now() - interval '2 days'`;
  const byStatus = (column: typeof leads.status | typeof auditRequests.status, status: string) => sql<number>`count(*) filter (where ${column} = ${status})::int`;
  const [[leadStats], [auditStats], recentAudits] = await Promise.all([
    db.select({
      total: sql<number>`count(*)::int`,
      new: byStatus(leads.status, "NEW"), qualified: byStatus(leads.status, "QUALIFIED"), meetings: byStatus(leads.status, "MEETING_BOOKED"), proposals: byStatus(leads.status, "PROPOSAL_SENT"), won: byStatus(leads.status, "WON"),
      wonRevenue: sql<number>`coalesce(sum(${leads.estimatedValue}) filter (where ${leads.status} = 'WON'), 0)::float8`,
      pipelineValue: sql<number>`coalesce(sum(${leads.estimatedValue}) filter (where ${inArray(leads.status, activePipelineStatuses)}), 0)::float8`,
      overdue: sql<number>`count(*) filter (where ${leads.status} = 'NEW' and ${lt(leads.createdAt, overdue)})::int`,
      latestUpdate: sql`max(${leads.updatedAt})`.mapWith(leads.updatedAt),
    }).from(leads),
    db.select({
      total: sql<number>`count(*)::int`,
      new: byStatus(auditRequests.status, "NEW"), qualified: byStatus(auditRequests.status, "QUALIFIED"), meetings: byStatus(auditRequests.status, "MEETING_BOOKED"), proposals: byStatus(auditRequests.status, "PROPOSAL_SENT"), won: byStatus(auditRequests.status, "WON"),
      overdue: sql<number>`count(*) filter (where ${auditRequests.status} = 'NEW' and ${lt(auditRequests.createdAt, overdue)})::int`,
      latestUpdate: sql`max(${auditRequests.updatedAt})`.mapWith(auditRequests.updatedAt),
    }).from(auditRequests),
    db.select({ id: auditRequests.id, businessName: auditRequests.businessName, name: auditRequests.name, status: auditRequests.status, createdAt: auditRequests.createdAt }).from(auditRequests).orderBy(desc(auditRequests.createdAt)).limit(5),
  ]);

  const newCount = leadStats.new + auditStats.new;
  const qualifiedCount = leadStats.qualified + auditStats.qualified;
  const meetingCount = leadStats.meetings + auditStats.meetings;
  const proposalCount = leadStats.proposals + auditStats.proposals;
  const wonCount = leadStats.won + auditStats.won;
  const latestUpdate = [leadStats.latestUpdate, auditStats.latestUpdate].filter((value): value is Date => value instanceof Date).sort((a, b) => a.getTime() - b.getTime()).at(-1);
  const metrics = [["Total Requests", leadStats.total + auditStats.total], ["New Requests", newCount], ["Audits", auditStats.total], ["Meetings", meetingCount], ["Proposals", proposalCount], ["Won", wonCount], ["Lead Won Value", formatCurrency(leadStats.wonRevenue)], ["Pipeline Value", formatCurrency(leadStats.pipelineValue)]];
  const funnel = [["New", newCount], ["Qualified", qualifiedCount], ["Meetings", meetingCount], ["Proposals", proposalCount], ["Won", wonCount]];
  const overdueCount = leadStats.overdue + auditStats.overdue;

  return <main className="admin-page"><div className="admin-heading"><div><p>FOUND. CONTROL ROOM</p><h1>Dashboard</h1>{latestUpdate && <small className="admin-last-updated">Last updated {new Date(latestUpdate).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</small>}</div><span>Live pipeline</span></div><section className="admin-metrics">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="admin-insights-grid"><div className="admin-panel admin-funnel"><p className="eyebrow">Pipeline view</p><h2>From first request to won work.</h2><div>{funnel.map(([label, value]) => <span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div></div><div className={`admin-panel admin-follow-up${overdueCount ? " is-attention" : ""}`}><p className="eyebrow">Follow-up</p><h2>{overdueCount ? `${overdueCount} new request${overdueCount === 1 ? "" : "s"} needs attention.` : "No overdue new requests."}</h2><p>Requests still marked New after two days appear here. Review them from Leads or Audits.</p></div></section><section className="admin-panel"><div className="admin-panel-heading"><div><p className="eyebrow">Latest audit requests</p><h2>Recently submitted</h2></div><Link className="text-link" href="/admin/audits">View all audits</Link></div>{recentAudits.length ? <div className="recent-audits">{recentAudits.map((audit) => <Link href={`/admin/audits?audit=${audit.id}`} key={audit.id}><span><strong>{audit.businessName}</strong><small>{audit.name} · {new Date(audit.createdAt).toLocaleDateString("en-GB")}</small></span><em>{audit.status.replaceAll("_", " ")}</em></Link>)}</div> : <p>No audit requests yet.</p>}</section><section className="admin-panel"><p className="eyebrow">Pipeline guide</p><h2>Lead → Audit → Discovery → Proposal → Deposit → Build → Launch → Grow</h2><p>Use Leads and Audits to update status, add private notes and export records for follow-up.</p></section></main>;
}
