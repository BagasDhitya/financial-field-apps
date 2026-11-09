import type { ArticleEntry } from '../types';

import { ASURANSI_ARTICLES } from './asuransi';
import { BISNIS_ARTICLES } from './bisnis';
import { GAYA_HIDUP_ARTICLES } from './gaya-hidup';
import { HARI_TUA_ARTICLES } from './hari-tua';
import { INVESTASI_ARTICLES } from './investasi';
import { KARIER_ARTICLES } from './karier';
import { KARTU_KREDIT_ARTICLES } from './kartu-kredit';
import { KEUANGAN_KELUARGA_ARTICLES } from './keuangan-keluarga';
import { PAJAK_ARTICLES } from './pajak';
import { PENGHASILAN_ARTICLES } from './penghasilan';
import { PENSIUN_ARTICLES } from './pensiun';
import { PINJAMAN_ARTICLES } from './pinjaman';
import { WARISAN_ARTICLES } from './warisan';

/**
 * Every published article (PRP-0002.p1 §S4.4), grouped by top-level category.
 * Order here doesn't matter: listings sort by `first_published_at`.
 */
export const ARTICLES: ArticleEntry[] = [
	...PENGHASILAN_ARTICLES,
	...WARISAN_ARTICLES,
	...PAJAK_ARTICLES,
	...PENSIUN_ARTICLES,
	...ASURANSI_ARTICLES,
	...PINJAMAN_ARTICLES,
	...INVESTASI_ARTICLES,
	...GAYA_HIDUP_ARTICLES,
	...HARI_TUA_ARTICLES,
	...KEUANGAN_KELUARGA_ARTICLES,
	...KARIER_ARTICLES,
	...KARTU_KREDIT_ARTICLES,
	...BISNIS_ARTICLES,
];
