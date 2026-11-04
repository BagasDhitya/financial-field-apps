import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "@/lib/env";
import { features } from "@/lib/features";

import { HarnessView } from "@/features/harness/HarnessView";

/** SITE_ENV decides at request time, not at build (same rule as robots.txt). */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Harness komponen",
  robots: { index: false, follow: false },
};

/** Local always; staging with FEATURE_HARNESS=1; production never (T19). */
export default function HarnessPage() {
  const allowed =
    env.siteEnv === "local" || (env.siteEnv === "staging" && features.harness);
  if (!allowed) {
    notFound();
  }
  return <HarnessView />;
}
