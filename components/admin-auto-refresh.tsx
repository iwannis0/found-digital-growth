"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminDataChangedEvent, adminDataChangedKey } from "@/components/admin-dashboard-sync";

export function AdminAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const refresh = () => router.refresh();
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    const refreshFromAnotherAdminView = () => refresh();
    const refreshFromAnotherTab = (event: StorageEvent) => {
      if (event.key === adminDataChangedKey) refresh();
    };
    const interval = window.setInterval(refreshWhenVisible, 15_000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    window.addEventListener(adminDataChangedEvent, refreshFromAnotherAdminView);
    window.addEventListener("storage", refreshFromAnotherTab);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.removeEventListener(adminDataChangedEvent, refreshFromAnotherAdminView);
      window.removeEventListener("storage", refreshFromAnotherTab);
    };
  }, [router]);

  return null;
}
