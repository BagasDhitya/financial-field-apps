import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/lib/content/categories";

import { CategoryView } from "@/features/category/CategoryView";

/** Safety-net window. Keep in sync with REVALIDATE.categoryListing. */
export const revalidate = 120;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  return <CategoryView category={category} />;
}
