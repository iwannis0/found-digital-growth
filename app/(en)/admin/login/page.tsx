import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin";
import { AdminLoginForm } from "@/components/admin-login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect("/admin");
  return <AdminLoginForm />;
}
