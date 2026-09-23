import { notFound } from "next/navigation";

import { getTagBySlug } from "@/lib/content/tags";

import { TagView } from "@/features/tag/TagView";

/** Safety-net window. Keep in sync with REVALIDATE.archive. */
export const revalidate = 600;

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) notFound();

  return <TagView tag={tag} />;
}
