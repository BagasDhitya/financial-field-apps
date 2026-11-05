import { describe, expect, it } from 'vitest';

import { summary } from '@/components/__fixtures__/domain';

import { selectHomeStories } from './select';

describe('selectHomeStories (REQ-HOME-001/002)', () => {
	const latest = Array.from({ length: 12 }, (_, index) =>
		summary({ id: `l${index}`, slug: `l${index}` }),
	);

	it('falls back to the latest when nothing is featured', () => {
		const stories = selectHomeStories([], latest);
		expect(stories.lead?.id).toBe('l0');
		expect(stories.secondary).toEqual([]);
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

	it('uses featured 1 as lead and 2–4 as the secondary stack, never repeating', () => {
		const featured = [
			latest[3]!,
			latest[0]!,
			summary({ id: 'f2', slug: 'f2' }),
			summary({ id: 'f3', slug: 'f3' }),
			summary({ id: 'f4', slug: 'f4' }),
		];
		const stories = selectHomeStories(featured, latest);
		expect(stories.lead?.id).toBe('l3');
		expect(stories.secondary.map((a) => a.id)).toEqual(['l0', 'f2', 'f3']);
		const ids = [
			stories.lead!.id,
			...stories.secondary.map((a) => a.id),
			...stories.river.map((a) => a.id),
		];
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('skips articles without a slug or title', () => {
		expect(selectHomeStories([summary({ slug: '' })], []).lead).toBeNull();
	});
});
