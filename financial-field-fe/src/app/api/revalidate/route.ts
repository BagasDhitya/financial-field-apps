import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { cacheTags } from "@/lib/cms/cache-tags";
import { env } from "@/lib/env";

type StrapiWebhookBody = {
  event: string;
  model: string;
  entry?: { documentId?: string; slug?: string; ticker_symbol?: string };
};

/**
 * Maps a Strapi model to the tags that must be invalidated. Each entry
 * invalidates its own tag plus its collection tag, because a publish changes
 * both the entity page and every listing the entity appears in.
 */
const TAGS_BY_MODEL: Record<
  string,
  (entry: NonNullable<StrapiWebhookBody["entry"]>) => string[]
> = {
  article: (entry) => [
    cacheTags.articles(),
    cacheTags.navigation(),
    ...(entry.slug ? [cacheTags.article(entry.slug)] : []),
  ],
  category: (entry) => [
    cacheTags.categories(),
    cacheTags.navigation(),
    ...(entry.slug ? [cacheTags.category(entry.slug)] : []),
  ],
  tag: (entry) => [
    cacheTags.tags(),
    ...(entry.slug ? [cacheTags.tag(entry.slug)] : []),
  ],
  "writer-profile": (entry) => [
    cacheTags.authors(),
    ...(entry.slug ? [cacheTags.author(entry.slug)] : []),
  ],
  "stock-ticker": (entry) => [
    cacheTags.tickers(),
    ...(entry.ticker_symbol ? [cacheTags.ticker(entry.ticker_symbol)] : []),
  ],
  "site-navigation": () => [cacheTags.navigation()],
};

export async function POST(request: Request) {
  if (
    request.headers.get("authorization") !== `Bearer ${env.revalidateSecret}`
  ) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  const body = (await request.json()) as StrapiWebhookBody;
  const tags = TAGS_BY_MODEL[body.model]?.(body.entry ?? {}) ?? [];

  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json({ revalidated: true, model: body.model, tags });
}
