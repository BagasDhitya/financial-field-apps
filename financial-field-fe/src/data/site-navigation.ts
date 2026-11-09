import type { SiteNavigationEntry } from './types';

/**
 * The Site Navigation single type. `featured_articles` are the home page's
 * featured stories in order, lead first (PRP-0002.p1 §S4.4); the menu is the
 * topic tree, so `menu_item` stays empty.
 */
export const SITE_NAVIGATION: SiteNavigationEntry = {
	menu_item: [],
	featured_articles: [
		'cara-membaca-slip-gaji-pph-21',
		'asuransi-jiwa-berjangka-atau-seumur-hidup',
		'investasi-rutin-reksa-dana-pemula',
		'berapa-besar-dana-darurat',
	],
};
