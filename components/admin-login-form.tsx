"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter(); const searchParams = useSearchParams(); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const returnTo = searchParams.get("returnTo")?.startsWith("/admin") ? searchParams.get("returnTo")! : "/admin";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true); const data = new FormData(event.currentTarget);
    try { const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), password: data.get("password") }) }); const result = await response.json() as { error?: string }; if (!response.ok) throw new Error(result.error ?? "Unable to sign in."); router.replace(returnTo); router.refresh(); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to sign in."); } finally { setLoading(false); }
  }
  return <main className="admin-login"><Link className="wordmark" href="/"><span>FOUND</span><i>.</i></Link><section><p className="eyebrow">Private area</p><h1>Admin sign in.</h1><p>Use your FOUND. admin email and password.</p><form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p role="alert" className="admin-login-error">{error}</p>}<button className="button button-dark button-large" disabled={loading}>{loading ? "Signing in..." : <>Sign in <ArrowRight /></>}</button></form></section></main>;
}
