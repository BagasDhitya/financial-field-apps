import type { ArticleSummary, Author, AuthorSummary } from "@/types";

import type { StrapiAuthor } from "../strapi-types";

import { mapMedia } from "./media";

export function mapAuthorSummary(entry: StrapiAuthor): AuthorSummary {
  return {
    id: entry.documentId,
    slug: entry.slug ?? "",
    fullName: entry.full_name ?? "",
    roleTitle: entry.role_title ?? null,
    avatar: mapMedia(entry.avatar),
  };
}

export function mapAuthor(
  entry: StrapiAuthor,
  writtenArticles: ArticleSummary[],
  supervisedArticles: ArticleSummary[],
): Author {
  return {
    ...mapAuthorSummary(entry),
    bio: entry.bio ?? null,
    writtenArticles,
    supervisedArticles,
  };
}
