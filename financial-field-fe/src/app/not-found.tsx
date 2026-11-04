import type { Metadata } from "next";

import { Container } from "@/components/Container/Container";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { SearchField } from "@/components/SearchField/SearchField";
import { getCategoryTree } from "@/lib/content/categories";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: true },
};

/** Custom 404 with search and the main topics (REQ-PAGE-002). */
export default async function NotFound() {
  const categories = await getCategoryTree();
  return (
    <Container>
      <div
        style={{
          display: "grid",
          gap: "var(--space-3)",
          paddingBlock: "var(--space-5)",
        }}
      >
        <p className="type-label">Error 404</p>
        <h1 style={{ margin: 0, fontSize: "var(--text-h1)" }}>
          Halaman tidak ditemukan
        </h1>
        <p style={{ margin: 0, maxWidth: "38rem" }}>
          Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah
          ada. Coba cari artikelnya, atau mulai dari salah satu topik di bawah.
        </p>
        <div style={{ maxWidth: "38rem" }}>
          <SearchField variant="full" id="cari-404" />
        </div>
        <EmptyState
          title="Topik populer"
          links={[
            { label: "Artikel terbaru", href: routes.latest() },
            ...categories.slice(0, 8).map((category) => ({
              label: category.name,
              href: routes.category(category),
            })),
          ]}
        />
      </div>
    </Container>
  );
}
