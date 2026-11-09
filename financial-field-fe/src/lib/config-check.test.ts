import { afterEach, describe, expect, it, vi } from 'vitest';

import { findConfigProblems, reportConfig } from './config-check';
import { log } from './log';

describe('config check (W13)', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	const cms = { cmsUrl: 'https://cms.example.test', cmsCapabilities: '' };

	it('finds nothing in a valid configuration', () => {
		expect(
			findConfigProblems({
				cmsUrl: 'https://cms.example.test',
				cmsCapabilities: 'seo, dates,ALL',
				featureFlags: { comparison: 'on', ads: '0', faqSchema: undefined },
			}),
		).toEqual([]);
	});

	it('reports unknown capability names instead of guessing', () => {
		expect(
			findConfigProblems({
				...cms,
				cmsCapabilities: 'seo,author_profile',
				featureFlags: {},
			}),
		).toEqual(['CMS_CAPABILITIES: unknown "author_profile" ignored']);
	});

	it('reports capabilities set for the local API, which ignores them', () => {
		expect(
			findConfigProblems({ cmsUrl: '', cmsCapabilities: 'seo', featureFlags: {} }),
		).toEqual(['CMS_CAPABILITIES set but ignored: the local API has every field']);
	});

	it('reports a flag value that is not on/off, by its env name', () => {
		expect(
			findConfigProblems({
				...cms,
				featureFlags: { faqSchema: 'yes please' },
			}),
		).toEqual(['FEATURE_FAQ_SCHEMA: "yes please" is not on/off, default used']);
	});

	it('logs the content source and capabilities once and each problem once', () => {
		const info = vi.spyOn(log, 'info').mockImplementation(() => {});
		const warn = vi.spyOn(log, 'warn').mockImplementation(() => {});

		reportConfig(
			{ ...cms, cmsCapabilities: 'seo,bogus', featureFlags: { ads: 'maybe' } },
			new Set(['seo']),
		);

		expect(info).toHaveBeenCalledTimes(1);
		expect(info).toHaveBeenCalledWith(
			'config::reportConfig',
			'CMS: cms.example.test; capabilities: seo',
		);
		expect(warn).toHaveBeenCalledTimes(2);
	});

	it('names the local API when no CMS_URL is set', () => {
		const info = vi.spyOn(log, 'info').mockImplementation(() => {});

		reportConfig({ cmsUrl: '', cmsCapabilities: '', featureFlags: {} }, new Set());

		expect(info).toHaveBeenCalledWith(
			'config::reportConfig',
			'CMS: local API (src/data); capabilities: none',
		);
	});
});

describe('staging basic auth config (REQ-INFRA-006, W13)', () => {
	const base = { cmsUrl: '', cmsCapabilities: '', featureFlags: {} };

	it('reports staging without both credentials, by name only', () => {
		expect(
			findConfigProblems({
				...base,
				siteEnv: 'staging',
				stagingBasicAuth: { user: 'ffid', password: '' },
			}),
		).toEqual(['STAGING_BASIC_AUTH_PASSWORD not set: staging is not password-protected']);
		expect(
			findConfigProblems({
				...base,
				siteEnv: 'staging',
				stagingBasicAuth: { user: '', password: '' },
			}),
		).toEqual([
			'STAGING_BASIC_AUTH_USER and STAGING_BASIC_AUTH_PASSWORD not set: staging is not password-protected',
		]);
	});

	it('reports credentials set outside staging, never their values', () => {
		const problems = findConfigProblems({
			...base,
			siteEnv: 'production',
			stagingBasicAuth: { user: 'ffid', password: 'rahasia-sekali' },
		});
		expect(problems).toEqual(['STAGING_BASIC_AUTH_* set but ignored: SITE_ENV is production']);
		expect(problems.join(' ')).not.toContain('rahasia');
	});

	it('is quiet for protected staging and for open local or production', () => {
		expect(
			findConfigProblems({
				...base,
				siteEnv: 'staging',
				stagingBasicAuth: { user: 'ffid', password: 'x' },
			}),
		).toEqual([]);
		expect(
			findConfigProblems({
				...base,
				siteEnv: 'production',
				stagingBasicAuth: { user: '', password: '' },
			}),
		).toEqual([]);
	});
});
