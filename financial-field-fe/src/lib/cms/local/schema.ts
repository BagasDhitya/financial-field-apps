import type { CmsCapability } from '../capabilities';

/**
 * The content types the local API serves, attribute for attribute. Unmarked
 * attributes are in `financial-field-cms/src/api/**` today. Attributes with
 * `planned` are the CMS-nn changes the frontend asks for (SPC-content-model
 * §5): the local API has them all, the CMS gets them one by one, and the
 * capability gate keeps the frontend from asking the CMS for one too early.
 */

export type ComponentName =
	| 'shared.seo'
	| 'article.faq-item'
	| 'article.source'
	| 'article.takeaway'
	| 'article.correction'
	| 'shared.link'
	| 'navigation.menu-item'
	| 'site.social-link';

export type Attribute =
	| { kind: 'scalar'; planned?: CmsCapability }
	| { kind: 'media'; planned?: CmsCapability }
	| { kind: 'component'; component: ComponentName; repeatable: boolean; planned?: CmsCapability }
	| { kind: 'relation'; target: ContentTypeName; many: boolean; planned?: CmsCapability };

export type ContentTypeName =
	| 'articles'
	| 'categories'
	| 'tags'
	| 'writer-profiles'
	| 'stock-tickers'
	| 'site-navigation'
	| 'static-pages'
	| 'site-setting';

export type ContentType = {
	kind: 'collection' | 'single';
	/** Set when the whole type is a planned CMS-nn change. */
	planned?: CmsCapability;
	attributes: Record<string, Attribute>;
};

const scalar = (planned?: CmsCapability): Attribute => ({ kind: 'scalar', planned });
const media = (planned?: CmsCapability): Attribute => ({ kind: 'media', planned });
const one = (target: ContentTypeName, planned?: CmsCapability): Attribute => ({
	kind: 'relation',
	target,
	many: false,
	planned,
});
const many = (target: ContentTypeName, planned?: CmsCapability): Attribute => ({
	kind: 'relation',
	target,
	many: true,
	planned,
});
const component = (
	name: ComponentName,
	repeatable: boolean,
	planned?: CmsCapability,
): Attribute => ({ kind: 'component', component: name, repeatable, planned });

/** Fields every document has besides its attributes. */
export const SYSTEM_FIELDS = ['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt'];

/** Component attributes (scalar and media only). */
export const COMPONENTS: Record<ComponentName, Record<string, Attribute>> = {
	'shared.seo': {
		meta_title: scalar(),
		meta_description: scalar(),
		focus_keyword: scalar(),
		og_image: media(),
		canonical_url: scalar(),
		no_index: scalar(),
	},
	'article.faq-item': { question: scalar(), answer: scalar() },
	'article.source': {
		title: scalar(),
		publisher: scalar(),
		url: scalar(),
		accessed_on: scalar(),
	},
	'article.takeaway': { text: scalar() },
	'article.correction': { date: scalar(), note: scalar() },
	'shared.link': { url: scalar(), label: scalar() },
	'navigation.menu-item': { label: scalar(), url: scalar(), category_ref: many('categories') },
	'site.social-link': { platform: scalar(), url: scalar() },
};

/** Every content type, keyed by its REST path segment (`/api/<name>`). */
export const CONTENT_TYPES: Record<ContentTypeName, ContentType> = {
	articles: {
		kind: 'collection',
		attributes: {
			title: scalar(),
			slug: scalar(),
			lead_text: scalar(),
			content: scalar(),
			article_type: scalar(),
			first_published_at: scalar('dates'),
			content_updated_at: scalar('dates'),
			last_reviewed_at: scalar('dates'),
			sponsor_name: scalar('sponsor'),
			sponsor_url: scalar('sponsor'),
			sponsor_disclosure: scalar('sponsor'),
			featured_image: media(),
			categories: many('categories'),
			primary_category: one('categories'),
			author: one('writer-profiles'),
			reviewer: one('writer-profiles'),
			stocks_mentioned: many('stock-tickers'),
			tags: many('tags'),
			seo: component('shared.seo', false, 'seo'),
			faq: component('article.faq-item', true, 'faq'),
			sources: component('article.source', true, 'sources'),
			key_takeaways: component('article.takeaway', true, 'takeaways'),
			corrections: component('article.correction', true, 'corrections'),
		},
	},
	categories: {
		kind: 'collection',
		attributes: {
			name: scalar(),
			slug: scalar(),
			description: scalar('category-nav'),
			nav_order: scalar('category-nav'),
			show_in_nav: scalar('category-nav'),
			icon: media(),
			categories: many('categories'),
			parent_category: one('categories'),
			category: many('articles'),
			articles: many('articles'),
			seo: component('shared.seo', false, 'seo'),
		},
	},
	tags: {
		kind: 'collection',
		attributes: {
			name: scalar(),
			slug: scalar(),
			description: scalar('tag-description'),
			articles: many('articles'),
			seo: component('shared.seo', false, 'seo'),
		},
	},
	'writer-profiles': {
		kind: 'collection',
		attributes: {
			full_name: scalar(),
			slug: scalar(),
			role_title: scalar(),
			bio: scalar(),
			credentials: scalar('author-profile'),
			expertise: scalar('author-profile'),
			avatar: media(),
			articles: many('articles'),
			article: many('articles'),
			same_as: component('shared.link', true, 'author-profile'),
			seo: component('shared.seo', false, 'seo'),
		},
	},
	'stock-tickers': {
		kind: 'collection',
		attributes: {
			ticker_symbol: scalar(),
			company_name: scalar(),
			articles: many('articles'),
		},
	},
	'site-navigation': {
		kind: 'single',
		attributes: {
			menu_item: component('navigation.menu-item', true),
			featured_articles: many('articles'),
		},
	},
	'static-pages': {
		kind: 'collection',
		planned: 'static-pages',
		attributes: {
			title: scalar(),
			slug: scalar(),
			group: scalar(),
			body: scalar(),
			seo: component('shared.seo', false, 'seo'),
		},
	},
	'site-setting': {
		kind: 'single',
		planned: 'site-settings',
		attributes: {
			tagline: scalar(),
			description: scalar(),
			contact_email: scalar(),
			default_pr_disclosure: scalar(),
			logo: media(),
			default_og_image: media(),
			social_links: component('site.social-link', true),
		},
	},
};

/** True when `name` is a content type the local API serves. */
export function isContentTypeName(name: string): name is ContentTypeName {
	return Object.hasOwn(CONTENT_TYPES, name);
}
