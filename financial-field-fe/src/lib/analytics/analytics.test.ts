import { describe, expect, it } from 'vitest';

import { CONSENT_BOOT_SCRIPT, parseConsent, serializeConsent } from './consent';
import { track } from './events';

describe('analytics helpers (REQ-ANL-003, REQ-PRIV-002)', () => {
	it('is a no-op without gtag (REQ-ANL-006)', () => {
		expect(() => track('page_view')).not.toThrow();
	});

	it('boot script reads the same cookie and attribute names', () => {
		expect(CONSENT_BOOT_SCRIPT).toContain('ffid_consent=(granted|denied)');
		expect(CONSENT_BOOT_SCRIPT).toContain('data-ffid-consent');
	});

	it('round-trips the consent cookie', () => {
		expect(parseConsent('a=1; ffid_consent=granted; b=2')).toBe('granted');
		expect(parseConsent('ffid_consent=maybe')).toBeNull();
		const cookie = serializeConsent('denied', true);
		expect(cookie).toContain('ffid_consent=denied');
		expect(cookie).toContain('SameSite=Lax');
		expect(cookie).toContain('Secure');
	});
});
