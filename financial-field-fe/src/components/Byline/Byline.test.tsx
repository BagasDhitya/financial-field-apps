// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { checker, writer } from '@/components/__fixtures__/domain';

import { Byline } from './Byline';

describe('Byline (REQ-ART-002, ADR-0022)', () => {
	it('shows the writing team as plain text, with no link', () => {
		render(
			<Byline
				author={writer}
				reviewer={null}
				lastReviewedAt={null}
				publishedAt="2026-10-01T03:00:00Z"
				contentUpdatedAt={null}
				readingMinutes={4}
			/>,
		);
		expect(screen.getByText('Tim Redaksi Contoh')).toBeInTheDocument();
		expect(screen.queryByRole('link')).toBeNull();
	});

	it('links the reviewer to their profile, and dates the check only when recorded', () => {
		const { container, rerender } = render(
			<Byline
				author={writer}
				reviewer={checker}
				lastReviewedAt="2026-10-02T03:00:00Z"
				publishedAt="2026-10-01T03:00:00Z"
				contentUpdatedAt={null}
				readingMinutes={4}
			/>,
		);
		expect(screen.getByText('Ditinjau oleh')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Contoh Peninjau' })).toHaveAttribute(
			'href',
			'/peninjau/contoh-peninjau',
		);
		expect(container.textContent).toMatch(/Ditinjau \d/);

		rerender(
			<Byline
				author={writer}
				reviewer={checker}
				lastReviewedAt={null}
				publishedAt="2026-10-01T03:00:00Z"
				contentUpdatedAt={null}
				readingMinutes={4}
			/>,
		);
		expect(screen.getByText('Ditinjau oleh')).toBeInTheDocument();
		expect(container.textContent).not.toMatch(/Ditinjau \d/);
	});

	it('shows Diperbarui only a day or more after publication', () => {
		const { rerender } = render(
			<Byline
				author={writer}
				reviewer={null}
				lastReviewedAt={null}
				publishedAt="2026-10-01T03:00:00Z"
				contentUpdatedAt="2026-10-01T09:00:00Z"
				readingMinutes={1}
			/>,
		);
		expect(screen.queryByText(/Diperbarui/)).toBeNull();
		rerender(
			<Byline
				author={writer}
				reviewer={null}
				lastReviewedAt={null}
				publishedAt="2026-10-01T03:00:00Z"
				contentUpdatedAt="2026-10-03T03:00:00Z"
				readingMinutes={1}
			/>,
		);
		expect(screen.getByText(/Diperbarui/)).toBeInTheDocument();
		expect(screen.getByText('1 menit baca')).toBeInTheDocument();
	});
});
