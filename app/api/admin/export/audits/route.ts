import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { auditRequests } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin";
import { auditTotal } from "@/lib/audit-scoring";
import { csvCell } from "@/lib/csv";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const rows = await getDb().select().from(auditRequests).orderBy(desc(auditRequests.createdAt));
  const headings = ["ID", "Created Date", "Name", "Business", "Email", "Phone", "Website", "Industry", "City", "Goal", "Current Problem", "Message / Request Details", "Budget", "Status", "Design Score", "Mobile Score", "Conversion Score", "SEO Score", "Google Score", "Performance Score", "Trust Score", "Overall Score", "Internal Notes", "UTM Source", "UTM Medium", "UTM Campaign"];
  const body = rows.map((row) => [row.id, row.createdAt, row.name, row.businessName, row.email, row.phone, row.website, row.industry, row.city, row.goal, row.problem, row.message, row.budget, row.status, row.designScore, row.mobileScore, row.conversionScore, row.seoScore, row.googleScore, row.performanceScore, row.trustScore, auditTotal(row), row.notes, row.utmSource, row.utmMedium, row.utmCampaign].map(csvCell).join(","));
  return new Response([headings.map(csvCell).join(","), ...body].join("\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="found-audits-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "no-store" } });
}
