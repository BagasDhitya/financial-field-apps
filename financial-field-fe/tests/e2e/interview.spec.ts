import { expect, test } from '@playwright/test';

import { expectNoHorizontalScroll, expectNoSeriousA11yViolations } from './helpers';

/** Interview dialogue from `interview_dialogues` (CMS-31, ADR-0021): REQ-ART-013, REQ-HOME-006. */
const INTERVIEW = '/artikel/wawancara-asuransi-kesehatan-tambahan';

test.describe('interview dialogue', () => {
	test('shows the turns: left in pink, right in orange, each named', async ({ page }) => {
		await page.goto(INTERVIEW);
		const host = page.locator('[data-position="left"]');
		const guest = page.locator('[data-position="right"]');
		await expect(host).toHaveCount(7);
		await expect(guest).toHaveCount(7);
		// The name is in text, so colour is never the only cue (WCAG 1.4.1).
		// The interviewer is the team, like the byline (ADR-0022).
		await expect(host.first()).toContainText('Redaksi');
		await expect(host.first()).toContainText('Financial Field Indonesia');
		await expect(guest.first()).toContainText('Narasumber Contoh Lima');
		await expect(guest.first()).toContainText('Perencana keuangan');
		// A blank line in the message starts a new paragraph.
		await expect(guest.first().locator('p')).toHaveCount(3);

		// The avatar sits on the speaker's side: left for the interviewer, right for the guest.
		const side = async (turn: typeof host) => {
			const avatar = await turn.first().locator('span').first().boundingBox();
			const bubble = await turn.first().locator('div').first().boundingBox();
			return avatar && bubble ? (avatar.x < bubble.x ? 'left' : 'right') : null;
		};
		expect([await side(host), await side(guest)]).toEqual(['left', 'right']);
		const colours = await Promise.all(
			[host, guest].map((turn) =>
				turn
					.first()
					.locator('div')
					.first()
					.evaluate((node) => getComputedStyle(node).backgroundColor),
			),
		);
		expect(colours).toEqual(['rgb(253, 232, 239)', 'rgb(255, 238, 221)']);

		// The body's intro comes before the turns.
		const intro = await page.getByText(/^Pertanyaan ini sering datang/).boundingBox();
		const first = await host.first().boundingBox();
		expect(intro && first && intro.y < first.y).toBe(true);
		await expect(
			page.locator('main article header').getByText('Wawancara', { exact: true }),
		).toBeVisible();
		await expectNoSeriousA11yViolations(page);
	});

	test('fits a phone screen', async ({ page }) => {
		await page.setViewportSize({ width: 360, height: 800 });
		await page.goto('/artikel/wawancara-negosiasi-gaji-pertama');
		await expect(page.locator('[data-position="right"]').first()).toBeVisible();
		await expectNoHorizontalScroll(page);
	});

	test('a standard article has no dialogue', async ({ page }) => {
		await page.goto('/artikel/kalender-pajak-pribadi');
		await expect(page.locator('[data-position]')).toHaveCount(0);
	});
});

test('home: a Wawancara section of interviews not already shown above it', async ({ page }) => {
	await page.goto('/');
	const section = page.locator('section[aria-labelledby="wawancara"]');
	await expect(section.getByRole('heading', { level: 2, name: 'Wawancara' })).toBeVisible();
	const links = section.locator('h3 a');
	await expect(links).toHaveCount(6);
	for (const name of await links.allTextContents()) {
		expect(name).toMatch(/^Wawancara:/);
	}
	await expect(links.first()).toHaveAttribute('data-content-type', 'home_interview');

	const above = new Set(
		await page
			.locator(
				'section[aria-labelledby="terbaru"] a[href^="/artikel/"], main h2 a, section[aria-labelledby="video"] h3 a',
			)
			.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href'))),
	);
	for (const href of await links.evaluateAll((nodes) =>
		nodes.map((node) => node.getAttribute('href')),
	)) {
		expect(above.has(href)).toBe(false);
	}

	await section.getByRole('link', { name: /Semua wawancara/ }).click();
	await expect(page).toHaveURL(/\/wawancara$/);
	await expect(page.locator('main article')).toHaveCount(8);
});

test('the local API serves interview_dialogues like the CMS (CMS-31)', async ({ request }) => {
	const body = await (
		await request.get(
			'/api/articles?filters[article_type][$eq]=interview&fields[0]=slug&populate[interview_dialogues][populate][speaker_avatar]=true&pagination[pageSize]=1',
		)
	).json();
	expect(body.meta.pagination.total).toBe(8);
	const turn = body.data[0].interview_dialogues[0];
	expect(Object.keys(turn)).toEqual([
		'id',
		'speaker_name',
		'speaker_role',
		'message',
		'position',
		// Populated media comes after the scalars, as the CMS returns it.
		'speaker_avatar',
	]);
	expect(['left', 'right']).toContain(turn.position);
	const invalid = await request.get('/api/articles?filters[interview_dialogues][bogus]=1');
	expect(invalid.status()).toBe(400);
});
