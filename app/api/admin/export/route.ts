import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin";
import { csvCell } from "@/lib/csv";
export async function GET(){const denied=await requireAdminApi();if(denied)return denied;const rows=await getDb().select().from(leads).orderBy(desc(leads.createdAt));const headings=["Date","Name","Business","Email","Phone","Website","Service","Package","Status","Source","Priority","Estimated Value","Notes","UTM Source","UTM Medium","UTM Campaign"];const body=rows.map((row)=>[row.createdAt,row.name,row.businessName,row.email,row.phone,row.website,row.service,row.packageName,row.status,row.source,row.priority,row.estimatedValue,row.notes,row.utmSource,row.utmMedium,row.utmCampaign].map(csvCell).join(","));return new Response([headings.map(csvCell).join(","),...body].join("\n"),{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="found-leads-${new Date().toISOString().slice(0,10)}.csv"`,"Cache-Control":"no-store"}});}
