import { log } from '@/lib/log';
import type { ArticleBody } from '@/types';

/**
 * Strapi Blocks JSON, narrowed. src/types keeps the body opaque; this module is
 * the only place that knows its shape (rendering: components/ArticleBody).
 */
export type TextNode = {
	type: 'text';
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
};

export type LinkNode = { type: 'link'; url: string; children: TextNode[] };

export type InlineNode = TextNode | LinkNode;

export type ListItemNode = { type: 'list-item'; children: InlineNode[] };

export type ListNode = {
	type: 'list';
	format: 'ordered' | 'unordered';
	children: (ListItemNode | ListNode)[];
};

export type BlockImage = {
	url: string;
	alternativeText?: string | null;
	caption?: string | null;
	width?: number | null;
	height?: number | null;
	mime?: string | null;
};

export type BlockNode =
	| { type: 'paragraph'; children: InlineNode[] }
	| { type: 'quote'; children: InlineNode[] }
	| { type: 'code'; children: InlineNode[] }
	| { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
	| ListNode
	| { type: 'image'; image: BlockImage };

const BLOCK_TYPES = new Set(['paragraph', 'quote', 'code', 'heading', 'list', 'image']);

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

/** Drops anything that is not a known block type (W2: never throw). */
export function toBlocks(body: ArticleBody): BlockNode[] {
	return body.filter(
		(node): node is BlockNode =>
			isRecord(node) && typeof node.type === 'string' && BLOCK_TYPES.has(node.type),
	) as BlockNode[];
}

function inlineText(nodes: readonly unknown[] | undefined): string {
	if (!nodes) {
		return '';
	}
	return nodes
		.map((node) => {
			if (!isRecord(node)) {
				return '';
			}
			if (node.type === 'text') {
				return typeof node.text === 'string' ? node.text : '';
			}
			return inlineText(node.children as unknown[] | undefined);
		})
		.join('');
}

/** Plain text of the body, one block per line (word count, reading time). */
export function blocksToPlainText(body: ArticleBody): string {
	return toBlocks(body)
		.map((block) => {
			if (block.type === 'image') {
				return '';
			}
			return inlineText(block.children as unknown[]);
		})
		.filter(Boolean)
		.join('\n');
}

/** One glossary entry: the term, its definition as plain text, and its anchor id. */
export type GlossaryTerm = { term: string; definition: string; anchor: string };

/** The terms under one letter heading. */
export type GlossaryGroup = { letter: string; anchor: string; terms: GlossaryTerm[] };

/** "Bunga flat" → "bunga-flat": an id for a term or letter. */
export function anchorOf(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * A glossary written as an ordinary Static Page body (ADR-0022): a level-1
 * heading per letter, a level-2 heading per term, then the paragraphs that
 * define it. Blocks before the first letter are the intro, kept as Blocks.
 * Terms without a definition are dropped (W2).
 */
export function toGlossary(body: ArticleBody): { intro: ArticleBody; groups: GlossaryGroup[] } {
	const blocks = toBlocks(body);
	const firstLetter = blocks.findIndex((block) => block.type === 'heading' && block.level === 1);
	const intro = firstLetter === -1 ? blocks : blocks.slice(0, firstLetter);
	const groups: GlossaryGroup[] = [];
	let term: GlossaryTerm | null = null;
	const close = () => {
		if (term && term.definition) {
			groups.at(-1)?.terms.push(term);
		}
		term = null;
	};
	for (const block of firstLetter === -1 ? [] : blocks.slice(firstLetter)) {
		if (block.type === 'heading' && block.level === 1) {
			close();
			const letter = inlineText(block.children).trim();
			groups.push({ letter, anchor: `huruf-${anchorOf(letter)}`, terms: [] });
		} else if (block.type === 'heading' && block.level === 2) {
			close();
			const name = inlineText(block.children).trim();
			term = { term: name, definition: '', anchor: anchorOf(name) };
		} else if (term && block.type === 'paragraph') {
			const text = inlineText(block.children).trim();
			term.definition = term.definition ? `${term.definition} ${text}` : text;
		}
	}
	close();
	return { intro, groups: groups.filter((group) => group.terms.length > 0) };
}

/**
 * The text of the first list items in the body, up to `max`: a product's
 * feature highlights on cards and in the comparison table (PRP-0002.p3 T08).
 */
export function firstListItems(body: ArticleBody, max: number): string[] {
	const items: string[] = [];
	for (const block of toBlocks(body)) {
		if (block.type !== 'list') {
			continue;
		}
		for (const item of block.children) {
			if (items.length >= max) {
				return items;
			}
			if (item.type === 'list-item') {
				const text = inlineText(item.children).trim();
				if (text) {
					items.push(text);
				}
			}
		}
	}
	return items;
}

/** Body heading levels shift down by one so the page keeps a single H1 (REQ-SEO-021). */
export function shiftHeadingLevel(level: number): 2 | 3 | 4 | 5 | 6 {
	return Math.min(6, Math.max(2, level + 1)) as 2 | 3 | 4 | 5 | 6;
}

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:']);

/** Allows http, https, mailto and site-relative links only (REQ-SEC-004). */
export function safeHref(url: string): string | null {
	const trimmed = url.trim();
	if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
		return trimmed;
	}
	let parsed: URL;
	try {
		parsed = new URL(trimmed);
	} catch {
		// Length only: the link text is editor content, not ours to log.
		log.warn('blocks::safeHref', `dropped link: invalid URL, length ${trimmed.length}`);
		return null;
	}
	if (!SAFE_PROTOCOLS.has(parsed.protocol)) {
		log.warn('blocks::safeHref', `dropped link: protocol ${parsed.protocol}`);
		return null;
	}
	return parsed.toString();
}
