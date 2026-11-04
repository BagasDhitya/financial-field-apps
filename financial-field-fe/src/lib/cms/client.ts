import qs from "qs";

import { env } from "@/lib/env";

type CmsRequest = {
  path: string;
  query?: Record<string, unknown>;
  tags: string[];
  revalidate: number | false;
  draft?: boolean;
  /** Shape returned when SKIP_CMS_FETCH is on (CI builds without Strapi). */
  kind?: "collection" | "single";
};

export type CmsPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type CmsCollection<T> = {
  data: T[];
  meta: { pagination: CmsPagination };
};

export type CmsSingle<T> = { data: T | null };

export class CmsError extends Error {
  readonly status: number;
  readonly path: string;

  constructor(status: number, path: string, body: string) {
    super(`Strapi ${status} on ${path}: ${body.slice(0, 300)}`);
    this.name = "CmsError";
    this.status = status;
    this.path = path;
  }
}

const EMPTY_COLLECTION: CmsCollection<never> = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
};

function authorization(draft: boolean): Record<string, string> {
  const token = draft
    ? env.cmsPreviewToken || env.cmsApiToken
    : env.cmsApiToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * The only place the app talks to Strapi. Owns auth, cache tags, revalidation,
 * and error shape so no caller has to think about any of them.
 */
export async function cmsFetch<T>({
  path,
  query,
  tags,
  revalidate,
  draft = false,
  kind = "collection",
}: CmsRequest): Promise<T> {
  if (env.skipCmsFetch) {
    return (kind === "single" ? { data: null } : EMPTY_COLLECTION) as T;
  }

  const search = qs.stringify(
    { ...query, ...(draft ? { status: "draft" } : {}) },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const response = await fetch(`${env.cmsUrl}/api${path}${search}`, {
    headers: authorization(draft),
    ...(draft
      ? { cache: "no-store" as const }
      : { next: { tags, revalidate } }),
  });

  if (!response.ok) {
    throw new CmsError(response.status, path, await response.text());
  }

  return (await response.json()) as T;
}
