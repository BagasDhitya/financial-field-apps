import { NextResponse, type NextRequest } from "next/server";

import {
  getRedirectRules,
  resolveRedirect,
  type RedirectRule,
} from "@/lib/content/redirects";
import { env } from "@/lib/env";

const RULES_TTL_MS = 5 * 60 * 1000;

let cachedRules: { rules: RedirectRule[]; expires: number } | null = null;

/** CMS redirect rules (CMS-15), cached in memory for five minutes. */
async function loadRules(): Promise<RedirectRule[]> {
  const now = Date.now();
  if (cachedRules && cachedRules.expires > now) {
    return cachedRules.rules;
  }
  const rules = await getRedirectRules();
  cachedRules = { rules, expires: now + RULES_TTL_MS };
  return rules;
}

/**
 * Runs before routes render:
 * 1. `/…/halaman/1` → its base URL (REQ-SEO-006);
 * 2. CMS slug-change redirects, single hop (REQ-SEO-015);
 * 3. `X-Robots-Tag: noindex, nofollow` outside production (REQ-SEO-012).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstPage = pathname.match(/^(.*)\/halaman\/1\/?$/);
  if (firstPage) {
    return NextResponse.redirect(
      new URL(firstPage[1] || "/", request.url),
      301,
    );
  }

  const rule = resolveRedirect(await loadRules(), pathname);
  if (rule) {
    return NextResponse.redirect(new URL(rule.to, request.url), rule.status);
  }

  const response = NextResponse.next();
  if (env.siteEnv !== "production") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
