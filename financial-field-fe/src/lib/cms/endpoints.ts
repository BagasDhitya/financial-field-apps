/** Strapi REST paths (plural API IDs), spelled out only here. */
export const endpoints = {
	articles: '/articles',
	categories: '/categories',
	tags: '/tags',
	authors: '/writer-profiles',
	tickers: '/stock-tickers',
	navigation: '/site-navigation',
	staticPages: '/static-pages',
	siteSettings: '/site-setting',
	products: '/financial-products',
	productCategories: '/product-categories',
	providers: '/providers',
} as const;
