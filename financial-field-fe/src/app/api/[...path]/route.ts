import { NextResponse, type NextRequest } from 'next/server';

import { usesLocalCms } from '@/lib/cms/client';
import { localCmsResponse } from '@/lib/cms/local/handler';

/** Every request is answered from the query string, so nothing is prerendered. */
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ path: string[] }> };

/**
 * The local API over HTTP: the CMS's REST paths and query parameters,
 * answered from src/data, e.g. `/api/articles?filters[slug][$eq]=…`. Read
 * only. It exists only while no `CMS_URL` is set; with a real CMS the
 * content lives there, and these paths are 404. Never indexed.
 */
export async function GET(request: NextRequest, { params }: Props) {
	const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' };
	if (!usesLocalCms) {
		return NextResponse.json(
			{
				data: null,
				error: { status: 404, name: 'NotFoundError', message: 'Not Found', details: {} },
			},
			{ status: 404, headers },
		);
	}
	const { path } = await params;
	const { status, body } = localCmsResponse(`/${path.join('/')}`, request.nextUrl.search);
	return NextResponse.json(body, { status, headers });
}
