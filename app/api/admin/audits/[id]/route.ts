import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { auditRequests } from "@/db/schema";
import { readJson, validationResponse } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin";
import { leadStatuses } from "@/lib/site-config";
const score=(max:number)=>z.number().int().min(0).max(max).nullable();
const schema=z.object({status:z.enum(leadStatuses),notes:z.string().max(5000),designScore:score(20),mobileScore:score(20),conversionScore:score(20),seoScore:score(15),googleScore:score(15),trustScore:score(10)});
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){const denied=await requireAdminApi();if(denied)return denied;const {id}=await params;const numericId=Number(id);if(!Number.isInteger(numericId))return Response.json({ok:false,error:"bad_request"},{status:400});try{const parsed=schema.safeParse(await readJson(request));if(!parsed.success)return validationResponse(parsed.error);const [audit]=await getDb().update(auditRequests).set({...parsed.data,updatedAt:sql`CURRENT_TIMESTAMP`}).where(eq(auditRequests.id,numericId)).returning();if(!audit)return Response.json({ok:false,error:"not_found"},{status:404});return Response.json({ok:true,audit});}catch{return Response.json({ok:false,error:"server_error"},{status:500});}}
