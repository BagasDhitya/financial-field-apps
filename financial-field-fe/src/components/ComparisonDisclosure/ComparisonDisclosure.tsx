import Link from 'next/link';

import { routes } from '@/lib/routes';

import styles from './ComparisonDisclosure.module.css';

export type ComparisonDisclosureProps = {
	/** True when the providers are the fictional demo set (slugs `contoh-…`, PRP-0002.p3 T36). */
	demo: boolean;
};

/**
 * What a reader should know before trusting the numbers (REQ-CMP-010): how the
 * order is set, what the estimate leaves out, and where the method and the
 * commercial ties are explained. On staging it also says the data is fictional.
 */
export function ComparisonDisclosure({ demo }: ComparisonDisclosureProps) {
	return (
		<aside className={styles.root} aria-label="Catatan perbandingan">
			{demo ? (
				<p className={styles.demo}>
					<strong>Data contoh.</strong> Semua penyedia dan produk di halaman ini fiktif,
					dibuat untuk pratinjau situs. Jangan gunakan untuk keputusan keuangan.
				</p>
			) : null}
			<p className={styles.text}>
				Urutan produk tidak dibayar oleh penyedia. Estimasi cicilan memakai bunga terendah
				yang diumumkan dan belum termasuk provisi, administrasi, atau asuransi. Keputusan
				akhir ada pada penyedia. Baca{' '}
				<Link href={routes.about('metodologi-perbandingan')}>Metodologi Perbandingan</Link>{' '}
				dan <Link href={routes.about('pengungkapan-afiliasi')}>Pengungkapan Afiliasi</Link>.
			</p>
		</aside>
	);
}
