import { describe, expect, it } from 'vitest';

import {
	POPUP_SHOWN_KEY,
	POPUP_VIEWS_KEY,
	hasScrolledPast,
	inBodyAdPositions,
	markPopupShown,
	registerArticleView,
} from './ads';

const p = (text = 'Isi paragraf.') => ({ type: 'paragraph', children: [{ type: 'text', text }] });
const h = () => ({ type: 'heading', level: 2, children: [{ type: 'text', text: 'Judul' }] });
const list = () => ({ type: 'list', format: 'unordered', children: [] });
const quote = () => ({ type: 'quote', children: [{ type: 'text', text: 'Kutipan' }] });

function memoryStore() {
	const data = new Map<string, string>();
	return {
		getItem: (key: string) => data.get(key) ?? null,
		setItem: (key: string, value: string) => {
			data.set(key, value);
		},
	};
}

describe('inBodyAdPositions (ADR-0024)', () => {
	it('places nothing in a body with fewer than 6 paragraphs', () => {
		expect(inBodyAdPositions([p(), p(), p(), p(), p()])).toEqual([]);
	});

	it('places the first slot after paragraph 3, then every 6 paragraphs', () => {
		const body = Array.from({ length: 16 }, () => p());
		expect(inBodyAdPositions(body)).toEqual([2, 8, 14]);
	});

	it('never ends the body on a slot', () => {
		const body = Array.from({ length: 9 }, () => p());
		// Paragraph 9 is the last block, so only the first slot.
		expect(inBodyAdPositions(body)).toEqual([2]);
	});

	it('keeps a list or quote with the paragraph before it and skips empty paragraphs', () => {
		const body = [
			p(),
			p(),
			p('Berikut syaratnya:'),
			list(),
			p(''),
			p(),
			quote(),
			p(),
			h(),
			p(),
		];
		// Paragraph 3 is followed by a list and paragraph 4 by a quote: the slot moves to paragraph 5.
		expect(inBodyAdPositions(body)).toEqual([7]);
	});

	it('counts link-only paragraphs as text', () => {
		const link = { type: 'paragraph', children: [{ type: 'link', url: '/x', children: [] }] };
		expect(inBodyAdPositions([p(), p(), link, p(), p(), p()])).toEqual([2]);
	});
});

describe('the soft pop-up session rules (ADR-0024)', () => {
	it('never shows on the first article, then once per session', () => {
		const store = memoryStore();
		expect(registerArticleView(store)).toBe(false);
		expect(registerArticleView(store)).toBe(true);
		markPopupShown(store);
		expect(store.getItem(POPUP_SHOWN_KEY)).toBe('1');
		expect(registerArticleView(store)).toBe(false);
		expect(store.getItem(POPUP_VIEWS_KEY)).toBe('3');
	});

	it('shows nothing when storage throws', () => {
		const blocked = {
			getItem: () => {
				throw new Error('blocked');
			},
			setItem: () => {
				throw new Error('blocked');
			},
		};
		expect(registerArticleView(blocked)).toBe(false);
		expect(() => markPopupShown(blocked)).not.toThrow();
	});

	it('measures the scroll depth through the article', () => {
		expect(hasScrolledPast({ top: 100, height: 2000 }, 800)).toBe(false);
		expect(hasScrolledPast({ top: -300, height: 2000 }, 800)).toBe(true);
		expect(hasScrolledPast({ top: 0, height: 0 }, 800)).toBe(false);
	});
});
