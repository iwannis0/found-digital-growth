import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ClipboardCheck, Settings, Users } from "lucide-react";
import { getAdmin } from "@/lib/admin";
import { AdminAutoRefresh } from "@/components/admin-auto-refresh";
import { AdminSignOut } from "@/components/admin-sign-out";

export const dynamic = "force-dynamic";

// The admin area, including its login page, must never appear in search results.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdmin();
  if (!user) return children;
  return <div className="admin-shell"><AdminAutoRefresh /><aside className="admin-sidebar"><Link className="wordmark wordmark-light" href="/admin">FOUND<span>.</span></Link><nav><Link href="/admin"><BarChart3 />Dashboard</Link><Link href="/admin/leads"><Users />Leads</Link><Link href="/admin/audits"><ClipboardCheck />Audits</Link><Link href="/admin/settings"><Settings />Settings</Link></nav><div className="admin-user"><small>Signed in as</small><strong>{user.displayName}</strong><AdminSignOut /></div></aside><div className="admin-content">{children}</div></div>;
}
