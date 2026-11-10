import { expect, test } from '@playwright/test';

import { expectNoSeriousA11yViolations } from './helpers';

/** Article videos (ADR-0019): REQ-ART-012, REQ-HOME-005, REQ-LIST-006, REQ-PERF-011. */
const VIDEO_ARTICLE = '/artikel/cara-membaca-slip-gaji-pph-21';
const VIDEO_ID = 'gqHcGFd0FNg';
const YOUTUBE = /youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com/;

test.describe('article video', () => {
	test('shows the still and loads the player only on click', async ({ page }) => {
		const youtubeRequests: string[] = [];
		page.on('request', (request) => {
			if (YOUTUBE.test(new URL(request.url()).hostname)) {
				youtubeRequests.push(request.url());
			}
		});
		// The test never loads the real player.
		await page.route(/youtube-nocookie\.com/, (route) => route.abort());

		await page.goto(VIDEO_ARTICLE);
		const play = page.getByRole('button', { name: /^Putar video: Heboh Hitungan Pajak/ });
		await expect(play).toBeVisible();
		await expect(page.locator('iframe')).toHaveCount(0);
		// Through this site's optimizer (absolute after hydration), never i.ytimg.com directly.
		await expect(page.locator('figure img').first()).toHaveAttribute(
			'src',
			new RegExp(
				`^(http://localhost:\\d+)?/_next/image\\?url=https%3A%2F%2Fi\\.ytimg\\.com%2Fvi%2F${VIDEO_ID}%2F`,
			),
		);
		expect(youtubeRequests).toEqual([]);

		const player = page.locator('iframe');
		// A click before hydration does nothing; click again until the player is in.
		await expect(async () => {
			await play.click({ timeout: 1000 });
			await expect(player).toHaveCount(1, { timeout: 1000 });
		}).toPass();
		await expect(player).toHaveAttribute(
			'src',
			`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&autoplay=1`,
		);
		await expect(player).toHaveAttribute('title', /^Video: Heboh Hitungan Pajak/);
		await expect(player).toBeFocused();
		expect(
			youtubeRequests.every((url) => url.startsWith('https://www.youtube-nocookie.com/')),
		).toBe(true);
	});

	test('credits the video and links to it on YouTube', async ({ page }) => {
		await page.goto(VIDEO_ARTICLE);
		const caption = page.locator('figcaption');
		await expect(caption).toContainText('CNBC Indonesia');
		await expect(caption).toContainText('29 Januari 2024');
		await expect(caption.getByRole('link', { name: 'Tonton di YouTube' })).toHaveAttribute(
			'href',
			`https://www.youtube.com/watch?v=${VIDEO_ID}`,
		);
		await expect(caption.getByRole('link', { name: 'Tonton di YouTube' })).toHaveAttribute(
			'rel',
			'noopener',
		);
		await expectNoSeriousA11yViolations(page);
	});

	test('adds a VideoObject to the Article (REQ-SEO-046)', async ({ page }) => {
		await page.goto(VIDEO_ARTICLE);
		const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
		const nodes = blocks.flatMap(
			(block) => (JSON.parse(block) as { '@graph': Record<string, unknown>[] })['@graph'],
		);
		const article = nodes.find((node) => node['@type'] === 'Article');
		expect(article?.video).toMatchObject({
			'@type': 'VideoObject',
			name: 'Heboh Hitungan Pajak Baru TER PPh 21 bikin Gaji Turun, Benarkah?',
			uploadDate: '2024-01-29T13:07:49+07:00',
			duration: 'PT5M18S',
			embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
		});
	});

	test('an article without a video keeps its featured image', async ({ page }) => {
		await page.goto('/artikel/kalender-pajak-pribadi');
		await expect(page.getByRole('button', { name: /^Putar video/ })).toHaveCount(0);
		await expect(page.locator('figure img').first()).toHaveAttribute(
			'src',
			/images%2Fkategori%2Fpajak\.png/,
		);
	});
});

test('home: a Video section of articles not already shown above it', async ({ page }) => {
	await page.goto('/');
	const section = page.locator('section[aria-labelledby="video"]');
	await expect(section.getByRole('heading', { level: 2, name: 'Video' })).toBeVisible();
	const links = section.locator('h3 a');
	await expect(links).toHaveCount(6);
	for (const name of await links.allTextContents()) {
		expect(name).toContain('(video)');
	}

	const above = new Set(
		await page
			.locator(
				'[aria-label="Pilihan editor dan artikel terbaru"] a[href^="/artikel/"], main h2 a',
			)
			.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href'))),
	);
	for (const href of await links.evaluateAll((nodes) =>
		nodes.map((node) => node.getAttribute('href')),
	)) {
		expect(above.has(href)).toBe(false);
	}

	await section.getByRole('link', { name: /Semua video/ }).click();
	await expect(page).toHaveURL(/\/video$/);
});

test('/video lists every video article, 12 per page (REQ-LIST-006)', async ({ page, request }) => {
	await page.goto('/video');
	await expect(page.locator('main article')).toHaveCount(12);
	await expect(page.locator('main article img').first()).toHaveAttribute(
		'src',
		/i\.ytimg\.com%2Fvi%2F[\w-]{11}%2Fhqdefault\.jpg/,
	);
	await page.goto('/video/halaman/3');
	await expect(page.locator('main article')).toHaveCount(1);
	expect((await request.get('/video/halaman/4')).status()).toBe(404);
	const pages = await (await request.get('/sitemaps/pages.xml')).text();
	expect(pages).toContain('/video</loc>');
});
