export type StrapiMedia = {
  url?: string | null;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string | null;
};

export type StrapiCategory = {
  documentId: string;
  name?: string | null;
  slug?: string | null;
  icon?: StrapiMedia | null;
};

export type StrapiAuthor = {
  documentId: string;
  full_name?: string | null;
  slug?: string | null;
  role_title?: string | null;
  avatar?: StrapiMedia | null;
  bio?: string | null;
};

export type StrapiTag = {
  documentId: string;
  name?: string | null;
  slug?: string | null;
};

export type StrapiTicker = {
  documentId: string;
  ticker_symbol?: string | null;
  company_name?: string | null;
};

export type StrapiArticle = {
  documentId: string;
  title?: string | null;
  slug?: string | null;
  lead_text?: string | null;
  content?: readonly Record<string, unknown>[] | null;
  article_type?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  featured_image?: StrapiMedia | null;
  primary_category?: StrapiCategory | null;
  author?: StrapiAuthor | null;
  reviewer?: StrapiAuthor | null;
  categories?: StrapiCategory[] | null;
  tags?: StrapiTag[] | null;
  stocks_mentioned?: StrapiTicker[] | null;
};

export type StrapiMenuItem = {
  label?: string | null;
  url?: string | null;
  category_ref?: StrapiCategory[] | null;
};

export type StrapiNavigation = {
  menu_item?: StrapiMenuItem[] | null;
  featured_articles?: StrapiArticle[] | null;
};
