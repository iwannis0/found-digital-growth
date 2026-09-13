import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { noStoreJson } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin";

export async function GET(request: Request) { const denied=await requireAdminApi(); if(denied)return denied; const status=new URL(request.url).searchParams.get("status"); const db=getDb(); const rows=status?await db.select().from(leads).where(eq(leads.status,status)).orderBy(desc(leads.createdAt)).limit(500):await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(500); return noStoreJson({ok:true,leads:rows}); }
