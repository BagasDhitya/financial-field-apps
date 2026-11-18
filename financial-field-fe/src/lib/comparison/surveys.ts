/**
 * Which questions each comparison section asks (PRP-0002.p3 §4.4, W5: a
 * registry, not a switch). A section not listed asks only for income, which
 * works on the CMS's common fields alone (Stage A).
 */
export type SurveyKind = 'car' | 'collateral' | 'income';

const SURVEYS: Record<string, SurveyKind> = {
	'kredit-mobil': 'car',
	'jaminan-bpkb': 'collateral',
};

export function surveyKindOf(sectionSlug: string): SurveyKind {
	return SURVEYS[sectionSlug] ?? 'income';
}
