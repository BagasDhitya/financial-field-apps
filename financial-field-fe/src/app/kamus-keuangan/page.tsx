import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd/JsonLd';
import { toGlossary } from '@/lib/blocks';
import { HOME_CRUMB, toSchemaCrumbs } from '@/lib/breadcrumbs';
import { getStaticPage } from '@/lib/content/pages';
import { env } from '@/lib/env';
import { routes } from '@/lib/routes';
import { absoluteUrl, buildMetadata } from '@/lib/seo/metadata';
import { buildPageGraph } from '@/lib/structured-data/registry';
import { buildGraph } from '@/lib/structured-data/serialize';

import { GlossaryView } from '@/features/glossary/GlossaryView';

/** Safety-net window. Keep in sync with REVALIDATE.staticPage (revalidate.test.ts). */
export const revalidate = 86400;

const SLUG = 'kamus-keuangan';

/** The glossary is the Static Page `kamus-keuangan` (CMS-13), group `referensi`. */
async function load() {
	const page = await getStaticPage(SLUG);
	if (!page || page.group !== 'referensi') {
		notFound();
	}
	return { page, glossary: toGlossary(page.body) };
}

export async function generateMetadata(): Promise<Metadata> {
	const { page, glossary } = await load();
	const count = glossary.groups.reduce((sum, group) => sum + group.terms.length, 0);
	return buildMetadata({
		title: page.title,
		description: `${count} istilah keuangan seputar pinjaman, kredit, dan pengelolaan uang, dijelaskan dengan singkat dalam bahasa Indonesia.`,
		path: routes.glossary(),
		seo: page.seo,
	});
}

export default async function GlossaryPage() {
	const { page, glossary } = await load();
	const url = absoluteUrl(routes.glossary());
	const trail = [HOME_CRUMB, { label: page.title, href: routes.glossary() }];
	const terms = glossary.groups.flatMap((group) => group.terms);

	return (
		<>
			<JsonLd
				data={buildPageGraph({
					kind: 'info',
					type: 'WebPage',
					origin: env.siteUrl,
					url,
					crumbs: toSchemaCrumbs(trail),
					name: page.title,
				})}
			/>
			<JsonLd
				data={buildGraph([
					{
						'@type': 'DefinedTermSet',
						'@id': `${url}#kamus`,
						name: page.title,
						url,
						inLanguage: 'id-ID',
						hasDefinedTerm: terms.map((term) => ({
							'@type': 'DefinedTerm',
							name: term.term,
							description: term.definition,
							url: `${url}#${term.anchor}`,
						})),
					},
				])}
			/>
			<GlossaryView
				title={page.title}
				intro={glossary.intro}
				groups={glossary.groups}
				updatedAt={page.updatedAt}
				breadcrumbs={trail}
				siteOrigin={env.siteUrl}
			/>
		</>
	);
}
