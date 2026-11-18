import { expect, test, type BrowserContext, type Page } from '@playwright/test';

/**
 * Ad placements (ADR-0024), with FEATURE_ADS on as staging runs. Every slot is
 * a reserved space; nothing loads from an ad network.
 */

const LONG = '/artikel/zakat-dan-sumbangan-pengurang-pajak';
const SHORT = '/artikel/biaya-pinjaman-selain-bunga';
const OTHER = '/artikel/bunga-flat-dan-bunga-efektif';
const PR = '/artikel/pr-kartu-kredit-cashback-contoh';

/** Answers the consent banner up front, so it is not on screen. */
async function withConsent(context: BrowserContext, baseURL: string | undefined) {
	await context.addCookies([
		{ name: 'ffid_consent', value: 'denied', url: baseURL ?? 'http://localhost:3100' },
	]);
}

async function scrollThroughBody(page: Page, depth: number) {
	await page.evaluate((share) => {
		const body = document.querySelector('[data-article-body]');
		if (body) {
			const rect = body.getBoundingClientRect();
			window.scrollTo(0, window.scrollY + rect.top + rect.height * share);
		}
	}, depth);
}

test('in-body slots sit between paragraphs, after paragraph 3 and then every 6', async ({
	page,
}) => {
	await page.goto(LONG);
	const facts = await page.evaluate(() => {
		const body = document.querySelector('[data-article-body]');
		const slots = Array.from(document.querySelectorAll('[data-ad-placement="article-body"]'));
		const children = Array.from(body?.children ?? []);
		return {
			slots: slots.length,
			paragraphsBeforeFirst: (() => {
				const wrapper = slots[0]?.parentElement;
				const index = wrapper ? children.indexOf(wrapper) : -1;
				return children.slice(0, index).filter((el) => el.tagName === 'P').length;
			})(),
			placement: slots.map((slot) => {
				const wrapper = slot.parentElement;
				return {
					direct: wrapper?.parentElement === body,
					before: wrapper?.previousElementSibling?.tagName ?? null,
					after: wrapper?.nextElementSibling?.tagName ?? null,
					nested: Boolean(slot.closest('li, blockquote, table, details')),
				};
			}),
		};
	});
	expect(facts.slots).toBeGreaterThan(0);
	expect(facts.paragraphsBeforeFirst).toBeGreaterThanOrEqual(3);
	for (const slot of facts.placement) {
		expect(slot.direct).toBe(true);
		expect(slot.before).toBe('P');
		expect(['P', 'H2', 'H3']).toContain(slot.after);
		expect(slot.nested).toBe(false);
	}
	await expect(page.locator('[data-ad-placement="article-body"]').first()).toHaveAttribute(
		'data-ad-size',
		'300x250',
	);
});

test('a short article and a PR article have no in-body slot', async ({ page }) => {
	await page.goto(SHORT);
	const paragraphs = await page.locator('[data-article-body] > p').count();
	expect(paragraphs).toBeLessThan(6);
	await expect(page.locator('[data-ad-placement="article-body"]')).toHaveCount(0);

	await page.goto(PR);
	await expect(page.locator('[data-ad-placement="article-body"]')).toHaveCount(0);
	// The rail slot and the partner links are not inside the sponsor's text, so they stay.
	await expect(page.locator('[data-ad-placement="article-rail"]')).toHaveCount(1);
});

test('the article rail ad is sticky: 300×600 from 1280 px, 300×250 below, none under 1024', async ({
	page,
}) => {
	await page.goto(LONG);
	const rail = page.locator('[data-ad-placement="article-rail"]');
	await expect(rail).toBeVisible();
	await expect(rail.locator('xpath=..')).toHaveCSS('position', 'sticky');
	let box = await rail.boundingBox();
	expect(Math.round(box?.width ?? 0)).toBe(300);
	expect(Math.round(box?.height ?? 0)).toBe(600);

	await page.setViewportSize({ width: 1100, height: 800 });
	box = await rail.boundingBox();
	expect(Math.round(box?.height ?? 0)).toBe(250);

	await page.setViewportSize({ width: 900, height: 800 });
	await expect(rail).toBeHidden();
});

