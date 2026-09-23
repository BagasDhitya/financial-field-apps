import type { ArticleSummary } from "./article";
import type { MediaAsset } from "./media";

export type AuthorSummary = {
  id: string;
  slug: string;
  fullName: string;
  roleTitle: string | null;
  avatar: MediaAsset | null;
};

export type Author = AuthorSummary & {
  bio: string | null;
  writtenArticles: ArticleSummary[];
  supervisedArticles: ArticleSummary[];
};
