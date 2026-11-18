// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { menuFixture } from '@/components/__fixtures__/domain';

import { MainNav } from './MainNav';

let pathname = '/';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));

describe('MainNav (REQ-NAV-001…003, ADR-0022)', () => {
	it('opens a panel on click, closes it on Escape and returns focus', () => {
		render(<MainNav entries={menuFixture} />);
		const button = screen.getByRole('button', { name: 'Berita' });
		expect(button).toHaveAttribute('aria-expanded', 'false');

		fireEvent.click(button);
		expect(button).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('link', { name: 'PPh' })).toHaveAttribute(
			'href',
			'/kategori/pajak/pph',
		);

		fireEvent.keyDown(document, { key: 'Escape' });
		expect(button).toHaveAttribute('aria-expanded', 'false');
		expect(document.activeElement).toBe(button);
	});

	it('keeps one entry open at a time and shows group headings', () => {
		render(<MainNav entries={menuFixture} />);
		const berita = screen.getByRole('button', { name: 'Berita' });
		const bandingkan = screen.getByRole('button', { name: 'Bandingkan' });

		fireEvent.click(berita);
		fireEvent.click(bandingkan);
		expect(berita).toHaveAttribute('aria-expanded', 'false');
		expect(bandingkan).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('link', { name: 'Pinjaman' })).toHaveAttribute(
			'href',
			'/bandingkan/pinjaman',
		);
		expect(screen.getByRole('link', { name: 'Jaminan BPKB' })).toHaveAttribute(
			'href',
			'/bandingkan/jaminan-bpkb',
		);
	});

	it('renders a plain link for an entry without sub-items', () => {
		render(<MainNav entries={menuFixture} />);
		expect(screen.getByRole('link', { name: 'Kamus Keuangan' })).toHaveAttribute(
			'href',
			'/kamus-keuangan',
		);
		expect(screen.queryByRole('button', { name: 'Kamus Keuangan' })).toBeNull();
	});

	it('closes on an outside pointer down and on navigation', () => {
		const { rerender } = render(<MainNav entries={menuFixture} />);
		const button = screen.getByRole('button', { name: 'Tentang Kami' });

		fireEvent.click(button);
		fireEvent.pointerDown(document.body);
		expect(button).toHaveAttribute('aria-expanded', 'false');

		fireEvent.click(button);
		act(() => {
			pathname = '/kategori/pajak';
		});
		rerender(<MainNav entries={menuFixture} />);
		expect(button).toHaveAttribute('aria-expanded', 'false');
	});

	it('does not open on hover', () => {
		render(<MainNav entries={menuFixture} />);
		const button = screen.getByRole('button', { name: 'Berita' });
		fireEvent.mouseEnter(button);
		expect(button).toHaveAttribute('aria-expanded', 'false');
	});
});