test('"Dari mitra media" links are labelled, sponsored and tagged', async ({ page }) => {
	await page.goto(LONG);
	const block = page.locator('[data-ad-placement="article-partner-links"]');
	await expect(block.getByRole('heading', { name: 'Dari mitra media' })).toBeVisible();
	await expect(block.getByText('Iklan', { exact: true })).toBeVisible();
	const links = block.getByRole('link');
	await expect(links).toHaveCount(4);
	for (const link of await links.all()) {
		await expect(link).toHaveAttribute('rel', 'sponsored noopener');
		await expect(link).toHaveAttribute('target', '_blank');
		const href = new URL((await link.getAttribute('href')) ?? '');
		expect(href.protocol).toBe('https:');
		expect(href.searchParams.get('utm_campaign')).toBe('mitra-media');
		expect(href.searchParams.get('utm_content')).toBe('zakat-dan-sumbangan-pengurang-pajak');
	}
});

test('the pop-up: never on the first article, after half the body, once per session', async ({
	page,
	context,
	baseURL,
}) => {
	await withConsent(context, baseURL);
	const popup = page.locator('[data-ad-popup]');

	await page.goto(SHORT);
	await scrollThroughBody(page, 0.9);
	await page.waitForTimeout(300);
	await expect(popup).toHaveCount(0);

	await page.goto(LONG);
	await scrollThroughBody(page, 0.2);
	await page.waitForTimeout(300);
	await expect(popup).toHaveCount(0);
	await scrollThroughBody(page, 0.4);
	await expect(popup).toBeVisible();
	// Desktop: the 300×250 box, bottom right; focus stays where it was.
	await expect(popup.locator('[data-ad-size="300x250"]')).toBeVisible();
	await expect(popup.locator('[data-ad-size="320x100"]')).toBeHidden();
	await expect(popup).toHaveCSS('position', 'fixed');
	expect(await page.evaluate(() => document.activeElement === document.body)).toBe(true);
	// The rail's ad steps aside while it shows.
	await expect(page.locator('[data-ad-placement="article-rail"]').locator('xpath=..')).toHaveCSS(
		'visibility',
		'hidden',
	);
	await page.keyboard.press('Escape');
	await expect(popup).toHaveCount(0);
	await expect(page.locator('[data-ad-placement="article-rail"]').locator('xpath=..')).toHaveCSS(
		'visibility',
		'visible',
	);

	await page.goto(OTHER);
	await scrollThroughBody(page, 0.9);
	await page.waitForTimeout(300);
	await expect(popup).toHaveCount(0);
});

test('the pop-up waits while the consent banner is on screen', async ({ page }) => {
	await page.goto(SHORT);
	await page.goto(LONG);
	await expect(page.getByRole('region', { name: 'Cookie analitik' })).toBeVisible();
	await scrollThroughBody(page, 0.9);
	await page.waitForTimeout(300);
	await expect(page.locator('[data-ad-popup]')).toHaveCount(0);
});

test('a PR article never shows the pop-up', async ({ page, context, baseURL }) => {
	await withConsent(context, baseURL);
	await page.goto(SHORT);
	await page.goto(PR);
	await scrollThroughBody(page, 0.9);
	await page.waitForTimeout(300);
	await expect(page.locator('[data-ad-popup]')).toHaveCount(0);
});

test('below 1024 px the pop-up is a closable bar on the bottom edge', async ({
	page,
	context,
	baseURL,
}) => {
	await withConsent(context, baseURL);
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto(SHORT);
	await page.goto(LONG);
	await scrollThroughBody(page, 0.6);
	const popup = page.locator('[data-ad-popup]');
	await expect(popup).toBeVisible();
	await expect(popup.locator('[data-ad-size="320x100"]')).toBeVisible();
	await expect(popup.locator('[data-ad-size="300x250"]')).toBeHidden();
	const box = await popup.boundingBox();
	expect(Math.round((box?.y ?? 0) + (box?.height ?? 0))).toBe(844);
	expect(Math.round(box?.width ?? 0)).toBe(390);
	await popup.getByRole('button', { name: 'Tutup iklan' }).click();
	await expect(popup).toHaveCount(0);
});

test('product page: PR label for a partner, a rail slot and the outbound button twice', async ({
	page,
}) => {
	await page.goto('/produk/contoh-bank-utama-kredit-kendaraan');
	const header = page.locator('header').filter({ has: page.locator('h1') });
	await expect(header.getByText(/^PR\b/)).toBeVisible();
	await expect(page.locator('[data-ad-placement="product-rail"]')).toBeVisible();
	const outbound = page.locator('main a[data-outbound]');
	await expect(outbound).toHaveCount(2);
	for (const link of await outbound.all()) {
		await expect(link).toHaveAttribute('rel', 'sponsored noopener');
		await expect(link).not.toContainText('Ajukan');
	}

	await page.goto('/produk/contoh-dana-kendaraan-kredit-mobil-bekas');
	const plain = page.locator('header').filter({ has: page.locator('h1') });
	await expect(plain.getByText(/^PR\b/)).toHaveCount(0);
});

