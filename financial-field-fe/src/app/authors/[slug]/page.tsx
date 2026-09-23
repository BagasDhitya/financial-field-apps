import { notFound } from "next/navigation";

import { getAuthorBySlug } from "@/lib/content/authors";

import { AuthorView } from "@/features/author/AuthorView";

/** Safety-net window. Keep in sync with REVALIDATE.archive. */
export const revalidate = 600;

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) notFound();

  return <AuthorView author={author} />;
}
