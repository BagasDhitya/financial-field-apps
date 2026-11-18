import type { ArticleSummary } from './article';
import type { CategoryNode, CategorySummary } from './category';

/** One `navigation.menu-item`: a label, a URL, and the categories it refers to. */
export type MenuItem = {
	label: string;
	url: string | null;
	categories: CategorySummary[];
};

export type SiteNavigation = {
	menuItems: MenuItem[];
	featuredArticles: ArticleSummary[];
};

export type MenuLink = { label: string; href: string };

/** A block of links in a dropdown, with an optional heading (a comparison group, CMS-28). */
export type MenuGroup = { heading: MenuLink | null; links: MenuLink[] };

/**
 * One entry of the header menu (ADR-0022): the topic panel (Berita), a
 * dropdown, or a plain link. Built from Site Navigation by lib/content/menu.ts.
 */
export type MainMenuEntry =
	| { kind: 'topics'; label: string; topics: CategoryNode[]; views: MenuLink[] }
	| { kind: 'menu'; label: string; groups: MenuGroup[]; footer: MenuLink | null }
	| { kind: 'link'; label: string; href: string };
