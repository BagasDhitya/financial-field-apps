import { describe, expect, it } from 'vitest';

import { buildCategoryTree, mapCategory } from './category';

describe('buildCategoryTree (REQ-NAV-002)', () => {
	const entries = [
		{ documentId: '1', slug: 'pajak', name: 'Pajak', nav_order: 2 },
		{ documentId: '2', slug: 'asuransi', name: 'Asuransi', nav_order: 1 },
		{
			documentId: '3',
			slug: 'pph',
			name: 'PPh',
			parent_category: { documentId: '1', slug: 'pajak', name: 'Pajak' },
		},
		{ documentId: '4', slug: 'rahasia', name: 'Rahasia', show_in_nav: false },
		{ documentId: '5', slug: null, name: 'Tanpa slug' },
	];

	it('orders top level by nav_order and nests children', () => {
		const tree = buildCategoryTree(entries);
		expect(tree.map((node) => node.slug)).toEqual(['asuransi', 'pajak']);
		expect(tree[1]?.children).toEqual([
			{
				id: '3',
				slug: 'pph',
				name: 'PPh',
				parentSlug: 'pajak',
				parentName: 'Pajak',
			},
		]);
	});

	it('drops hidden and slug-less categories', () => {
		const slugs = buildCategoryTree(entries).map((node) => node.slug);
		expect(slugs).not.toContain('rahasia');
		expect(slugs).not.toContain(null);
	});

	it("gives children their parent's slug for URLs", () => {
		const category = mapCategory({
			documentId: '1',
			slug: 'pajak',
			name: 'Pajak',
			categories: [{ documentId: '3', slug: 'pph', name: 'PPh' }],
		});
		expect(category.children[0]).toMatchObject({
			parentSlug: 'pajak',
			parentName: 'Pajak',
		});
	});
});
