import { cacheTags } from "@/lib/cms/cache-tags";
import { hasCapability } from "@/lib/cms/capabilities";
import { cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import type { StrapiRedirect } from "@/lib/cms/strapi-types";
import { log } from "@/lib/log";
import { REVALIDATE } from "@/lib/revalidate";

export type RedirectRule = { from: string; to: string; status: 301 | 308 };

export function normalizePath(path: string): string {
  const trimmed = path.trim().toLowerCase();
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : withSlash;
}

/**
 * Resolves a rule to its final target so a request is redirected in one hop
 * (REQ-SEO-015), ignoring loops.
 */
export function resolveRedirect(
  rules: RedirectRule[],
  path: string,
): RedirectRule | null {
  const byFrom = new Map(rules.map((rule) => [normalizePath(rule.from), rule]));
  const first = byFrom.get(normalizePath(path));
  if (!first) {
    return null;
  }
  const visited = new Set([normalizePath(path)]);
  let target = first.to;
  for (let hop = 0; hop < 10; hop++) {
    const next = byFrom.get(normalizePath(target));
    if (!next || visited.has(normalizePath(target))) {
      break;
    }
    visited.add(normalizePath(target));
    target = next.to;
  }
  return visited.has(normalizePath(target)) ? null : { ...first, to: target };
}

export async function getRedirectRules(): Promise<RedirectRule[]> {
  if (!hasCapability("redirects")) {
    return [];
  }
  try {
    const result = await cmsFetch<CmsCollection<StrapiRedirect>>({
      path: endpoints.redirects,
      query: {
        fields: ["from_path", "to_path", "status_code"],
        pagination: { limit: 100 },
      },
      tags: [cacheTags.redirects()],
      revalidate: REVALIDATE.sitemap,
    });
    return result.data.flatMap((entry) =>
      entry.from_path && entry.to_path
        ? [
            {
              from: entry.from_path,
              to: entry.to_path,
              status: entry.status_code === 308 ? 308 : 301,
            } satisfies RedirectRule,
          ]
        : [],
    );
  } catch (error) {
    log.warn(
      "content::getRedirectRules",
      "redirects unavailable",
      String(error),
    );
    return [];
  }
}
