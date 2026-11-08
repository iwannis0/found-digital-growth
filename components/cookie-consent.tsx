"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import type { Dictionary } from "@/lib/dictionaries";
import { consentChangedEvent, consentStorageKey, hasAnalyticsConsent, syncAnalyticsConsent } from "@/lib/analytics-consent";

type Consent = "accepted" | "rejected";

export function CookieConsent({ copy }: { copy: Dictionary["cookies"] }) {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const value = window.localStorage.getItem(consentStorageKey);
    if (!value) queueMicrotask(() => setVisible(true));
    const open = () => { setAnalytics(hasAnalyticsConsent()); setManage(true); };
    window.addEventListener("site:cookie-settings", open);
    return () => window.removeEventListener("site:cookie-settings", open);
  }, []);

  function save(value: Consent) {
    window.localStorage.setItem(consentStorageKey, value);
    syncAnalyticsConsent();
    setAnalytics(value === "accepted");
    window.dispatchEvent(new CustomEvent(consentChangedEvent, { detail: value }));
    setVisible(false);
    setManage(false);
  }

  return (
    <>
      {visible && (
        <aside className="cookie-banner" aria-label={copy.bannerLabel}>
          <div>
            <strong>{copy.title}</strong>
            <p>{copy.body}</p>
          </div>
          <div className="cookie-actions">
            <Button variant="ghost" onClick={() => { setAnalytics(hasAnalyticsConsent()); setManage(true); }}>{copy.manage}</Button>
            <Button variant="outline" className="cookie-reject" onClick={() => save("rejected")}>{copy.reject}</Button>
            <Button onClick={() => save("accepted")}>{copy.accept}</Button>
          </div>
        </aside>
      )}
      <Dialog open={manage} onOpenChange={setManage}>
        <DialogContent className="cookie-dialog">
          <DialogHeader>
            <DialogTitle>{copy.dialogTitle}</DialogTitle>
            <DialogDescription>{copy.dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="cookie-setting-row">
            <div><strong>{copy.essential}</strong><p>{copy.essentialBody}</p></div>
            <span>{copy.alwaysOn}</span>
          </div>
          <div className="cookie-setting-row">
            <div><strong>{copy.analytics}</strong><p>{copy.analyticsBody}</p></div>
            <Switch checked={analytics} onCheckedChange={setAnalytics} aria-label={copy.allowAnalytics} />
          </div>
          <DialogFooter>
            <Button onClick={() => save(analytics ? "accepted" : "rejected")}>{copy.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
