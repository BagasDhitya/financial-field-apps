import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import {
	safeHref,
	shiftHeadingLevel,
	toBlocks,
	toDialogue,
	type BlockNode,
	type DialogueTurn,
	type InlineNode,
	type ListNode,
	type TextNode,
} from '@/lib/blocks';
import { log } from '@/lib/log';
import type { ArticleBody as ArticleBodyContent, MediaAsset } from '@/types';

import { CmsImage } from '../CmsImage/CmsImage';

import styles from './ArticleBody.module.css';

/** Interviews (ADR-0020): render named turns as a dialogue; the author is the interviewer. */
export type DialogueOptions = {
	authorName: string | null;
	authorAvatar: MediaAsset | null;
};

export type ArticleBodyProps = {
	body: ArticleBodyContent;
	/** Site origin: absolute links to it are internal. */
	siteOrigin: string;
	/** PR articles: every outbound link is paid (REQ-SEO-024, REQ-ART-003). */
	sponsored?: boolean;
	/** Interview articles: show the body as a dialogue when it is written as one (REQ-ART-013). */
	dialogue?: DialogueOptions;
};

type LinkContext = { siteOrigin: string; sponsored: boolean };

function renderText(node: TextNode, key: number): ReactNode {
	let content: ReactNode = node.text;
	if (node.code) {
		content = <code>{content}</code>;
	}
	if (node.bold) {
		content = <strong>{content}</strong>;
	}
	if (node.italic) {
		content = <em>{content}</em>;
	}
	if (node.underline) {
		content = <u>{content}</u>;
	}
	if (node.strikethrough) {
		content = <s>{content}</s>;
	}
	return <span key={key}>{content}</span>;
}

function renderLink(node: Extract<InlineNode, { type: 'link' }>, key: number, ctx: LinkContext) {
	const children = node.children.map((child, index) => renderText(child, index));
	const href = safeHref(node.url);
	if (!href) {
		// Unsafe protocol (javascript:, data:…): keep the text, drop the link.
		return <span key={key}>{children}</span>;
	}
	const origin = ctx.siteOrigin.replace(/\/+$/, '');
	const internal = href.startsWith('/') || href.startsWith(`${origin}/`);
	if (internal) {
		const path = href.startsWith('/') ? href : href.slice(origin.length);
		return (
			<Link key={key} href={path}>
				{children}
			</Link>
		);
	}
	if (ctx.sponsored) {
		return (
			<a key={key} href={href} rel="sponsored noopener" target="_blank">
				{children}
				<span className="visually-hidden"> (tautan sponsor, tab baru)</span>
			</a>
		);
	}
	return (
		<a key={key} href={href} rel="noopener">
			{children}
		</a>
	);
}

function renderInline(nodes: InlineNode[], ctx: LinkContext): ReactNode[] {
	return nodes.map((node, index) =>
		node.type === 'link' ? renderLink(node, index, ctx) : renderText(node, index),
	);
}

function renderList(node: ListNode, key: number, ctx: LinkContext): ReactNode {
	const Tag = node.format === 'ordered' ? 'ol' : 'ul';
	return (
		<Tag key={key}>
			{node.children.map((child, index) =>
				child.type === 'list' ? (
					<li key={index}>{renderList(child, index, ctx)}</li>
				) : (
					<li key={index}>{renderInline(child.children, ctx)}</li>
				),
			)}
		</Tag>
	);
}

