import { ABOUT_MENU, CALCULATORS, routes } from '@/lib/routes';
import type {
	CategoryNode,
	MainMenuEntry,
	MenuGroup,
	MenuItem,
	MenuLink,
	ProductSection,
	ProviderSummary,
} from '@/types';

import { getCategoryTree } from './categories';
import { getComparisonSections, getProviders, isComparisonEnabled } from './comparison';
import { getSiteNavigation } from './navigation';

/** The article views every topic panel ends with (REQ-NAV-002). */
const ARTICLE_VIEWS: MenuLink[] = [
	{ label: 'Terbaru', href: routes.latest() },
	{ label: 'Wawancara', href: routes.interviews() },
	{ label: 'Video', href: routes.videos() },
];

export type MenuSources = {
	items: MenuItem[];
	tree: CategoryNode[];
	/** Null when comparison is off: its entries are left out (PRP-0002.p3 AC2). */
	comparison: { sections: ProductSection[]; providers: ProviderSummary[] } | null;
};

function comparisonGroups(sections: ProductSection[]): MenuGroup[] {
	const groups: MenuGroup[] = [];
	const loose: MenuLink[] = [];
	for (const section of sections) {
		if (section.children.length > 0) {
			groups.push({
				heading: { label: section.name, href: routes.comparisonSection(section.slug) },
				links: section.children
					.filter((child) => sections.some((s) => s.slug === child.slug))
					.map((child) => ({
						label: child.name,
						href: routes.comparisonSection(child.slug),
					})),
			});
		} else if (!section.parentSlug) {
			loose.push({ label: section.name, href: routes.comparisonSection(section.slug) });
		}
	}
	return loose.length > 0 ? [...groups, { heading: null, links: loose }] : groups;
}

function entryFor(item: MenuItem, sources: MenuSources): MainMenuEntry | null {
	const label = item.label.trim();
	if (!label) {
		return null;
	}
	if (item.categories.length > 1) {
		const wanted = new Set(item.categories.map((category) => category.slug));
		const topics = sources.tree.filter((node) => wanted.has(node.slug));
		return topics.length > 0 ? { kind: 'topics', label, topics, views: ARTICLE_VIEWS } : null;
	}
	if (item.categories.length === 1) {
		const node = sources.tree.find((candidate) => candidate.slug === item.categories[0]?.slug);
		if (!node) {
			return null;
		}
		const links = node.children.map((child) => ({
			label: child.name,
			href: routes.category(child),
		}));
		const all = { label: `Semua ${node.name}`, href: routes.category(node) };
		return links.length > 0
			? { kind: 'menu', label, groups: [{ heading: null, links }], footer: all }
			: { kind: 'link', label, href: all.href };
	}
	const url = item.url?.trim() ?? '';
	if (url === routes.comparisonIndex()) {
		const sections = sources.comparison?.sections ?? [];
		return sections.length > 0
			? {
					kind: 'menu',
					label,
					groups: comparisonGroups(sections),
					footer: { label: 'Semua perbandingan', href: routes.comparisonIndex() },
					// menu_item has no highlight field yet (asked as CMS-32
					// `is_highlighted`); until then the comparison entry is the
					// highlighted one, by its URL.
					highlighted: true,
				}
			: null;
	}
	if (url === routes.providers()) {
		const providers = sources.comparison?.providers ?? [];
		return providers.length > 0
			? {
					kind: 'menu',
					label,
					groups: [
						{
							heading: null,
							links: providers.map((provider) => ({
								label: provider.name,
								href: routes.provider(provider.slug),
							})),
						},
					],
					footer: { label: 'Semua penyedia', href: routes.providers() },
				}
			: null;
	}
	if (url === '/kalkulator' || url.startsWith('/kalkulator/')) {
		return sources.comparison
			? {
					kind: 'menu',
					label,
					groups: [{ heading: null, links: [...CALCULATORS] }],
					footer: null,
				}
			: null;
	}
	if (url === routes.about()) {
		return {
			kind: 'menu',
			label,
			groups: [{ heading: null, links: [...ABOUT_MENU] }],
			footer: { label: 'Tentang Financial Field Indonesia', href: routes.about() },
		};
	}
	return url.startsWith('/') && !url.startsWith('//') ? { kind: 'link', label, href: url } : null;
}

/**
 * The header menu from the Site Navigation entries (ADR-0022, REQ-NAV-001).
 * An entry with several categories is the topic panel; one category opens its
 * sub-categories; a URL opens what lives there. Entries whose data is missing
 * are left out. With no menu in the CMS, the topic tree and Tentang Kami are
 * the fallback, as before.
 */
export function buildMainMenu(sources: MenuSources): MainMenuEntry[] {
	const entries = sources.items.flatMap((item) => entryFor(item, sources) ?? []);
	if (entries.length > 0) {
		return entries;
	}
	return [
		...(sources.tree.length > 0
			? [
					{
						kind: 'topics',
						label: 'Berita',
						topics: sources.tree,
						views: ARTICLE_VIEWS,
					} as const,
				]
			: []),
		{ kind: 'link', label: 'Tentang Kami', href: routes.about() },
	];
}

/** Loads what the menu needs and builds it; the root layout calls this once per render. */
export async function getMainMenu(tree?: CategoryNode[]): Promise<MainMenuEntry[]> {
	const comparisonOn = isComparisonEnabled();
	const [navigation, categoryTree, sections, providers] = await Promise.all([
		getSiteNavigation(),
		tree ? Promise.resolve(tree) : getCategoryTree(),
		comparisonOn ? getComparisonSections() : Promise.resolve([]),
		comparisonOn ? getProviders() : Promise.resolve([]),
	]);
	return buildMainMenu({
		items: navigation.menuItems,
		tree: categoryTree,
		comparison: comparisonOn ? { sections, providers } : null,
	});
}

/** The footer's tool links (REQ-CMP-014): every comparison section, providers, the calculator. */
export function comparisonFooterLinks(sections: ProductSection[]): MenuLink[] {
	const leaves = sections.filter((section) => section.children.length === 0);
	if (leaves.length === 0) {
		return [];
	}
	return [
		...leaves.map((section) => ({
			label: `Bandingkan ${section.name}`,
			href: routes.comparisonSection(section.slug),
		})),
		{ label: 'Penyedia', href: routes.providers() },
		...CALCULATORS.map((calculator) => ({
			label: `Kalkulator ${calculator.label}`,
			href: calculator.href,
		})),
	];
}
