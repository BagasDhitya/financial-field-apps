import { HIDDEN_TAG_SLUGS } from "@/lib/cms/mappers/tag";
import { routes } from "@/lib/routes";
import {
  ARTICLES_PER_SITEMAP,
  latestDate,
  type SitemapUrl,
} from "@/lib/sitemap";

import { getArticleIndex, type ArticleIndexEntry } from "./articles";
import { getAllCategoryPaths } from "./categories";
import { getStaticPageEntries } from "./pages";
import { isIndexableTag } from "./tags";

export type SitemapData = {
  articles: ArticleIndexEntry[];
  categories: { slug: string; parentSlug: string | null }[];
  pages: { slug: string; updatedAt: string | null }[];
};

export type SitemapFile = { name: string; urls: SitemapUrl[] };

const ABOUT_SLUG = "tentang-kami";
const CONTACT_SLUG = "hubungi-kami";

function staticPagePath(slug: string): string {
  if (slug === ABOUT_SLUG) {
    return routes.about();
  }
  if (slug === CONTACT_SLUG) {
    return routes.contact();
  }
  return routes.about(slug);
}

/**
 * Pure: turns CMS index data into sitemap files (REQ-SEO-013). Only
 * canonical, indexable, non-empty URLs; lastmod from CMS dates.
 */
export function buildSitemapFiles(
  data: SitemapData,
  origin: string,
): SitemapFile[] {
  const base = origin.replace(/\/+$/, "");
  const abs = (path: string) => `${base}${path}`;
  const indexable = data.articles.filter((article) => !article.noIndex);
  const newest = latestDate(indexable.map((article) => article.modifiedAt));

  const articleFiles: SitemapFile[] = [];
  for (
    let start = 0;
    start < indexable.length || start === 0;
    start += ARTICLES_PER_SITEMAP
  ) {
    articleFiles.push({
      name: `articles-${start / ARTICLES_PER_SITEMAP + 1}`,
      urls: indexable
        .slice(start, start + ARTICLES_PER_SITEMAP)
        .map((article) => ({
          loc: abs(routes.article(article.slug)),
          lastmod: article.modifiedAt,
        })),
    });
    if (indexable.length === 0) {
      break;
    }
  }

  // Categories with at least one article in them or in a child.
  const lastByCategory = new Map<string, string | null>();
  for (const article of indexable) {
    if (article.primaryCategorySlug) {
      const previous = lastByCategory.get(article.primaryCategorySlug) ?? null;
      lastByCategory.set(
        article.primaryCategorySlug,
        latestDate([previous, article.modifiedAt]),
      );
    }
  }
  const categoryUrls: SitemapUrl[] = data.categories.flatMap((category) => {
    const childDates = data.categories
      .filter((child) => child.parentSlug === category.slug)
      .map((child) => lastByCategory.get(child.slug));
    const own = lastByCategory.get(category.slug);
    const hasArticles =
      own !== undefined || childDates.some((date) => date !== undefined);
    return hasArticles
      ? [
          {
            loc: abs(routes.category(category)),
            lastmod: latestDate([own, ...childDates]),
          },
        ]
      : [];
  });

  // Tags only when indexable (≥ 3 articles, REQ-SEO-008).
  const tagArticles = new Map<string, ArticleIndexEntry[]>();
  for (const article of indexable) {
    for (const tag of article.tagSlugs) {
      if (HIDDEN_TAG_SLUGS.has(tag)) {
        continue;
      }
      tagArticles.set(tag, [...(tagArticles.get(tag) ?? []), article]);
    }
  }
  const tagUrls: SitemapUrl[] = [...tagArticles.entries()]
    .filter(([, articles]) => isIndexableTag(articles.length))
    .map(([slug, articles]) => ({
      loc: abs(routes.tag(slug)),
      lastmod: latestDate(articles.map((article) => article.modifiedAt)),
    }));

  const authorDates = new Map<string, string | null>();
  for (const article of indexable) {
    for (const slug of article.authorSlugs) {
      authorDates.set(
        slug,
        latestDate([authorDates.get(slug) ?? null, article.modifiedAt]),
      );
    }
  }
  const authorUrls: SitemapUrl[] = [...authorDates.entries()].map(
    ([slug, lastmod]) => ({
      loc: abs(routes.author(slug)),
      lastmod,
    }),
  );

  const hasInterviews = indexable.some(
    (article) => article.articleType === "interview",
  );
  const pageUrls: SitemapUrl[] = [
    { loc: abs(routes.home()), lastmod: newest },
    { loc: abs(routes.latest()), lastmod: newest },
    ...(hasInterviews
      ? [{ loc: abs(routes.interviews()), lastmod: newest }]
      : []),
    ...data.pages.map((page) => ({
      loc: abs(staticPagePath(page.slug)),
      lastmod: page.updatedAt,
    })),
  ];

  return [
    ...articleFiles,
    { name: "categories", urls: categoryUrls },
    { name: "tags", urls: tagUrls },
    { name: "authors", urls: authorUrls },
    { name: "pages", urls: pageUrls },
  ];
}

export async function getSitemapFiles(origin: string): Promise<SitemapFile[]> {
  const [articles, categories, pages] = await Promise.all([
    getArticleIndex(),
    getAllCategoryPaths(),
    getStaticPageEntries(),
  ]);
  return buildSitemapFiles({ articles, categories, pages }, origin);
}
