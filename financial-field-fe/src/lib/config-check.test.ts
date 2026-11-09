import { afterEach, describe, expect, it, vi } from 'vitest';

import { findConfigProblems, reportConfig } from './config-check';
import { log } from './log';

describe('config check (W13)', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('finds nothing in a valid configuration', () => {
		expect(
			findConfigProblems({
				featureFlags: { comparison: 'on', ads: '0', faqSchema: undefined },
			}),
		).toEqual([]);
	});

	it('reports a flag value that is not on/off, by its env name', () => {
		expect(
			findConfigProblems({
				featureFlags: { faqSchema: 'yes please' },
			}),
		).toEqual(['FEATURE_FAQ_SCHEMA: "yes please" is not on/off, default used']);
	});

	it('logs the site environment once and each problem once', () => {
		const info = vi.spyOn(log, 'info').mockImplementation(() => {});
		const warn = vi.spyOn(log, 'warn').mockImplementation(() => {});

		reportConfig({
			featureFlags: { ads: 'maybe', newsletter: 'later' },
			siteEnv: 'local',
			stagingBasicAuth: { user: '', password: '' },
		});

		expect(info).toHaveBeenCalledTimes(1);
		expect(info).toHaveBeenCalledWith('config::reportConfig', 'SITE_ENV: local');
		expect(warn).toHaveBeenCalledTimes(2);
	});
});

describe('staging basic auth config (REQ-INFRA-006, W13)', () => {
	const base = { featureFlags: {} };

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
