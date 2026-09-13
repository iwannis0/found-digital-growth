import Link from "next/link";
import { BarChart3, ClipboardCheck, LogOut, Settings, Users } from "lucide-react";
import { chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, authorized } = await requireAdmin("/admin");
  if (!authorized) return <main className="admin-denied"><div><p className="wordmark">FOUND<span>.</span></p><h1>Admin access is not enabled for {user.email}.</h1><p>Add this address to the secure ADMIN_EMAILS environment variable or sign in with an authorised account.</p><a className="button button-dark" href={chatGPTSignOutPath("/admin")} target="_top">Switch account</a></div></main>;
  return <div className="admin-shell"><aside className="admin-sidebar"><Link className="wordmark wordmark-light" href="/admin">FOUND<span>.</span></Link><nav><Link href="/admin"><BarChart3 />Dashboard</Link><Link href="/admin/leads"><Users />Leads</Link><Link href="/admin/audits"><ClipboardCheck />Audits</Link><Link href="/admin/settings"><Settings />Settings</Link></nav><div className="admin-user"><small>Signed in as</small><strong>{user.displayName}</strong><a href={chatGPTSignOutPath("/")} target="_top"><LogOut />Sign out</a></div></aside><div className="admin-content">{children}</div></div>;
}
