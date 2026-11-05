import type { Author } from '@/types';

import { schemaIds } from './ids';
import { buildPerson } from './person';
import type { JsonLdNode } from './types';

type PageInput = {
	origin: string;
	url: string;
	name: string;
	description?: string | null;
	hasBreadcrumb: boolean;
};

function pageBase(type: string, input: PageInput): JsonLdNode {
	return {
		'@type': type,
		'@id': schemaIds.webpage(input.url),
		url: input.url,
		name: input.name,
		...(input.description ? { description: input.description } : {}),
		inLanguage: 'id-ID',
		isPartOf: { '@id': schemaIds.website(input.origin) },
		...(input.hasBreadcrumb ? { breadcrumb: { '@id': schemaIds.breadcrumb(input.url) } } : {}),
	};
}

/** Category, tag, latest and interview listings. */
export function buildCollectionPage(input: PageInput): JsonLdNode {
	return pageBase('CollectionPage', input);
}

/** Trust pages: AboutPage, ContactPage or plain WebPage. */
export function buildInfoPage(
	type: 'AboutPage' | 'ContactPage' | 'WebPage',
	input: PageInput,
): JsonLdNode {
	return pageBase(type, input);
}

/** Author page: ProfilePage whose main entity is the Person (REQ-GEO-003). */
export function buildProfilePage(input: PageInput & { author: Author }): JsonLdNode | null {
	const person = buildPerson(input.origin, input.author);
	if (!person) {
		return null;
	}
	return {
		...pageBase('ProfilePage', input),
		mainEntity: {
			...person,
			...(input.author.bio ? { description: input.author.bio } : {}),
			...(input.author.sameAs.length > 0 ? { sameAs: input.author.sameAs } : {}),
			...(input.author.expertise.length > 0 ? { knowsAbout: input.author.expertise } : {}),
			...(input.author.credentials
				? {
						hasCredential: {
							'@type': 'EducationalOccupationalCredential',
							name: input.author.credentials,
						},
					}
				: {}),
		},
	};
}
