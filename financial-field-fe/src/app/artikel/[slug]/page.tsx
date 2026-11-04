import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd/JsonLd";
import { blocksToPlainText } from "@/lib/blocks";
import { categoryTrail, toSchemaCrumbs } from "@/lib/breadcrumbs";
import {
  getArticleBySlug,
  getArticlePreview,
  getRecentArticleSlugs,
  getRelatedArticles,
} from "@/lib/content/articles";
import { getSiteSettings } from "@/lib/content/site";
import { env } from "@/lib/env";
import { features } from "@/lib/features";
import {
  countWords,
  readingTimeMinutes,
  toIsoWib,
  wordBucket,
} from "@/lib/format";
import { routes } from "@/lib/routes";
import { isValidSlug } from "@/lib/security";
import { absoluteUrl, buildMetadata } from "@/lib/seo/metadata";
import { buildPageGraph } from "@/lib/structured-data/registry";
import type { Article, EditorialStatus } from "@/types";

import { ArticleView } from "@/features/article/ArticleView";

/** Safety-net window. Keep in sync with REVALIDATE.article (revalidate.test.ts). */
export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

type Loaded = {
  article: Article;
  preview: { status: EditorialStatus | null } | null;
};

async function load(slug: string): Promise<Loaded | null> {
  if (!isValidSlug(slug)) {
    return null;
  }
  const draft = await draftMode();
  if (draft.isEnabled) {
    const preview = await getArticlePreview(slug);
    return preview
      ? {
          article: preview.article,
          preview: { status: preview.editorialStatus },
        }
      : null;
  }
  const article = await getArticleBySlug(slug);
  return article ? { article, preview: null } : null;
}

/** Pre-render the 100 most recent; the rest render on first request. */
export async function generateStaticParams() {
  const slugs = await getRecentArticleSlugs(100);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await load(slug);
  if (!loaded) {
    return {};
  }
  const { article, preview } = loaded;
  if (preview) {
    return {
      title: `Pratinjau: ${article.title}`,
      robots: { index: false, follow: false },
    };
  }
  return buildMetadata({
    title: article.title,
    description: article.leadText,
    path: routes.article(article.slug),
    seo: article.seo,
    image: article.featuredImage,
    fallbackImagePath: `/og/artikel/${article.slug}`,
    type: "article",
    article: {
      publishedTime: toIsoWib(article.publishedAt),
      modifiedTime: toIsoWib(article.contentUpdatedAt ?? article.publishedAt),
      section: article.primaryCategory?.name ?? null,
      tags: article.tags.map((tag) => tag.name),
      authors: article.author
        ? [absoluteUrl(routes.author(article.author.slug))]
        : [],
    },
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const loaded = await load(slug);
  if (!loaded) {
    notFound();
  }
  const { article, preview } = loaded;
  const [related, settings] = await Promise.all([
    getRelatedArticles(article),
    getSiteSettings(),
  ]);

  const url = absoluteUrl(routes.article(article.slug));
  const words = countWords(blocksToPlainText(article.body));
  const trail = [
    ...categoryTrail(article.primaryCategory),
    { label: article.title, href: routes.article(article.slug) },
  ];

  return (
    <>
      {preview ? null : (
        <JsonLd
          data={buildPageGraph({
            kind: "article",
            origin: env.siteUrl,
            url,
            crumbs: toSchemaCrumbs(trail),
            article,
            faqSchema: features.faqSchema,
          })}
        />
      )}
      <ArticleView
        article={article}
        related={related}
        breadcrumbs={trail}
        url={url}
        siteOrigin={env.siteUrl}
        readingMinutes={readingTimeMinutes(words)}
        defaultPrDisclosure={settings.defaultPrDisclosure}
        preview={preview}
        analyticsParams={
          preview
            ? null
            : {
                article_id: article.id,
                primary_category: article.primaryCategory?.slug ?? "none",
                article_type: article.articleType,
                author_id: article.author?.id ?? "none",
                has_reviewer:
                  article.reviewer !== null && article.lastReviewedAt !== null,
                word_bucket: wordBucket(words),
              }
        }
      />
    </>
  );
}
