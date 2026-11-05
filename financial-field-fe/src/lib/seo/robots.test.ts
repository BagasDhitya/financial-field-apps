import { describe, expect, it } from 'vitest';

import { AI_RETRIEVAL_AGENTS, AI_TRAINING_AGENTS } from './crawlers';
import { buildRobots } from './robots';

describe('robots (REQ-SEO-011/012, ADR-0005)', () => {
	it('blocks everything outside production', () => {
		expect(buildRobots('staging', 'https://x.test')).toEqual({
			rules: [{ userAgent: '*', disallow: '/' }],
		});
		expect(buildRobots('local', 'https://x.test').sitemap).toBeUndefined();
	});

	it('allows the site except /api/ in production and lists the sitemap', () => {
		const robots = buildRobots('production', 'https://x.test/');
		expect(robots.sitemap).toBe('https://x.test/sitemap.xml');
		const rules = Array.isArray(robots.rules) ? robots.rules : [robots.rules];
		expect(rules[0]).toEqual({ userAgent: '*', allow: '/', disallow: '/api/' });
		expect(rules[1]).toMatchObject({
			userAgent: [...AI_RETRIEVAL_AGENTS],
			allow: '/',
		});
	});

	it('can block AI training crawlers with one switch', () => {
		const rules = buildRobots('production', 'https://x.test', false).rules;
		expect(Array.isArray(rules) ? rules[2] : null).toEqual({
			userAgent: [...AI_TRAINING_AGENTS],
			disallow: '/',
		});
	});
});
