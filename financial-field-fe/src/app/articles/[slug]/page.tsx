import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import {
  getArticleBySlug,
  getPublishedArticleSlugs,
} from "@/lib/content/articles";

import { ArticleView } from "@/features/article/ArticleView";

/** Safety-net window. Keep in sync with REVALIDATE.article. */
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs({ limit: 100 });
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const article = await getArticleBySlug(slug, { draft: isDraft });

  if (!article) notFound();

  return <ArticleView article={article} />;
}
