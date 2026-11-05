import type { ArticleBody } from './article';
import type { SeoFields } from './seo';

/** Trust and legal pages (CMS-13). */
export type StaticPage = {
	id: string;
	slug: string;
	title: string;
	group: 'tentang-kami' | 'legal' | null;
	body: ArticleBody;
	seo: SeoFields | null;
	updatedAt: string | null;
};
