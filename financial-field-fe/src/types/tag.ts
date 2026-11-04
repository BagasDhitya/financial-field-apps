import type { SeoFields } from "./seo";

export type TagSummary = {
  id: string;
  slug: string;
  name: string;
};

export type Tag = TagSummary & {
  description: string | null;
  seo: SeoFields | null;
};
