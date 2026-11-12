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

// ---- Interview dialogue (ADR-0020) -------------------------------------------

/** Who speaks in a turn: the interviewer (the article's author) or a guest. */
export type DialogueRole = 'interviewer' | 'guest';

/** One speaker's turn: the name from the bold label and its paragraphs, label removed. */
export type DialogueTurn = {
	type: 'turn';
	speaker: string;
	role: DialogueRole;
	paragraphs: InlineNode[][];
};

/** A dialogue in body order: turns, and every other block as it was. */
export type DialogueSegment = DialogueTurn | { type: 'block'; block: BlockNode };

export type Dialogue = {
	segments: DialogueSegment[];
	/** False when no speaker matched the author, so the first speaker was taken as interviewer. */
	interviewerIsAuthor: boolean;
};

/** A speaker label is a name, not a sentence. */
const MAX_SPEAKER_LENGTH = 60;

function normalizeName(name: string): string {
	return name.trim().replace(/\s+/g, ' ').toLowerCase();
}

/**
 * A turn's label: the paragraph's first text node is bold and reads "Name:"
 * (the colon may also start the next, plain node). Returns the name and the
 * paragraph without the label, or null when the paragraph has no label.
 */
function splitSpeaker(children: InlineNode[]): { speaker: string; rest: InlineNode[] } | null {
	const [first, ...others] = children;
	if (!first || first.type !== 'text' || !first.bold) {
		return null;
	}
	let label = first.text.trim();
	let rest = others;
	if (label.endsWith(':')) {
		label = label.slice(0, -1).trim();
	} else {
		const next = others[0];
		if (!next || next.type !== 'text' || !next.text.trimStart().startsWith(':')) {
			return null;
		}
		rest = [{ ...next, text: next.text.trimStart().slice(1) }, ...others.slice(1)];
	}
	if (!label || label.length > MAX_SPEAKER_LENGTH) {
		return null;
	}
	// The space after the colon is the label's, not the text's.
	while (rest[0]?.type === 'text' && !rest[0].text.trim()) {
		rest = rest.slice(1);
	}
	const [lead, ...tail] = rest;
	if (lead && lead.type === 'text') {
		rest = [{ ...lead, text: lead.text.trimStart() }, ...tail];
	}
	return { speaker: label, rest };
}

function isEmptyParagraph(children: InlineNode[]): boolean {
	return children.every((child) => child.type === 'text' && !child.text.trim());
}

/**
 * Reads an interview body as a dialogue (ADR-0020). A paragraph starting with
 * a bold "Name:" opens a turn; plain paragraphs after it continue that turn;
 * any other block ends it and stays as it is. The speaker named like the
 * author is the interviewer, else the first speaker; everyone else is a guest.
 * Returns null unless there is at least one interviewer and one guest turn,
 * so the caller renders the body as ordinary text.
 */
export function toDialogue(body: ArticleBody, authorName: string | null): Dialogue | null {
	const segments: DialogueSegment[] = [];
	let current: DialogueTurn | null = null;
	for (const block of toBlocks(body)) {
		if (block.type !== 'paragraph') {
			current = null;
			segments.push({ type: 'block', block });
			continue;
		}
		const labelled = splitSpeaker(block.children);
		if (labelled) {
			current = {
				type: 'turn',
				speaker: labelled.speaker,
				role: 'guest',
				paragraphs: isEmptyParagraph(labelled.rest) ? [] : [labelled.rest],
			};
			segments.push(current);
			continue;
		}
		if (isEmptyParagraph(block.children)) {
			continue;
		}
		if (current) {
			current.paragraphs.push(block.children);
		} else {
			segments.push({ type: 'block', block });
		}
	}

	const turns = segments.filter((segment): segment is DialogueTurn => segment.type === 'turn');
	const firstTurn = turns[0];
	if (!firstTurn) {
		return null;
	}
	const author = authorName ? normalizeName(authorName) : '';
	const authorTurn = author
		? turns.find((turn) => normalizeName(turn.speaker) === author)
		: undefined;
	const interviewer = normalizeName((authorTurn ?? firstTurn).speaker);
	for (const turn of turns) {
		turn.role = normalizeName(turn.speaker) === interviewer ? 'interviewer' : 'guest';
	}
	const hasGuest = turns.some((turn) => turn.role === 'guest');
	if (!hasGuest) {
		return null;
	}
	return { segments, interviewerIsAuthor: authorTurn !== undefined };
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
