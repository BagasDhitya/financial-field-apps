import { env } from "@/lib/env";

/** "1"/"true"/"on" enable, "0"/"false"/"off" disable, anything else falls back. */
export function parseFlag(
  value: string | undefined,
  fallback: boolean,
): boolean {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "1" || normalized === "true" || normalized === "on") {
    return true;
  }
  if (normalized === "0" || normalized === "false" || normalized === "off") {
    return false;
  }
  return fallback;
}

/**
 * One gate per behaviour, default off (conventions W4). Later-phase hooks
 * (comparison, ads, newsletter) render nothing until their flag is on.
 */
export const features = {
  comparison: parseFlag(env.featureFlags.comparison, false),
  ads: parseFlag(env.featureFlags.ads, false),
  newsletter: parseFlag(env.featureFlags.newsletter, false),
  harness: parseFlag(env.featureFlags.harness, false),
  faqSchema: parseFlag(env.featureFlags.faqSchema, true),
} as const;
