// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Pagination } from './Pagination';

const hrefFor = (page: number) => (page === 1 ? '/terbaru' : `/terbaru/halaman/${page}`);

describe('Pagination (REQ-SEO-006)', () => {
	it('renders nothing for a single page', () => {
		const { container } = render(<Pagination page={1} pageCount={1} hrefFor={hrefFor} />);
		expect(container).toBeEmptyDOMElement();
	});

	it('uses crawlable links with page 1 at the base URL', () => {
		render(<Pagination page={2} pageCount={5} hrefFor={hrefFor} />);
		expect(screen.getByRole('link', { name: '← Sebelumnya' })).toHaveAttribute(
			'href',
			'/terbaru',
		);
		expect(screen.getByRole('link', { name: 'Berikutnya →' })).toHaveAttribute(
			'href',
			'/terbaru/halaman/3',
		);
		expect(screen.getByText('2', { exact: false }).closest('[aria-current]')).toHaveAttribute(
			'aria-current',
			'page',
		);
	});
});