test('section page: the PR card on top, PR labels in the results and the Rekomendasi panel', async ({
	page,
}) => {
	await page.goto('/bandingkan/kredit-mobil');
	const top = page.locator('[data-ad-placement="comparison-pr-top"]');
	await expect(top).toBeVisible();
	await expect(top.getByText(/^PR\b/)).toBeVisible();
	await expect(top.locator('a[data-outbound]')).toHaveAttribute('rel', 'sponsored noopener');

	// The PR card comes before the survey; the panel after the results.
	const order = await page.evaluate(() => {
		const at = (selector: string) => {
			const el = document.querySelector(selector);
			return el ? Array.from(document.querySelectorAll('main *')).indexOf(el) : -1;
		};
		return {
			top: at('[data-ad-placement="comparison-pr-top"]'),
			table: at('main table'),
			panel: at('[data-ad-placement="comparison-pr-panel"]'),
		};
	});
	expect(order.top).toBeLessThan(order.table);
	expect(order.table).toBeLessThan(order.panel);

	const panel = page.locator('[data-ad-placement="comparison-pr-panel"]');
	await expect(panel.getByRole('heading', { name: 'Rekomendasi' })).toBeVisible();
	await expect(panel.getByRole('listitem')).toHaveCount(3);
	await expect(page.locator('main table tbody').getByText(/^PR\b/)).toHaveCount(3);
	// The disclosure that the order is unpaid stays.
	await expect(page.getByText('Urutan produk tidak dibayar oleh penyedia.')).toBeVisible();
});

for (const width of [360, 768, 1024, 1280]) {
	test(`no horizontal scroll with the ad units at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		for (const path of [
			'/',
			LONG,
			'/produk/contoh-bank-utama-kredit-kendaraan',
			'/bandingkan/kredit-mobil',
		]) {
			await page.goto(path);
			const overflow = await page.evaluate(
				() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
			);
			expect(overflow, path).toBeLessThanOrEqual(0);
		}
	});
}

test('home: the banner under the river, "Rekomendasi" PR articles and the comparison tiles', async ({
	page,
}) => {
	await page.goto('/');
	const banner = page.locator('[data-ad-placement="home-banner"]');
	await expect(banner).toBeVisible();
	let box = await banner.boundingBox();
	expect(Math.round(box?.width ?? 0)).toBe(728);
	expect(Math.round(box?.height ?? 0)).toBe(90);

	// Order: river → banner → Video; "Rekomendasi" and the tiles after Wawancara.
	const order = await page.evaluate(() => {
		const all = Array.from(document.querySelectorAll('main *'));
		const at = (selector: string) => {
			const el = document.querySelector(selector);
			return el ? all.indexOf(el) : -1;
		};
		return [
			at('#terbaru'),
			at('[data-ad-placement="home-banner"]'),
			at('#video'),
			at('#wawancara'),
			at('#rekomendasi-pr'),
			at('#bandingkan-produk'),
		];
	});
	expect(order.every((value) => value >= 0)).toBe(true);
	expect([...order].sort((a, b) => a - b)).toEqual(order);

	const pr = page.locator('[data-ad-placement="home-pr-articles"]');
	const cards = pr.getByRole('listitem');
	expect(await cards.count()).toBeGreaterThan(0);
	expect(await cards.count()).toBeLessThanOrEqual(5);
	for (const card of await cards.all()) {
		await expect(card.getByText(/^PR\b/)).toBeVisible();
	}
	// The PR spot's article is not repeated in "Rekomendasi".
	const spotHref = await page
		.getByRole('complementary')
		.getByRole('region', { name: 'Konten bersponsor' })
		.getByRole('link')
		.first()
		.getAttribute('href');
	await expect(pr.locator(`a[href="${spotHref}"]`)).toHaveCount(0);

	const tiles = page.locator('#bandingkan-produk').locator('xpath=ancestor::section[1]');
	await expect(tiles.getByRole('link', { name: /^Bandingkan Jaminan BPKB/ })).toHaveAttribute(
		'href',
		'/bandingkan/jaminan-bpkb',
	);
	await expect(tiles.getByRole('link', { name: /^Bandingkan Kredit Mobil/ })).toHaveAttribute(
		'href',
		'/bandingkan/kredit-mobil',
	);

	await page.setViewportSize({ width: 390, height: 844 });
	box = await banner.boundingBox();
	expect(Math.round(box?.width ?? 0)).toBe(320);
	expect(Math.round(box?.height ?? 0)).toBe(100);
});
