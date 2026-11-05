import { describe, expect, it } from 'vitest';

import { ARTICLES, DRAFTS } from './data/articles.mjs';
import {
	DISCLAIMER,
	blocksText,
	buildBody,
	buildCorrection,
	buildFaq,
	buildLead,
	buildSources,
	buildTakeaways,
} from './generate.mjs';
import { realDataHits } from './safety.mjs';

const ctx = {
	categoryName: 'PPh 21',
	categoryPath: 'pajak/pajak-pph21',
	related: { slug: 'artikel-terkait', title: 'Artikel terkait' },
};
const ROWS = [...ARTICLES, ...DRAFTS];
const BLOCK_TYPES = new Set(['paragraph', 'heading', 'list', 'quote']);
const INLINE_TYPES = new Set(['text', 'link']);
const WORDS = { S: [600, 900], I: [500, 700], C: [500, 700], PR: [500, 700] };

function inlineNodes(blocks) {
	return blocks.flatMap((block) =>
		block.type === 'list' ? block.children.flatMap((item) => item.children) : block.children,
	);
}

describe('buildBody (§S4.5, T69)', () => {
	it('is deterministic', () => {
		for (const row of ROWS) {
			expect(JSON.stringify(buildBody(row, ctx))).toBe(JSON.stringify(buildBody(row, ctx)));
		}
	});

	it('opens and closes with the disclaimer (REQ-SEED-002)', () => {
		for (const row of ROWS) {
			const blocks = buildBody(row, ctx);
			expect(blocksText(blocks.slice(0, 1))).toBe(DISCLAIMER);
			expect(blocksText(blocks.slice(-1))).toBe(DISCLAIMER);
		}
	});

	it('uses only block types the renderer supports, headings at level 2–3', () => {
		for (const row of ROWS) {
			const blocks = buildBody(row, ctx);
			for (const block of blocks) {
				expect(BLOCK_TYPES.has(block.type), `${row.slug}: ${block.type}`).toBe(true);
				if (block.type === 'heading') {
					expect([2, 3]).toContain(block.level);
				}
				if (block.type === 'list') {
					expect(['ordered', 'unordered']).toContain(block.format);
					expect(block.children.every((item) => item.type === 'list-item')).toBe(true);
				}
			}
			for (const node of inlineNodes(blocks)) {
				expect(INLINE_TYPES.has(node.type), `${row.slug}: ${node.type}`).toBe(true);
			}
		}
	});

	it('links only to site paths or example.com', () => {
		for (const row of ROWS) {
			const links = inlineNodes(buildBody(row, ctx)).filter((node) => node.type === 'link');
			expect(links.length).toBeGreaterThan(0);
			for (const link of links) {
				expect(link.url).toMatch(/^(\/(kategori|artikel)\/|https:\/\/example\.com\/)/);
			}
		}
	});

	it('gives PR articles two sponsor links (rel=sponsored is exercised)', () => {
		for (const row of ARTICLES.filter((r) => r.type === 'PR')) {
			const outbound = inlineNodes(buildBody(row, ctx)).filter(
				(node) => node.type === 'link' && node.url.startsWith('https://'),
			);
			expect(outbound).toHaveLength(2);
		}
	});

	it('hits the target lengths: S 600–900 words, I/C/PR 500–700', () => {
		for (const row of ROWS) {
			const words = blocksText(buildBody(row, { ...ctx, related: null })).split(/\s+/).length;
			const [min, max] = WORDS[row.type];
			expect(words, row.slug).toBeGreaterThanOrEqual(min);
			expect(words, row.slug).toBeLessThanOrEqual(max);
		}
	});

	it('labels figures as fictional and contains no real contact data', () => {
		for (const row of ROWS) {
			const blocks = buildBody(row, ctx);
			expect(blocksText(blocks)).toMatch(/fiktif/);
			expect(realDataHits(JSON.stringify(blocks)), row.slug).toEqual([]);
		}
	});
});

describe('leads and rich fields', () => {
	it('leads are 120–220 characters and answer first (REQ-GEO-001)', () => {
		for (const row of ROWS) {
			const lead = buildLead(row);
			expect(lead.length, row.slug).toBeGreaterThanOrEqual(120);
			expect(lead.length, row.slug).toBeLessThanOrEqual(220);
			expect(lead.startsWith(row.answer.slice(0, 40)), row.slug).toBe(true);
		}
	});

	it('FAQ has 2–3 plain-text pairs; sources use example.org and Lembaga Contoh', () => {
		for (const row of ROWS) {
			const faq = buildFaq(row);
			expect(faq.length).toBeGreaterThanOrEqual(2);
			expect(faq.length).toBeLessThanOrEqual(3);
			const sources = buildSources(row);
			expect(sources.length).toBeGreaterThanOrEqual(1);
			expect(sources.length).toBeLessThanOrEqual(2);
			for (const source of sources) {
				expect(source.url).toMatch(/^https:\/\/example\.org\/sumber\//);
				expect(source.publisher).toBe('Lembaga Contoh');
			}
		}
	});

	it('takeaways are 3 items; a correction is one dated note', () => {
		expect(buildTakeaways(ARTICLES[0])).toHaveLength(3);
		expect(buildCorrection()).toEqual([
			{
				date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
				note: expect.any(String),
			},
		]);
	});
});
