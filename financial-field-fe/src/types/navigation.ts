import type { ArticleSummary } from "./article";
import type { CategorySummary } from "./category";

export type MenuItem = {
  label: string;
  url: string | null;
  category: CategorySummary | null;
};

export type SiteNavigation = {
  menuItems: MenuItem[];
  featuredArticles: ArticleSummary[];
};
