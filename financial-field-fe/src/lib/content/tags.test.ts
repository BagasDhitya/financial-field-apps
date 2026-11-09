import { describe, expect, it } from 'vitest';

import { isIndexableTag, TAG_INDEX_THRESHOLD } from './tags';

describe('tag indexability (REQ-SEO-008)', () => {
	it('needs at least three articles', () => {
		expect(TAG_INDEX_THRESHOLD).toBe(3);
		expect(isIndexableTag(2)).toBe(false);
		expect(isIndexableTag(3)).toBe(true);
	});
});
