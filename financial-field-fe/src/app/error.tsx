'use client';

import { useEffect } from 'react';

import { Container } from '@/components/Container/Container';
import { log } from '@/lib/log';

type ErrorProps = { error: Error & { digest?: string }; reset: () => void };

/** 5xx inside the layout: keep header/footer, offer a retry (REQ-PAGE-002). */
export default function ErrorPage({ error, reset }: ErrorProps) {
	useEffect(() => {
		log.error('app::ErrorPage', 'render failed', error.digest ?? error.name);
	}, [error]);

	return (
		<Container>
			<div
				style={{
					display: 'grid',
					gap: 'var(--space-3)',
					paddingBlock: 'var(--space-5)',
				}}
			>
				<p className="type-label">Terjadi kesalahan</p>
				<h1 style={{ margin: 0, fontSize: 'var(--text-h1)' }}>Halaman ini gagal dimuat</h1>
				<p style={{ margin: 0, maxWidth: '38rem' }}>
					Maaf, ada gangguan saat memuat halaman. Silakan coba lagi beberapa saat lagi.
				</p>
				<div>
					<button type="button" className="button" onClick={reset}>
						Coba lagi
					</button>
				</div>
			</div>
		</Container>
	);
}
