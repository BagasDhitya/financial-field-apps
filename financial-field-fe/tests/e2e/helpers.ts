import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

/** AC17: zero serious or critical axe violations. */
export async function expectNoSeriousA11yViolations(page: Page) {
	const results = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
		.analyze();
	const serious = results.violations.filter(
		(violation) => violation.impact === 'serious' || violation.impact === 'critical',
	);
	expect(
		serious.map(
			(violation) =>
				`${violation.id}: ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`,
		),
	).toEqual([]);
}

export async function jsonLdTypes(page: Page): Promise<string[]> {
	const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
	return blocks.flatMap((block) =>
		(JSON.parse(block) as { '@graph': { '@type': string }[] })['@graph'].map(
			(node) => node['@type'],
		),
	);
}

/** No horizontal page scroll (REQ-NAV-007, REQ-A11Y-014). */
export async function expectNoHorizontalScroll(page: Page) {
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
	);
	expect(overflow).toBeLessThanOrEqual(0);
}
