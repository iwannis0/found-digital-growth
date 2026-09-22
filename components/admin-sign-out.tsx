"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminSignOut() {
  const router = useRouter();
  async function signOut() { await fetch("/api/admin/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }
  return <button type="button" onClick={signOut}><LogOut />Sign out</button>;
}
