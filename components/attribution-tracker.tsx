"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/client-attribution";

export function AttributionTracker() {
  useEffect(() => { captureAttribution(); }, []);
  return null;
}
