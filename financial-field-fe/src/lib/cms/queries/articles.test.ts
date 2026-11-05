import { describe, expect, it } from 'vitest';

import { parseCapabilities } from '../capabilities';

import { articleDetailPopulate, articleSort, articleSummaryFields } from './articles';

const none = parseCapabilities('');
const all = parseCapabilities('all');

describe('article queries', () => {
	it('never requests the body in listings (REQ-PERF-007)', () => {
		expect(articleSummaryFields(all)).not.toContain('content');
	});

	it('requests only schema-1 keys when no capability is on (strictParams)', () => {
		expect(articleSummaryFields(none)).not.toContain('first_published_at');
		expect(articleSort(none)).toEqual(['publishedAt:desc']);
		const populate = articleDetailPopulate(none);
		for (const key of ['seo', 'faq', 'sources', 'key_takeaways', 'corrections']) {
			expect(populate).not.toHaveProperty(key);
		}
	});

	it('adds gated keys once the CMS has them', () => {
		expect(articleSummaryFields(all)).toContain('first_published_at');
		expect(articleSort(all)[0]).toBe('first_published_at:desc');
		const populate = articleDetailPopulate(all);
		for (const key of ['seo', 'faq', 'sources', 'key_takeaways', 'corrections']) {
			expect(populate).toHaveProperty(key);
		}
	});
});
