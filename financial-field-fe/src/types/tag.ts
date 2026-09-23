import type { ArticleSummary } from "./article";

export type TagSummary = {
  id: string;
  slug: string;
  name: string;
};

export type Tag = TagSummary & {
  articles: ArticleSummary[];
};
