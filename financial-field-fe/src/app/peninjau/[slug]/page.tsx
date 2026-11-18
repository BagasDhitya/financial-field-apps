import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd/JsonLd';
import { HOME_CRUMB, toSchemaCrumbs } from '@/lib/breadcrumbs';
import { getArticlesByAuthor } from '@/lib/content/articles';
import { getAuthorBySlug } from '@/lib/content/authors';
import { env } from '@/lib/env';
import { routes } from '@/lib/routes';
import { isValidSlug } from '@/lib/security';
import { absoluteUrl, buildMetadata } from '@/lib/seo/metadata';
import { buildPageGraph } from '@/lib/structured-data/registry';

import { ReviewerView } from '@/features/reviewer/ReviewerView';

/** Safety-net window. Keep in sync with REVALIDATE.archive (revalidate.test.ts). */
export const revalidate = 600;

/** Empty list = render each path on first request, then cache it (ISR). */
export function generateStaticParams() {
	return [];
}

type Props = { params: Promise<{ slug: string }> };

/**
 * A profile page exists only for someone who reviewed at least one article
 * (ADR-0022). The writing team, or a profile that reviewed nothing, is a 404.
 */
async function load(slug: string) {
	if (!isValidSlug(slug)) {
		notFound();
	}
	const [reviewer, reviewed] = await Promise.all([
		getAuthorBySlug(slug),
		getArticlesByAuthor(slug, 'reviewer'),
	]);
	if (!reviewer || reviewed.total === 0) {
		notFound();
	}
	return { reviewer, reviewed };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const { reviewer } = await load(slug);
	const title = [reviewer.fullName, reviewer.roleTitle].filter(Boolean).join(', ');
	return buildMetadata({
		title: `${title}: peninjau`,
		description:
			reviewer.bio ?? `Profil ${reviewer.fullName}, peninjau di Financial Field Indonesia.`,
		path: routes.reviewer(reviewer.slug),
		seo: reviewer.seo,
		image: reviewer.avatar,
		type: 'profile',
	});
}

export default async function ReviewerPage({ params }: Props) {
	const { slug } = await params;
	const { reviewer, reviewed } = await load(slug);
	const trail = [
		HOME_CRUMB,
		{ label: 'Redaksi', href: routes.about('redaksi') },
		{ label: reviewer.fullName, href: routes.reviewer(reviewer.slug) },
	];

	return (
		<>
			<JsonLd
				data={buildPageGraph({
					kind: 'profile',
					origin: env.siteUrl,
					url: absoluteUrl(routes.reviewer(reviewer.slug)),
					crumbs: toSchemaCrumbs(trail),
					name: reviewer.fullName,
					author: reviewer,
				})}
			/>
			<ReviewerView
				reviewer={reviewer}
				breadcrumbs={trail}
				reviewed={reviewed.items}
				reviewedTotal={reviewed.total}
			/>
		</>
	);
}
