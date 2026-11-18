import { describe, expect, it } from 'vitest';

import { summary } from '@/components/__fixtures__/domain';

import { selectHomePrArticles, selectHomeStories } from './select';

describe('selectHomeStories (REQ-HOME-001/002)', () => {
	const latest = Array.from({ length: 12 }, (_, index) =>
		summary({ id: `l${index}`, slug: `l${index}` }),
	);

	it('falls back to the latest when nothing is featured', () => {
		const stories = selectHomeStories([], latest);
		expect(stories.lead?.id).toBe('l0');
		expect(stories.river.map((a) => a.id)).toEqual([
			'l1',
			'l2',
			'l3',
			'l4',
			'l5',
			'l6',
			'l7',
			'l8',
		]);
	});

	it('uses featured 1 as the lead and never repeats it in the river', () => {
		const featured = [latest[3]!, latest[0]!, summary({ id: 'f2', slug: 'f2' })];
		const stories = selectHomeStories(featured, latest);
		expect(stories.lead?.id).toBe('l3');
		expect(stories.river.map((a) => a.id)).not.toContain('l3');
		expect(stories.river).toHaveLength(8);
	});

	it('skips articles without a slug or title', () => {
		expect(selectHomeStories([summary({ slug: '' })], []).lead).toBeNull();
	});
});

describe('selectHomePrArticles (ADR-0024)', () => {
	const pr = (id: string) => summary({ id, slug: id, articleType: 'pr_article' });

	it('leaves out the PR spot and anything shown above, and keeps at most 5', () => {
		const stories = { lead: pr('p1'), river: [] };
		const items = [
			pr('p0'),
			pr('p1'),
			pr('p2'),
			pr('p3'),
			pr('p4'),
			pr('p5'),
			pr('p6'),
			pr('p7'),
		];
		const picked = selectHomePrArticles(items, stories, [items[0]!]);
		expect(picked.map((a) => a.id)).toEqual(['p2', 'p3', 'p4', 'p5', 'p6']);
	});

	it('takes only PR articles', () => {
		const stories = { lead: null, river: [] };
		const picked = selectHomePrArticles(
			[summary({ id: 'n', slug: 'n' }), pr('p')],
			stories,
			[],
		);
		expect(picked.map((a) => a.id)).toEqual(['p']);
	});
});
