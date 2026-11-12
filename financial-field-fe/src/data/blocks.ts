/**
 * Helpers that write article bodies as Strapi Blocks, the format the body
 * renderer reads (src/lib/blocks.ts) and the CMS stores. `p('Teks ',
 * link('/artikel/a', 'judul'), '.')` reads like the text it makes. Only the
 * node types the renderer supports are made here. Heading helpers are named
 * after the tag they render: the renderer shifts Blocks levels down by one
 * (REQ-ART-011), so `h2()` stores level 1. `say()` writes an interview turn.
 */

type TextNode = { type: 'text'; text: string; bold?: true };

type LinkNode = { type: 'link'; url: string; children: TextNode[] };

type Inline = string | LinkNode;

type Block = {
	type: string;
	children: Record<string, unknown>[];
	[key: string]: unknown;
};

function text(value: string): TextNode {
	return { type: 'text', text: value };
}

function inlines(children: Inline[]): (TextNode | LinkNode)[] {
	return children.map((child) => (typeof child === 'string' ? text(child) : child));
}

function list(format: 'ordered' | 'unordered', items: (Inline | Inline[])[]): Block {
	return {
		type: 'list',
		format,
		children: items.map((item) => ({
			type: 'list-item',
			children: inlines(Array.isArray(item) ? item : [item]),
		})),
	};
}

/** A paragraph of text and links. */
export function p(...children: Inline[]): Block {
	return { type: 'paragraph', children: inlines(children) };
}

/**
 * One turn of an interview (ADR-0020): the paragraph starts with the speaker's
 * name in bold and a colon, exactly as an editor writes it in Strapi
 * (`**Nama:** teks`). Plain `p()` paragraphs right after it continue the turn.
 */
export function say(speaker: string, ...children: Inline[]): Block {
	return {
		type: 'paragraph',
		children: [
			{ type: 'text', text: `${speaker}:`, bold: true },
			...inlines([' ', ...children]),
		],
	};
}

/** A section heading, rendered as h2. The article title is the page's only h1 (REQ-A11Y-011). */
export function h2(value: string): Block {
	return { type: 'heading', level: 1, children: [text(value)] };
}

/** A sub-section heading, rendered as h3. */
export function h3(value: string): Block {
	return { type: 'heading', level: 2, children: [text(value)] };
}

/** A numbered list; an item may be a string or a list of text and links. */
export function ol(...items: (Inline | Inline[])[]): Block {
	return list('ordered', items);
}

/** A bulleted list; an item may be a string or a list of text and links. */
export function ul(...items: (Inline | Inline[])[]): Block {
	return list('unordered', items);
}

/** A pulled quote or tip. */
export function quote(value: string): Block {
	return { type: 'quote', children: [text(value)] };
}

/** An inline link: internal paths (`/artikel/…`) or https URLs. */
export function link(url: string, value: string): LinkNode {
	return { type: 'link', url, children: [text(value)] };
}
