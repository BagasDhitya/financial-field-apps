import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { env } from '@/lib/env';
import { log } from '@/lib/log';
import { safeEqual } from '@/lib/security';
import { planRevalidation, type StrapiWebhookBody } from '@/lib/webhook/revalidation';

const MAX_BODY_BYTES = 64 * 1024;

/**
 * Strapi webhook → on-demand revalidation. Constant-time secret check, 64 KB
 * body limit, 401 without detail (REQ-SEC-002).
 */
export async function POST(request: Request) {
	const header = request.headers.get('authorization') ?? '';
	const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
	if (!safeEqual(token, env.revalidateSecret)) {
		return NextResponse.json({ revalidated: false }, { status: 401 });
	}

	const declared = Number(request.headers.get('content-length') ?? '0');
	if (declared > MAX_BODY_BYTES) {
		return NextResponse.json({ revalidated: false }, { status: 413 });
	}
	const raw = await request.text();
	if (raw.length > MAX_BODY_BYTES) {
		return NextResponse.json({ revalidated: false }, { status: 413 });
	}

	let body: StrapiWebhookBody;
	try {
		body = JSON.parse(raw) as StrapiWebhookBody;
	} catch {
		// Length only: the body is untrusted input (W3).
		log.warn('api::revalidate', `invalid JSON body, length ${raw.length}`);
		return NextResponse.json({ revalidated: false }, { status: 400 });
	}

	const plan = planRevalidation(body);
	if (plan.kind === 'ignore') {
		return NextResponse.json({ revalidated: false, reason: plan.reason });
	}

	for (const tag of plan.tags) {
		revalidateTag(tag, { expire: 0 });
	}
	log.info('api::revalidate', `${body.event ?? '?'} ${body.model ?? '?'}`, plan.tags);
	return NextResponse.json({
		revalidated: true,
		model: body.model,
		tags: plan.tags,
	});
}
