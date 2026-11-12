import { expect, test } from '@playwright/test';

import { expectNoHorizontalScroll, expectNoSeriousA11yViolations } from './helpers';

/** Interview dialogue (ADR-0020): REQ-ART-013, REQ-HOME-006. No schema change. */
const INTERVIEW = '/artikel/wawancara-asuransi-kesehatan-tambahan';

test.describe('interview dialogue', () => {
	test('shows named turns: the author on the left, the guest on the right', async ({ page }) => {
		await page.goto(INTERVIEW);
		const host = page.locator('[data-role="interviewer"]');
		const guest = page.locator('[data-role="guest"]');
		await expect(host).toHaveCount(7);
		await expect(guest).toHaveCount(7);
		// The name is in text, so colour is never the only cue (WCAG 1.4.1).
		await expect(host.first()).toContainText('Penulis Contoh Tiga');
		await expect(host.first()).toContainText('Pewawancara');
		await expect(guest.first()).toContainText('Narasumber Contoh Lima');
		await expect(guest.first()).toContainText('Narasumber');
		// The label is not repeated inside the text.
		await expect(guest.first().locator('p').nth(1)).not.toContainText(
			'Narasumber Contoh Lima:',
		);

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

		// The intro and the "Baca juga" links stay ordinary body content.
		await expect(page.getByRole('heading', { level: 2, name: 'Baca juga' })).toBeVisible();
		await expect(
			page.locator('main article header').getByText('Wawancara', { exact: true }),
		).toBeVisible();
		await expectNoSeriousA11yViolations(page);
	});

	test('fits a phone screen', async ({ page }) => {
		await page.setViewportSize({ width: 360, height: 800 });
		await page.goto('/artikel/wawancara-negosiasi-gaji-pertama');
		await expect(page.locator('[data-role="guest"]').first()).toBeVisible();
		await expectNoHorizontalScroll(page);
	});

	test('a standard article has no dialogue', async ({ page }) => {
		await page.goto('/artikel/kalender-pajak-pribadi');
		await expect(page.locator('[data-role]')).toHaveCount(0);
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
				'[aria-label="Pilihan editor dan artikel terbaru"] a[href^="/artikel/"], main h2 a, section[aria-labelledby="video"] h3 a',
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

test('the local API serves interviews without a new field', async ({ request }) => {
	const body = await (
		await request.get(
			'/api/articles?filters[article_type][$eq]=interview&fields[0]=slug&fields[1]=content&pagination[pageSize]=1',
		)
	).json();
	expect(body.meta.pagination.total).toBe(8);
	// A turn is an ordinary paragraph that starts with a bold "Name:".
	const turn = (
		body.data[0].content as { type: string; children: { text?: string; bold?: boolean }[] }[]
	).find((block) => block.type === 'paragraph' && block.children[0]?.bold);
	expect(turn?.children[0]?.text).toMatch(/^[^:]+:$/);
});
