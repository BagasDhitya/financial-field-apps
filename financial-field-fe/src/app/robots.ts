import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { buildRobots } from "@/lib/seo/robots";

/** Read at request time so SITE_ENV decides, not the build (REQ-SEO-012). */
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  return buildRobots(env.siteEnv, env.siteUrl);
}
