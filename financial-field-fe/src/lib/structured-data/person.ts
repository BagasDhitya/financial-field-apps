import type { AuthorSummary } from '@/types';

import { schemaIds } from './ids';
import type { JsonLdNode } from './types';

/** One Person per reviewer, at their profile page; `name` carries only the name (REQ-SEO-031). */
export function buildPerson(origin: string, author: AuthorSummary): JsonLdNode | null {
	if (!author.slug || !author.fullName) {
		return null;
	}
	return {
		'@type': 'Person',
		'@id': schemaIds.person(origin, author.slug),
		name: author.fullName,
		url: `${origin.replace(/\/+$/, '')}/peninjau/${author.slug}`,
		...(author.roleTitle ? { jobTitle: author.roleTitle } : {}),
		...(author.avatar ? { image: author.avatar.url } : {}),
	};
}