function renderBlock(block: BlockNode, key: number, ctx: LinkContext): ReactNode {
	switch (block.type) {
		case 'paragraph': {
			const children = renderInline(block.children, ctx);
			const empty = block.children.every((child) => child.type === 'text' && !child.text);
			return empty ? null : <p key={key}>{children}</p>;
		}
		case 'heading': {
			const Heading = `h${shiftHeadingLevel(block.level)}` as 'h2';
			return <Heading key={key}>{renderInline(block.children, ctx)}</Heading>;
		}
		case 'quote':
			return <blockquote key={key}>{renderInline(block.children, ctx)}</blockquote>;
		case 'code':
			return (
				<pre key={key}>
					<code>{renderInline(block.children, ctx)}</code>
				</pre>
			);
		case 'list':
			return renderList(block, key, ctx);
		case 'image': {
			const { image } = block;
			if (!image.url || !image.mime?.startsWith('image/')) {
				return null;
			}
			return (
				<figure key={key}>
					<Image
						src={image.url}
						alt={image.alternativeText ?? ''}
						width={image.width ?? 1200}
						height={image.height ?? 675}
						sizes="(min-width: 1024px) 38rem, 100vw"
					/>
					{image.caption ? <figcaption>{image.caption}</figcaption> : null}
				</figure>
			);
		}
		default:
			return null;
	}
}

const ROLE_LABEL: Record<DialogueTurn['role'], string> = {
	interviewer: 'Pewawancara',
	guest: 'Narasumber',
};

/** Up to two letters: the first and last word of the name ("Narasumber Contoh Satu" → "NS"). */
function initials(name: string): string {
	const words = name.split(/\s+/).filter(Boolean);
	const first = words[0];
	if (!first) {
		return '?';
	}
	const last = words.length > 1 ? (words[words.length - 1] ?? '') : '';
	return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

function renderTurn(
	turn: DialogueTurn,
	key: number,
	ctx: LinkContext,
	/** The author's photo, only when the interviewer is the author. */
	interviewerAvatar: MediaAsset | null,
): ReactNode {
	const avatar = turn.role === 'interviewer' ? interviewerAvatar : null;
	return (
		<div key={key} className={`${styles.turn} ${styles[turn.role]}`} data-role={turn.role}>
			<span className={styles.avatar} aria-hidden="true">
				{avatar ? (
					<CmsImage image={avatar} sizes="48px" ratio="1/1" decorative />
				) : (
					<span className={styles.initials}>{initials(turn.speaker)}</span>
				)}
			</span>
			<div className={styles.bubble}>
				<p className={styles.speaker}>
					<strong>{turn.speaker}</strong>
					<span className="visually-hidden">, </span>
					<span className={`type-label ${styles.role}`}>{ROLE_LABEL[turn.role]}</span>
				</p>
				{turn.paragraphs.map((children, index) => (
					<p key={index}>{renderInline(children, ctx)}</p>
				))}
			</div>
		</div>
	);
}

/**
 * Server-side Blocks renderer. Replaces @strapi/blocks-react-renderer, which
 * is a client component (DSC-0009): rendering here ships no JS for article
 * bodies and lets us shift headings, filter link protocols and mark
 * sponsored links (REQ-ART-011, REQ-SEC-004, REQ-SEO-021/024). With
 * `dialogue`, an interview written as named turns shows as speech bubbles
 * (REQ-ART-013); otherwise it falls back to ordinary text with one warn.
 */
export function ArticleBody({ body, siteOrigin, sponsored = false, dialogue }: ArticleBodyProps) {
	const ctx = { siteOrigin, sponsored };
	if (dialogue) {
		const parsed = toDialogue(body, dialogue.authorName);
		if (parsed) {
			const avatar = parsed.interviewerIsAuthor ? dialogue.authorAvatar : null;
			return (
				<div className={`${styles.body} ${styles.dialogue}`}>
					{parsed.segments.map((segment, index) =>
						segment.type === 'turn'
							? renderTurn(segment, index, ctx, avatar)
							: renderBlock(segment.block, index, ctx),
					)}
				</div>
			);
		}
		// Counts only: the body is editor content (W3).
		log.warn(
			'ArticleBody::dialogue',
			`interview body has no interviewer and guest turns (${body.length} blocks); rendered as text`,
		);
	}
	return (
		<div className={styles.body}>
			{toBlocks(body).map((block, index) => renderBlock(block, index, ctx))}
		</div>
	);
}
