import type { PartnerLink } from '@/types';

/**
 * "Dari mitra media" (ADR-0024, the client's "affiliate to other news site").
 * Frontend-only placeholders: no CMS type and no widget network yet, so the
 * outlets and URLs are fictional (`.example.com`) until the client names real
 * partners (ADR-0024 open question). Shown only with FEATURE_ADS.
 */
const PARTNER_LINKS: readonly PartnerLink[] = [
	{
		outlet: 'Kabar Ekonomi (contoh)',
		title: 'Suku bunga acuan dan dampaknya pada cicilan rumah',
		url: 'https://kabar-ekonomi.example.com/suku-bunga-acuan-dan-cicilan',
	},
	{
		outlet: 'Warta Bisnis (contoh)',
		title: 'Lima kebiasaan keuangan pekerja muda di kota besar',
		url: 'https://warta-bisnis.example.com/kebiasaan-keuangan-pekerja-muda',
	},
	{
		outlet: 'Pasar Hari Ini (contoh)',
		title: 'Cara membaca laporan keuangan sebelum membeli saham',
		url: 'https://pasar-hari-ini.example.com/membaca-laporan-keuangan',
	},
	{
		outlet: 'Dompet Kita (contoh)',
		title: 'Dana darurat: berapa yang cukup untuk keluarga kecil',
		url: 'https://dompet-kita.example.com/dana-darurat-keluarga',
	},
];

/** The partner-media links for an article's foot. The same set everywhere for now. */
export function getPartnerLinks(): readonly PartnerLink[] {
	return PARTNER_LINKS;
}
