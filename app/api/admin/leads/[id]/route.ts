import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { readJson, validationResponse } from "@/lib/api";
import { requireAdminApi } from "@/lib/admin";
import { leadStatuses } from "@/lib/site-config";

const updateSchema=z.object({status:z.enum(leadStatuses),priority:z.enum(["HOT","WARM","COLD"]),estimatedValue:z.number().nonnegative().nullable(),notes:z.string().max(5000)});
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){const denied=await requireAdminApi();if(denied)return denied;const {id}=await params;const numericId=Number(id);if(!Number.isInteger(numericId))return Response.json({ok:false,error:"bad_request"},{status:400});try{const parsed=updateSchema.safeParse(await readJson(request));if(!parsed.success)return validationResponse(parsed.error);const [lead]=await getDb().update(leads).set({...parsed.data,updatedAt:sql`now()`}).where(eq(leads.id,numericId)).returning();if(!lead)return Response.json({ok:false,error:"not_found"},{status:404});return Response.json({ok:true,lead});}catch{return Response.json({ok:false,error:"server_error"},{status:500});}}
export async function DELETE(_request:Request,{params}:{params:Promise<{id:string}>}){const denied=await requireAdminApi();if(denied)return denied;const {id}=await params;const numericId=Number(id);if(!Number.isInteger(numericId))return Response.json({ok:false,error:"bad_request"},{status:400});await getDb().delete(leads).where(eq(leads.id,numericId));return Response.json({ok:true});}
