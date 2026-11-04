function trimSlash(origin: string): string {
  return origin.replace(/\/+$/, "");
}

/** Stable @ids so every page points at the same entities (REQ-GEO-003/004). */
export const schemaIds = {
  organization: (origin: string) => `${trimSlash(origin)}/#organization`,
  website: (origin: string) => `${trimSlash(origin)}/#website`,
  webpage: (url: string) => `${url}#webpage`,
  article: (url: string) => `${url}#article`,
  breadcrumb: (url: string) => `${url}#breadcrumb`,
  faq: (url: string) => `${url}#faq`,
  person: (origin: string, slug: string) =>
    `${trimSlash(origin)}/penulis/${slug}#person`,
} as const;
