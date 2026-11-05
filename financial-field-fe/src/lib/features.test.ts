import { describe, expect, it } from 'vitest';

import { features, isFlagValue, parseFlag } from './features';

describe('feature flags (W4)', () => {
	it('parses on/off values and falls back otherwise', () => {
		expect(parseFlag('1', false)).toBe(true);
		expect(parseFlag('TRUE', false)).toBe(true);
		expect(parseFlag('0', true)).toBe(false);
		expect(parseFlag('off', true)).toBe(false);
		expect(parseFlag(undefined, false)).toBe(false);
		expect(parseFlag('maybe', true)).toBe(true);
	});

	it('recognises unset and on/off values only (W13)', () => {
		expect(isFlagValue(undefined)).toBe(true);
		expect(isFlagValue(' ')).toBe(true);
		expect(isFlagValue('On')).toBe(true);
		expect(isFlagValue('false')).toBe(true);
		expect(isFlagValue('maybe')).toBe(false);
	});

	it('defaults later-phase flags off and FAQ schema on', () => {
		expect(features.comparison).toBe(false);
		expect(features.ads).toBe(false);
		expect(features.newsletter).toBe(false);
		expect(features.faqSchema).toBe(true);
	});
});
