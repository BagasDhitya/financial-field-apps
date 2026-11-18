import { describe, expect, it } from 'vitest';

import {
	LEAD_CONSENT_VERSION,
	toLeadPayload,
	validateCity,
	validateEmail,
	validateFullName,
	validateLead,
	validateWhatsapp,
	type LeadFields,
} from './lead';

const valid: LeadFields = {
	fullName: '  Siti   Rahmawati ',
	whatsapp: '812-3456 7890',
	email: 'Siti@Contoh.co.id',
	city: 'Bandung',
	consentPartner: true,
	consentMarketing: false,
};

describe('lead validators (ADR-0025)', () => {
	it('accepts Indonesian mobile numbers of 9 to 13 digits after +62', () => {
		expect(validateWhatsapp('812345678')).toBeNull();
		expect(validateWhatsapp('8123 4567 8901')).toBeNull();
		expect(validateWhatsapp('8123456789012')).toBeNull();
	});

	it('rejects a leading 0, a non-8 start, letters and the wrong length', () => {
		expect(validateWhatsapp('')).toMatch(/Isi nomor/);
		expect(validateWhatsapp('08123456789')).toMatch(/tanpa angka 0/);
		expect(validateWhatsapp('2123456789')).toMatch(/diawali 8/);
		expect(validateWhatsapp('+62812345678')).toMatch(/angka/);
		expect(validateWhatsapp('81234567')).toMatch(/9 sampai 13/);
		expect(validateWhatsapp('81234567890123')).toMatch(/9 sampai 13/);
	});

	it('checks the name, email and city', () => {
		expect(validateFullName('Siti Rahmawati')).toBeNull();
		expect(validateFullName("Nur'aini Al-Hakim")).toBeNull();
		expect(validateFullName('')).toMatch(/sesuai KTP/);
		expect(validateFullName('AB')).toMatch(/minimal 3/);
		expect(validateFullName('Siti 123')).toMatch(/huruf/);
		expect(validateEmail('siti@contoh.co.id')).toBeNull();
		expect(validateEmail('siti@contoh')).toMatch(/Periksa/);
		expect(validateEmail('')).toMatch(/Isi alamat/);
		expect(validateCity('Surabaya')).toBeNull();
		expect(validateCity('Kota Fiksi')).toMatch(/Pilih kota/);
		expect(validateCity('')).toMatch(/Pilih kota/);
	});

	it('requires consent A and leaves consent B optional', () => {
		expect(validateLead(valid)).toEqual({});
		expect(validateLead({ ...valid, consentPartner: false })).toEqual({
			consentPartner: expect.stringMatching(/Centang/),
		});
		expect(validateLead({ ...valid, consentMarketing: true })).toEqual({});
	});
});

describe('toLeadPayload (CMS-33 shape)', () => {
	it('builds the Strapi create body in snake_case with relations by documentId', () => {
		expect(
			toLeadPayload(valid, {
				productDocumentId: 'prod-1',
				providerDocumentId: 'prov-1',
				sourcePath: '/produk/contoh',
			}),
		).toEqual({
			data: {
				full_name: 'Siti Rahmawati',
				whatsapp: '+6281234567890',
				email: 'siti@contoh.co.id',
				city: 'Bandung',
				financial_product: 'prod-1',
				provider: 'prov-1',
				consent_partner: true,
				consent_marketing: false,
				consent_version: LEAD_CONSENT_VERSION,
				source_path: '/produk/contoh',
				lead_status: 'new',
			},
		});
	});
});
