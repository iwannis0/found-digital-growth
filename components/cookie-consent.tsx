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
import { consentChangedEvent, consentStorageKey, hasAnalyticsConsent, syncAnalyticsConsent } from "@/lib/analytics-consent";

type Consent = "accepted" | "rejected";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const value = window.localStorage.getItem(consentStorageKey);
    if (!value) queueMicrotask(() => setVisible(true));
    const open = () => { setAnalytics(hasAnalyticsConsent()); setManage(true); };
    window.addEventListener("found:cookie-settings", open);
    return () => window.removeEventListener("found:cookie-settings", open);
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
        <aside className="cookie-banner" aria-label="Cookie consent">
          <div>
            <strong>Your privacy, clearly handled.</strong>
            <p>We use essential cookies to run this site. Analytics only starts with your permission.</p>
          </div>
          <div className="cookie-actions">
            <Button variant="ghost" onClick={() => { setAnalytics(hasAnalyticsConsent()); setManage(true); }}>Manage</Button>
            <Button variant="outline" onClick={() => save("rejected")}>Reject</Button>
            <Button onClick={() => save("accepted")}>Accept</Button>
          </div>
        </aside>
      )}
      <Dialog open={manage} onOpenChange={setManage}>
        <DialogContent className="cookie-dialog">
          <DialogHeader>
            <DialogTitle>Cookie settings</DialogTitle>
            <DialogDescription>Choose whether FOUND. may use analytics to improve the website.</DialogDescription>
          </DialogHeader>
          <div className="cookie-setting-row">
            <div><strong>Essential</strong><p>Required for core website functions and consent storage.</p></div>
            <span>Always on</span>
          </div>
          <div className="cookie-setting-row">
            <div><strong>Analytics</strong><p>Helps us understand visits and meaningful actions.</p></div>
            <Switch checked={analytics} onCheckedChange={setAnalytics} aria-label="Allow analytics cookies" />
          </div>
          <DialogFooter>
            <Button onClick={() => save(analytics ? "accepted" : "rejected")}>Save choices</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
