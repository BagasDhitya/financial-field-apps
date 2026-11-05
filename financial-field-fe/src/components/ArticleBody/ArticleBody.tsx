import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import {
	safeHref,
	shiftHeadingLevel,
	toBlocks,
	type BlockNode,
	type InlineNode,
	type ListNode,
	type TextNode,
} from '@/lib/blocks';
import type { ArticleBody as ArticleBodyContent } from '@/types';

import styles from './ArticleBody.module.css';

export type ArticleBodyProps = {
	body: ArticleBodyContent;
	/** Site origin: absolute links to it are internal. */
	siteOrigin: string;
	/** PR articles: every outbound link is paid (REQ-SEO-024, REQ-ART-003). */
	sponsored?: boolean;
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

/**
 * Server-side Blocks renderer. Replaces @strapi/blocks-react-renderer, which
 * is a client component (DSC-0009): rendering here ships no JS for article
 * bodies and lets us shift headings, filter link protocols and mark
 * sponsored links (REQ-ART-011, REQ-SEC-004, REQ-SEO-021/024).
 */
export function ArticleBody({ body, siteOrigin, sponsored = false }: ArticleBodyProps) {
	const ctx = { siteOrigin, sponsored };
	return (
		<div className={styles.body}>
			{toBlocks(body).map((block, index) => renderBlock(block, index, ctx))}
		</div>
	);
}
