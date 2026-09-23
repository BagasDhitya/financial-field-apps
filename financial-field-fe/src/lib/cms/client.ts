import qs from "qs";

import { env } from "@/lib/env";

type CmsRequest = {
  path: string;
  query?: Record<string, unknown>;
  tags: string[];
  revalidate: number | false;
  draft?: boolean;
};

export type CmsCollection<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type CmsSingle<T> = { data: T | null };

export class CmsError extends Error {
  readonly status: number;
  readonly path: string;

  constructor(status: number, path: string, body: string) {
    super(`Strapi ${status} on ${path}: ${body}`);
    this.name = "CmsError";
    this.status = status;
    this.path = path;
  }
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
}: CmsRequest): Promise<T> {
  const search = qs.stringify(
    { ...query, ...(draft ? { status: "draft" } : {}) },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const response = await fetch(`${env.cmsUrl}/api${path}${search}`, {
    headers: env.cmsApiToken
      ? { Authorization: `Bearer ${env.cmsApiToken}` }
      : {},
    next: { tags, revalidate },
  });

  if (!response.ok) {
    throw new CmsError(response.status, path, await response.text());
  }

  return (await response.json()) as T;
}
