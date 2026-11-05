import { expect, test } from '@playwright/test';

import { E2E_STAGING_AUTH, E2E_STAGING_PORT } from '../e2e-env.mjs';

/**
 * Staging basic auth (REQ-INFRA-006, PRP-0002.p1 AC-D4) on a second server
 * that runs the same build with SITE_ENV=staging. The production-mode server
 * on E2E_PORT stays open, and every other suite covers it.
 */
const STAGING = `http://localhost:${E2E_STAGING_PORT}`;
const AUTH = `Basic ${Buffer.from(`${E2E_STAGING_AUTH.user}:${E2E_STAGING_AUTH.password}`).toString('base64')}`;
const WRONG = `Basic ${Buffer.from(`${E2E_STAGING_AUTH.user}:salah`).toString('base64')}`;

test.describe('staging basic auth (REQ-INFRA-006)', () => {
	test('asks for credentials before anything else, never indexed or cached', async ({
		request,
	}) => {
		// /halaman/1 would redirect: the challenge comes first, so even that is not revealed.
		for (const path of [
			'/',
			'/artikel/cara-menghitung-pph-21',
			'/robots.txt',
			'/kategori/pajak/halaman/1',
		]) {
			const response = await request.get(`${STAGING}${path}`, { maxRedirects: 0 });
			expect(response.status(), path).toBe(401);
			expect(response.headers()['www-authenticate'], path).toBe(
				'Basic realm="Financial Field Indonesia staging", charset="UTF-8"',
			);
			expect(response.headers()['x-robots-tag'], path).toBe('noindex, nofollow');
			expect(response.headers()['cache-control'], path).toBe('no-store');
		}
	});

	test('refuses wrong credentials', async ({ request }) => {
		const response = await request.get(`${STAGING}/`, { headers: { Authorization: WRONG } });
		expect(response.status()).toBe(401);
	});

	test('opens the site with the right credentials, still noindex', async ({ request }) => {
		const robots = await request.get(`${STAGING}/robots.txt`, {
			headers: { Authorization: AUTH },
		});
		expect(robots.status()).toBe(200);
		expect(await robots.text()).toContain('Disallow: /');

		const home = await request.get(`${STAGING}/`, { headers: { Authorization: AUTH } });
		expect(home.status()).toBe(200);
		expect(home.headers()['x-robots-tag']).toBe('noindex, nofollow');

		// Framework assets load without credentials.
		const asset = (await home.text()).match(/\/_next\/static\/[^"'\s]+\.js/)?.[0];
		expect(asset).toBeTruthy();
		expect((await request.get(`${STAGING}${asset}`)).status()).toBe(200);
	});

	test('leaves the webhook and preview to their own secrets', async ({ request }) => {
		const webhook = await request.post(`${STAGING}/api/revalidate`, {
			headers: { Authorization: 'Bearer wrong-secret' },
			data: { event: 'entry.publish', model: 'article' },
		});
		expect(webhook.status()).toBe(401);
		expect(webhook.headers()['www-authenticate']).toBeUndefined();

		const preview = await request.get(`${STAGING}/api/preview?secret=wrong&slug=a`, {
			maxRedirects: 0,
		});
		expect(preview.status()).toBe(401);
		expect(preview.headers()['www-authenticate']).toBeUndefined();
	});
});
