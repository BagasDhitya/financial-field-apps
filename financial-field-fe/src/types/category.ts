import type { ArticleSummary } from "./article";
import type { MediaAsset } from "./media";

export type CategorySummary = {
  id: string;
  slug: string;
  name: string;
};

export type Category = CategorySummary & {
  icon: MediaAsset | null;
  parent: CategorySummary | null;
  children: CategorySummary[];
  articlesInSection: ArticleSummary[];
  articlesMentioning: ArticleSummary[];
};
