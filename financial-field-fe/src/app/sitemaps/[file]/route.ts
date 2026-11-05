import { getSitemapFiles } from '@/lib/content/sitemap';
import { env } from '@/lib/env';
import { buildUrlset } from '@/lib/sitemap';

/** Safety-net window. Keep in sync with REVALIDATE.sitemap (revalidate.test.ts). */
export const revalidate = 3600;

export function generateStaticParams() {
	return ['articles-1', 'categories', 'tags', 'authors', 'pages'].map((name) => ({
		file: `${name}.xml`,
	}));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
	const { file } = await params;
	const name = file.endsWith('.xml') ? file.slice(0, -4) : null;
	const files = await getSitemapFiles(env.siteUrl);
	const match = files.find((candidate) => candidate.name === name);
	if (!match) {
		return new Response('Not found', { status: 404 });
	}
	return new Response(buildUrlset(match.urls), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}
