/**
 * The lead relay form's rules (ADR-0025, "Saya ingin tahu lebih lanjut").
 * Client-safe and pure. Only the UI is built: until the leads backend exists
 * (PRP-0002 p4), nothing is sent or stored. The payload already has the shape
 * of the proposed Strapi `lead` collection (CMS-33), so wiring it later is
 * one call.
 */

import type { FinancialProduct } from '@/types';

/** Bumped whenever the wording of consent A or B changes; stored with each lead. */
export const LEAD_CONSENT_VERSION = '2026-11-19';

/**
 * The city list (frontend-only: Bagas's schema has no city type, and the
 * local API only serves his types). Provincial capitals and the larger
 * metropolitan cities, alphabetical; "Lainnya" covers the rest without a free
 * text field.
 */
export const LEAD_CITIES = [
	'Ambon',
	'Balikpapan',
	'Banda Aceh',
	'Bandar Lampung',
	'Bandung',
	'Banjarmasin',
	'Batam',
	'Bekasi',
	'Bengkulu',
	'Bogor',
	'Denpasar',
	'Depok',
	'Gorontalo',
	'Jakarta',
	'Jambi',
	'Jayapura',
	'Kendari',
	'Kupang',
	'Makassar',
	'Malang',
	'Mamuju',
	'Manado',
	'Mataram',
	'Medan',
	'Padang',
	'Palangka Raya',
	'Palembang',
	'Palu',
	'Pangkal Pinang',
	'Pekanbaru',
	'Pontianak',
	'Samarinda',
	'Semarang',
	'Serang',
	'Sofifi',
	'Solo',
	'Surabaya',
	'Tangerang',
	'Tangerang Selatan',
	'Tanjung Pinang',
	'Ternate',
	'Yogyakarta',
	'Lainnya',
] as const;

export type LeadCity = (typeof LEAD_CITIES)[number];

export type LeadFields = {
	fullName: string;
	/** The digits after +62, as typed (spaces and dashes allowed). */
	whatsapp: string;
	email: string;
	city: string;
	consentPartner: boolean;
	consentMarketing: boolean;
};

export type LeadField = 'fullName' | 'whatsapp' | 'email' | 'city' | 'consentPartner';

export type LeadErrors = Partial<Record<LeadField, string>>;

const NAME = /^[\p{L}][\p{L}\p{M}' .-]*$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** The number without spaces, dots or dashes; validateWhatsapp rejects anything else. */
export function whatsappDigits(input: string): string {
	return input.replace(/[\s.-]/g, '');
}

/**
 * Indonesian mobile numbers after +62: 9 to 13 digits starting with 8, no
 * leading 0 (the +62 replaces it).
 */
export function validateWhatsapp(input: string): string | null {
	const digits = whatsappDigits(input);
	if (digits === '') {
		return 'Isi nomor WhatsApp Anda.';
	}
	if (!/^\d+$/.test(digits)) {
		return 'Nomor hanya boleh berisi angka.';
	}
	if (digits.startsWith('0')) {
		return 'Tulis tanpa angka 0 di depan, misalnya 812 3456 7890.';
	}
	if (!digits.startsWith('8')) {
		return 'Nomor ponsel Indonesia diawali 8 setelah +62.';
	}
	if (digits.length < 9 || digits.length > 13) {
		return 'Nomor WhatsApp terdiri dari 9 sampai 13 angka setelah +62.';
	}
	return null;
}

export function validateFullName(input: string): string | null {
	const name = input.trim().replace(/\s+/g, ' ');
	if (name === '') {
		return 'Isi nama lengkap sesuai KTP.';
	}
	if (name.length < 3) {
		return 'Nama lengkap minimal 3 huruf.';
	}
	if (name.length > 100) {
		return 'Nama lengkap maksimal 100 karakter.';
	}
	if (!NAME.test(name)) {
		return 'Nama hanya boleh berisi huruf, spasi, titik, tanda hubung, dan apostrof.';
	}
	return null;
}

export function validateEmail(input: string): string | null {
	const email = input.trim();
	if (email === '') {
		return 'Isi alamat email Anda.';
	}
	if (email.length > 254 || !EMAIL.test(email)) {
		return 'Periksa kembali alamat email Anda.';
	}
	return null;
}

export function validateCity(input: string): string | null {
	return (LEAD_CITIES as readonly string[]).includes(input) ? null : 'Pilih kota tempat tinggal.';
}

/** Every field's error; an empty object means the form may be sent. */
export function validateLead(fields: LeadFields): LeadErrors {
	const errors: LeadErrors = {};
	const checks: [LeadField, string | null][] = [
		['fullName', validateFullName(fields.fullName)],
		['whatsapp', validateWhatsapp(fields.whatsapp)],
		['email', validateEmail(fields.email)],
		['city', validateCity(fields.city)],
		[
			'consentPartner',
			fields.consentPartner ? null : 'Centang persetujuan ini untuk melanjutkan.',
		],
	];
	for (const [field, error] of checks) {
		if (error) {
			errors[field] = error;
		}
	}
	return errors;
}

/**
 * The body of a future `POST /api/leads` in the proposed Strapi `lead`
 * collection (CMS-33): Bagas's snake_case, relations by documentId, Strapi's
 * own `createdAt`. Built only after validateLead returns no errors.
 */
export type LeadPayload = {
	data: {
		full_name: string;
		whatsapp: string;
		email: string;
		city: LeadCity;
		financial_product: string;
		provider: string;
		consent_partner: true;
		consent_marketing: boolean;
		consent_version: string;
		source_path: string;
		lead_status: 'new';
	};
};

export function toLeadPayload(
	fields: LeadFields,
	ids: { productDocumentId: string; providerDocumentId: string; sourcePath: string },
): LeadPayload {
	return {
		data: {
			full_name: fields.fullName.trim().replace(/\s+/g, ' '),
			whatsapp: `+62${whatsappDigits(fields.whatsapp)}`,
			email: fields.email.trim().toLowerCase(),
			city: fields.city as LeadCity,
			financial_product: ids.productDocumentId,
			provider: ids.providerDocumentId,
			consent_partner: true,
			consent_marketing: fields.consentMarketing,
			consent_version: LEAD_CONSENT_VERSION,
			source_path: ids.sourcePath,
			lead_status: 'new',
		},
	};
}

/** What the form shows and the payload links to, from a catalogue product. */
export function leadProductOf(product: FinancialProduct) {
	return {
		productId: product.id,
		productSlug: product.slug,
		productTitle: product.title,
		providerId: product.provider.id,
		providerName: product.provider.name,
	};
}
