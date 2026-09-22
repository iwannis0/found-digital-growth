import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";

export async function requireAdminPage(returnTo = "/admin") {
  const user = await getAdminSession();
  if (!user) redirect(`/admin/login?returnTo=${encodeURIComponent(returnTo)}`);
  return user;
}

export async function getAdmin() { return getAdminSession(); }
export async function requireAdminApi() { const user = await getAdmin(); return user ? null : Response.json({ ok: false, error: "unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } }); }
