"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  CONSENT_CHANGE_EVENT,
  parseConsent,
  type ConsentChoice,
} from "@/lib/analytics/consent";
import { ANALYTICS_READY_EVENT, track } from "@/lib/analytics/events";

export type AnalyticsProps = { measurementId: string };

function installGtag(measurementId: string) {
  window.dataLayer = window.dataLayer ?? [];
  // gtag.js reads the `arguments` object, not an array.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  // Consent Mode v2: defaults denied before any tag (ADR-0008).
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  // Page views are sent manually, once per navigation (REQ-ANL-004).
  window.gtag("config", measurementId, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
  window.dispatchEvent(new Event(ANALYTICS_READY_EVENT));
}

function sendPageView() {
  track("page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

/**
 * GA4 after opt-in consent only (REQ-ANL-001). Also delegates clicks on
 * `[data-track]` elements to events, so server components can be tracked
 * without becoming client components.
 */
export function Analytics({ measurementId }: AnalyticsProps) {
  const pathname = usePathname();
  const loaded = useRef(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    function load() {
      if (loaded.current) {
        return;
      }
      loaded.current = true;
      installGtag(measurementId);
      lastPath.current = window.location.pathname;
      sendPageView();
    }

    if (parseConsent(document.cookie) === "granted") {
      load();
    }

    function onConsent(event: Event) {
      const choice = (event as CustomEvent<ConsentChoice>).detail;
      if (choice === "granted") {
        load();
        track("consent_update", { analytics: "granted" });
      } else if (loaded.current && window.gtag) {
        window.gtag("consent", "update", { analytics_storage: "denied" });
      }
    }

    function onClick(event: MouseEvent) {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-track]",
      );
      if (!target) {
        return;
      }
      const { track: name, contentType, itemId } = target.dataset;
      if (name === "select_content" && contentType && itemId) {
        track("select_content", { content_type: contentType, item_id: itemId });
      }
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, onConsent);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsent);
      document.removeEventListener("click", onClick);
    };
  }, [measurementId]);

  useEffect(() => {
    if (!loaded.current || lastPath.current === pathname) {
      return;
    }
    lastPath.current = pathname;
    // Let the new page set document.title first.
    const id = window.setTimeout(sendPageView, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
