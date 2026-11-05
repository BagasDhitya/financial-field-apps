import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd/JsonLd';
import { blocksToPlainText } from '@/lib/blocks';
import { HOME_CRUMB, toSchemaCrumbs } from '@/lib/breadcrumbs';
import { getStaticPage } from '@/lib/content/pages';
import { getSiteSettings } from '@/lib/content/site';
import { env } from '@/lib/env';
import { routes } from '@/lib/routes';
import { absoluteUrl, buildMetadata, composeDescription } from '@/lib/seo/metadata';
import { buildPageGraph } from '@/lib/structured-data/registry';

import { StaticPageView } from '@/features/page/StaticPageView';

/** Safety-net window. Keep in sync with REVALIDATE.staticPage (revalidate.test.ts). */
export const revalidate = 86400;

async function load() {
	const [page, settings] = await Promise.all([getStaticPage('hubungi-kami'), getSiteSettings()]);
	if (!page) {
		notFound();
	}
	return { page, settings };
}

export async function generateMetadata(): Promise<Metadata> {
	const { page } = await load();
	return buildMetadata({
		title: page.title,
		description: composeDescription(
			blocksToPlainText(page.body),
			'Cara menghubungi redaksi Financial Field Indonesia untuk pertanyaan, koreksi, dan kerja sama.',
		),
		path: routes.contact(),
		seo: page.seo,
	});
}

/** Contact details only; no form in Phase 1 (no personal data collected). */
export default async function ContactPage() {
	const { page, settings } = await load();
	const trail = [HOME_CRUMB, { label: page.title, href: routes.contact() }];

	return (
		<>
			<JsonLd
				data={buildPageGraph({
					kind: 'info',
					type: 'ContactPage',
					origin: env.siteUrl,
					url: absoluteUrl(routes.contact()),
					crumbs: toSchemaCrumbs(trail),
					name: page.title,
				})}
			/>
			<StaticPageView page={page} breadcrumbs={trail} siteOrigin={env.siteUrl}>
				{settings.contactEmail ? (
					<p>
						Email redaksi:{' '}
						<a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
					</p>
				) : null}
			</StaticPageView>
		</>
	);
}
