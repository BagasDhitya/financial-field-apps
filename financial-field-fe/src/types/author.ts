import type { MediaAsset } from './media';
import type { SeoFields } from './seo';

export type AuthorSummary = {
	id: string;
	slug: string;
	fullName: string;
	roleTitle: string | null;
	/** Public credential text such as "CFP®" (CMS-11). */
	credentials: string | null;
	avatar: MediaAsset | null;
};

export type Author = AuthorSummary & {
	bio: string | null;
	sameAs: string[];
	expertise: string[];
	seo: SeoFields | null;
};
