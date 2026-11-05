import { describe, expect, it, vi } from 'vitest';

import { getTagBySlug, isIndexableTag, TAG_INDEX_THRESHOLD } from './tags';

describe('tag indexability (REQ-SEO-008)', () => {
	it('needs at least three articles', () => {
		expect(TAG_INDEX_THRESHOLD).toBe(3);
		expect(isIndexableTag(2)).toBe(false);
		expect(isIndexableTag(3)).toBe(true);
	});
});

describe('getTagBySlug', () => {
	it('returns null for the internal data-contoh marker without calling the CMS (T63)', async () => {
		const fetchSpy = vi.spyOn(globalThis, 'fetch');
		await expect(getTagBySlug('data-contoh')).resolves.toBeNull();
		expect(fetchSpy).not.toHaveBeenCalled();
		fetchSpy.mockRestore();
	});
});
