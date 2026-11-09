import { describe, expect, it } from 'vitest';

import {
	hasValidBasicAuth,
	isStagingAuthEnabled,
	isStagingAuthExempt,
	stagingAuthChallengeHeaders,
} from './staging-auth';

function basic(value: string): string {
	return `Basic ${Buffer.from(value, 'utf8').toString('base64')}`;
}

describe('staging basic auth (REQ-INFRA-006)', () => {
	it('is on only for staging with both credentials', () => {
		expect(isStagingAuthEnabled({ siteEnv: 'staging', user: 'u', password: 'p' })).toBe(true);
		expect(isStagingAuthEnabled({ siteEnv: 'staging', user: 'u', password: '' })).toBe(false);
		expect(isStagingAuthEnabled({ siteEnv: 'production', user: 'u', password: 'p' })).toBe(
			false,
		);
		expect(isStagingAuthEnabled({ siteEnv: 'local', user: 'u', password: 'p' })).toBe(false);
	});

	it('exempts framework assets only', () => {
		for (const path of ['/_next/static/chunks/a.js', '/_next/image']) {
			expect(isStagingAuthExempt(path), path).toBe(true);
		}
		for (const path of [
			'/',
			'/artikel/a',
			'/robots.txt',
			'/sitemap.xml',
			'/api/preview',
			'/api/revalidate',
			'/_nextx',
			'/og',
		]) {
			expect(isStagingAuthExempt(path), path).toBe(false);
		}
	});

	it('accepts only the exact credentials, including UTF-8 ones', () => {
		expect(hasValidBasicAuth(basic('ffid:rahasia'), 'ffid', 'rahasia')).toBe(true);
		expect(hasValidBasicAuth(basic('ffid:sandi-ü'), 'ffid', 'sandi-ü')).toBe(true);
		expect(hasValidBasicAuth(basic('ffid:salah'), 'ffid', 'rahasia')).toBe(false);
		expect(hasValidBasicAuth(basic('lain:rahasia'), 'ffid', 'rahasia')).toBe(false);
	});

	it('treats missing or malformed headers as not authenticated', () => {
		expect(hasValidBasicAuth(null, 'ffid', 'rahasia')).toBe(false);
		expect(hasValidBasicAuth('Bearer abc', 'ffid', 'rahasia')).toBe(false);
		expect(hasValidBasicAuth('Basic %%%', 'ffid', 'rahasia')).toBe(false);
		expect(hasValidBasicAuth('Basic ', 'ffid', 'rahasia')).toBe(false);
	});

	it('challenges with a login prompt that is never indexed or cached', () => {
		expect(stagingAuthChallengeHeaders()).toEqual({
			'WWW-Authenticate': 'Basic realm="Financial Field Indonesia staging", charset="UTF-8"',
			'X-Robots-Tag': 'noindex, nofollow',
			'Cache-Control': 'no-store',
		});
	});
});
