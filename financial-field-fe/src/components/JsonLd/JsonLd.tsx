import { serializeJsonLd } from '@/lib/structured-data/serialize';
import type { JsonLdGraph } from '@/lib/structured-data/types';

export type JsonLdProps = { data: JsonLdGraph | null };

/** The single emitter of structured data; escapes `<` (REQ-SEO-030). */
export function JsonLd({ data }: JsonLdProps) {
	if (!data) {
		return null;
	}
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
		/>
	);
}
