import type { Metadata } from 'next';

import { Container } from '@/components/Container/Container';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { getCategoryTree } from '@/lib/content/categories';
import { routes } from '@/lib/routes';

export const metadata: Metadata = {
	title: 'Halaman tidak ditemukan',
	robots: { index: false, follow: true },
};

/** Custom 404 with the main topics (REQ-PAGE-002; site search removed at the client's request). */
export default async function NotFound() {
	const categories = await getCategoryTree();
	return (
		<Container>
			<div
				style={{
					display: 'grid',
					gap: 'var(--space-3)',
					paddingBlock: 'var(--space-5)',
				}}
			>
				<p className="type-label">Error 404</p>
				<h1 style={{ margin: 0, fontSize: 'var(--text-h1)' }}>Halaman tidak ditemukan</h1>
				<p style={{ margin: 0, maxWidth: '38rem' }}>
					Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada. Mulai
					dari artikel terbaru atau salah satu topik di bawah.
				</p>
				<EmptyState
					title="Topik populer"
					links={[
						{ label: 'Artikel terbaru', href: routes.latest() },
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
