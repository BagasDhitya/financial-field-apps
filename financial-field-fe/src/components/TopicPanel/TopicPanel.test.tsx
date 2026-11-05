// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { categoriesFixture } from '@/components/__fixtures__/domain';

import { TopicPanel } from './TopicPanel';

let pathname = '/';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));

describe('TopicPanel (REQ-NAV-003)', () => {
	it('opens on click, closes on Escape and returns focus', () => {
		render(<TopicPanel label="Artikel" categories={categoriesFixture} />);
		const button = screen.getByRole('button', { name: 'Artikel' });
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

	it('closes on an outside pointer down and on navigation', () => {
		const { rerender } = render(<TopicPanel label="Artikel" categories={categoriesFixture} />);
		const button = screen.getByRole('button', { name: 'Artikel' });

		fireEvent.click(button);
		fireEvent.pointerDown(document.body);
		expect(button).toHaveAttribute('aria-expanded', 'false');

		fireEvent.click(button);
		act(() => {
			pathname = '/kategori/pajak';
		});
		rerender(<TopicPanel label="Artikel" categories={categoriesFixture} />);
		expect(button).toHaveAttribute('aria-expanded', 'false');
	});

	it('does not open on hover', () => {
		render(<TopicPanel label="Artikel" categories={categoriesFixture} />);
		const button = screen.getByRole('button', { name: 'Artikel' });
		fireEvent.mouseEnter(button);
		expect(button).toHaveAttribute('aria-expanded', 'false');
	});
});
