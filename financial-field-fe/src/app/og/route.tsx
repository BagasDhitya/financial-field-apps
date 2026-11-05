import { renderOgCard } from '@/lib/og-card';

export const dynamic = 'force-static';

/** Default social card, 1200×630 (T44). */
export function GET() {
	return renderOgCard();
}
