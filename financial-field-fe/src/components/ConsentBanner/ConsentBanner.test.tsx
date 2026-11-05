// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { CONSENT_CHANGE_EVENT, CONSENT_OPEN_EVENT } from '@/lib/analytics/consent';

import { ConsentBanner } from './ConsentBanner';

function clearCookie() {
	document.cookie = 'ffid_consent=; Max-Age=0; Path=/';
}

describe('ConsentBanner (ADR-0008, REQ-PRIV-002)', () => {
	beforeEach(clearCookie);

	it('asks when no choice exists and stores an opt-in', () => {
		const events: string[] = [];
		window.addEventListener(CONSENT_CHANGE_EVENT, (event) =>
			events.push((event as CustomEvent).detail),
		);
		render(<ConsentBanner privacyHref="/tentang-kami/kebijakan-privasi" />);

		fireEvent.click(screen.getByRole('button', { name: 'Terima' }));
		expect(document.cookie).toContain('ffid_consent=granted');
		expect(events).toContain('granted');
		expect(screen.queryByRole('button', { name: 'Terima' })).toBeNull();
	});

	it('stays hidden after a choice and reopens from the footer', () => {
		document.cookie = 'ffid_consent=denied; Path=/';
		render(<ConsentBanner privacyHref="/x" />);
		expect(screen.queryByRole('button', { name: 'Tolak' })).toBeNull();

		act(() => {
			window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
		});
		expect(screen.getByRole('button', { name: 'Tolak' })).toBeInTheDocument();
	});
});
