/** One sponsored link to a partner news site (ADR-0024, placement `article-partner-links`). */
export type PartnerLink = {
	/** The partner outlet's name, shown above the headline. */
	outlet: string;
	title: string;
	/** Absolute https URL on the partner's site; UTM values are added on render. */
	url: string;
};
