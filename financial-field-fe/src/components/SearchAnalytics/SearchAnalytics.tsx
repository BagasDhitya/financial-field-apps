"use client";

import { useEffect } from "react";

import { analytics, ANALYTICS_READY_EVENT } from "@/lib/analytics/events";

export type SearchAnalyticsProps = { term: string };

/** Sends the sanitized `search` event once per query (SPC-analytics §3). */
export function SearchAnalytics({ term }: SearchAnalyticsProps) {
  useEffect(() => {
    const send = () => analytics.search(term);
    if (typeof window.gtag === "function") {
      send();
      return;
    }
    window.addEventListener(ANALYTICS_READY_EVENT, send, { once: true });
    return () => window.removeEventListener(ANALYTICS_READY_EVENT, send);
  }, [term]);
  return null;
}
