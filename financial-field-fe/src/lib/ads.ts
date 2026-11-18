/**
 * Ad placement rules (ADR-0024). Client-safe and pure, so the server renderer
 * and the pop-up share them and unit tests cover them. No ad network yet: the
 * slots are reserved spaces behind FEATURE_ADS.
 */

/** Every placement on the site; each becomes `data-ad-placement` for later analytics. */
export const AD_PLACEMENTS = [
	'home-rail',
	'home-banner',
	'home-pr-articles',
	'article-body',
	'article-rail',
	'article-partner-links',
	'article-popup',
	'product-rail',
	'comparison-pr-top',
	'comparison-pr-panel',
] as const;

export type AdPlacement = (typeof AD_PLACEMENTS)[number];

/** IAB sizes from SPC-ui-design-system §AdSlot. */
export type AdSize = '300x250' | '300x600' | '728x90' | '320x100';

/** The in-body rule: the first slot after paragraph 3, then every 6 paragraphs. */
export const IN_BODY_FIRST = 3;
export const IN_BODY_EVERY = 6;
/** Bodies with fewer paragraphs get no in-body slot. */
export const IN_BODY_MIN_PARAGRAPHS = 6;

type BlockLike = { type: string; children?: unknown };

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

/** A paragraph with visible text (the renderer drops empty ones, so they don't count). */
function isTextParagraph(block: BlockLike): boolean {
	if (block.type !== 'paragraph' || !Array.isArray(block.children)) {
		return false;
	}
	return block.children.some(
		(child) =>
			isRecord(child) &&
			(child.type === 'link' || (typeof child.text === 'string' && child.text.trim() !== '')),
	);
}

/**
 * Indexes of the top-level blocks an in-body slot follows. Slots sit only
 * between top-level blocks, so never inside a list, table, quote or code
 * block; they need a paragraph or heading right after them, so a paragraph
 * that introduces a list keeps its list (the slot moves to the next fit), and
 * a body never ends on an ad. FAQ, interview turns and the video live outside
 * the body and are never touched.
 */
export function inBodyAdPositions(blocks: readonly BlockLike[]): number[] {
	const paragraphs = blocks.filter(isTextParagraph).length;
	if (paragraphs < IN_BODY_MIN_PARAGRAPHS) {
		return [];
	}
	const positions: number[] = [];
	let count = 0;
	let target = IN_BODY_FIRST;
	for (let index = 0; index < blocks.length; index += 1) {
		const block = blocks[index];
		if (!block || !isTextParagraph(block)) {
			continue;
		}
		count += 1;
		if (count < target) {
			continue;
		}
		const next = blocks[index + 1];
		if (next && (next.type === 'heading' || isTextParagraph(next))) {
			positions.push(index);
			target = count + IN_BODY_EVERY;
		}
	}
	return positions;
}

/** sessionStorage keys for the soft pop-up. */
export const POPUP_VIEWS_KEY = 'ffid-ad-article-views';
export const POPUP_SHOWN_KEY = 'ffid-ad-popup-shown';
/** Set on <html> while the pop-up shows; the article rail's ad hides meanwhile. */
export const POPUP_OPEN_ATTRIBUTE = 'data-ffid-ad-popup';
/** Scroll depth through the article before the pop-up may show. */
export const POPUP_SCROLL_DEPTH = 0.5;

type SessionStore = Pick<Storage, 'getItem' | 'setItem'>;

/**
 * Counts this article view and says whether the pop-up may show on it: never
 * on the first article of the session, and once per session. Storage that
 * throws (private mode, blocked) means no pop-up.
 */
export function registerArticleView(storage: SessionStore): boolean {
	try {
		const views = (Number.parseInt(storage.getItem(POPUP_VIEWS_KEY) ?? '0', 10) || 0) + 1;
		storage.setItem(POPUP_VIEWS_KEY, String(views));
		return views >= 2 && storage.getItem(POPUP_SHOWN_KEY) !== '1';
	} catch {
		// Storage blocked: the expected "no" (W2).
		return false;
	}
}

/** Records that the pop-up showed in this session. */
export function markPopupShown(storage: SessionStore): void {
	try {
		storage.setItem(POPUP_SHOWN_KEY, '1');
	} catch {
		// Storage blocked: it may show again on the next article, which is harmless.
	}
}

/** True once the reader has scrolled through `depth` of the element. */
export function hasScrolledPast(
	rect: { top: number; height: number },
	viewportHeight: number,
	depth: number = POPUP_SCROLL_DEPTH,
): boolean {
	if (rect.height <= 0) {
		return false;
	}
	return viewportHeight - rect.top >= rect.height * depth;
}
