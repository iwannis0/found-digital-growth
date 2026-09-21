"use client";

const adminDataChangedEvent = "found-admin-data-changed";
const adminDataChangedKey = "found-admin-data-updated";

export function notifyAdminDataChanged() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(adminDataChangedKey, String(Date.now()));
  window.dispatchEvent(new Event(adminDataChangedEvent));
}

export { adminDataChangedEvent, adminDataChangedKey };
