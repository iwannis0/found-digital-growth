import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";

function allowlist() { return (process.env.ADMIN_EMAILS ?? "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean); }
function isAllowed(email: string) { const allowed = allowlist(); return allowed.length === 0 || allowed.includes(email.toLowerCase()); }

export async function requireAdmin(returnTo = "/admin") { const user = await requireChatGPTUser(returnTo); return { user, authorized: isAllowed(user.email) }; }
export async function getAdmin() { const user = await getChatGPTUser(); return user && isAllowed(user.email) ? user : null; }
export async function requireAdminApi() { const user = await getAdmin(); return user ? null : Response.json({ ok: false, error: "unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } }); }
