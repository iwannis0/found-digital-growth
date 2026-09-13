import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";
import { redirect } from "next/navigation";

function allowlist() { return (process.env.ADMIN_EMAILS ?? "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean); }
function isAllowed(email: string) { return allowlist().includes(email.trim().toLowerCase()); }

export async function requireAdminPage(returnTo = "/admin") {
  const { user, authorized } = await requireAdmin(returnTo);
  if (!authorized) redirect("/");
  return user;
}

export async function requireAdmin(returnTo = "/admin") { const user = await requireChatGPTUser(returnTo); return { user, authorized: isAllowed(user.email) }; }
export async function getAdmin() { const user = await getChatGPTUser(); return user && isAllowed(user.email) ? user : null; }
export async function requireAdminApi() { const user = await getAdmin(); return user ? null : Response.json({ ok: false, error: "unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } }); }
