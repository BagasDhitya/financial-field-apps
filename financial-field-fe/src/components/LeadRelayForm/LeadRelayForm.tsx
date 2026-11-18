'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';

import { analytics } from '@/lib/analytics/events';
import {
	LEAD_CITIES,
	toLeadPayload,
	validateLead,
	type LeadErrors,
	type LeadField,
	type LeadFields,
} from '@/lib/lead';
import { routes } from '@/lib/routes';

import { Icon } from '../Icon/Icon';

import styles from './LeadRelayForm.module.css';

/** What the form needs to know about the product; no reader data. */
export type LeadRelayProduct = {
	productId: string;
	productSlug: string;
	productTitle: string;
	providerId: string;
	providerName: string;
};

/** Harness states; the page always starts closed. */
export type LeadRelayPreview = 'open' | 'invalid' | 'ready' | 'success';

export type LeadRelayFormProps = {
	product: LeadRelayProduct;
	/** `button` next to the outbound button; `text` in the results table. */
	variant?: 'button' | 'text';
	preview?: LeadRelayPreview;
};

const EMPTY: LeadFields = {
	fullName: '',
	whatsapp: '',
	email: '',
	city: '',
	consentPartner: false,
	consentMarketing: false,
};

const PREVIEW_FIELDS: Record<LeadRelayPreview, LeadFields> = {
	open: EMPTY,
	invalid: {
		fullName: 'S',
		whatsapp: '0812',
		email: 'siti@',
		city: '',
		consentPartner: false,
		consentMarketing: false,
	},
	ready: {
		fullName: 'Siti Rahmawati',
		whatsapp: '812 3456 7890',
		email: 'siti@contoh.co.id',
		city: 'Bandung',
		consentPartner: true,
		consentMarketing: false,
	},
	success: EMPTY,
};

const ALL_TOUCHED: Record<LeadField, boolean> = {
	fullName: true,
	whatsapp: true,
	email: true,
	city: true,
	consentPartner: true,
};

function FieldError({ id, message }: { id: string; message: string | undefined }) {
	return message ? (
		<p id={id} className={styles.error}>
			{message}
		</p>
	) : null;
}

function Row({
	label,
	htmlFor,
	children,
}: {
	label: ReactNode;
	htmlFor: string;
	children: ReactNode;
}) {
	return (
		<div className={styles.row}>
			<label htmlFor={htmlFor} className={styles.label}>
				{label}
				<span className={styles.required} aria-hidden="true">
					{' '}
					*
				</span>
			</label>
			<div className={styles.control}>{children}</div>
		</div>
	);
}

/**
 * "Saya ingin tahu lebih lanjut" (ADR-0025, the client's wireframe 14 "Form
 * relai: minat produk, bukan aplikasi kredit"). A native modal <dialog>:
 * focus stays inside, Esc and "Batal" close it, focus returns to the trigger
 * and the page doesn't scroll behind it. From 768 px it is a centred dialog,
 * below that a full-height sheet.
 *
 * STUB until the leads backend exists (PRP-0002 p4, CMS-33): on send the
 * fields are validated and shaped as the Strapi `lead` body, then dropped.
 * Nothing is sent, logged or stored, and the inputs have no `name`, so
 * nothing can reach a URL even without JavaScript.
 */
export function LeadRelayForm({ product, variant = 'button', preview }: LeadRelayFormProps) {
	const id = useId();
	const dialogRef = useRef<HTMLDialogElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const doneRef = useRef<HTMLHeadingElement>(null);
	const [fields, setFields] = useState<LeadFields>(preview ? PREVIEW_FIELDS[preview] : EMPTY);
	const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>(
		preview === 'invalid' ? ALL_TOUCHED : {},
	);
	const [sent, setSent] = useState(preview === 'success');

	const errors: LeadErrors = validateLead(fields);
	const ready = Object.keys(errors).length === 0;
	const shown = (field: LeadField) => (touched[field] ? errors[field] : undefined);
	const ids = {
		title: `${id}-judul`,
		banner: `${id}-banner`,
		name: `${id}-nama`,
		whatsapp: `${id}-wa`,
		email: `${id}-email`,
		city: `${id}-kota`,
		consentA: `${id}-setuju`,
		consentB: `${id}-info`,
		hint: `${id}-petunjuk`,
	};

	useEffect(() => {
		if (sent && !preview) {
			doneRef.current?.focus();
		}
	}, [sent, preview]);

	function update<K extends keyof LeadFields>(key: K, value: LeadFields[K]) {
		setFields((current) => ({ ...current, [key]: value }));
	}

	function touch(field: LeadField) {
		setTouched((current) => (current[field] ? current : { ...current, [field]: true }));
	}

	function open() {
		setFields(EMPTY);
		setTouched({});
		setSent(false);
		dialogRef.current?.showModal();
	}

	function close() {
		dialogRef.current?.close();
	}

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!ready) {
			setTouched(ALL_TOUCHED);
			return;
		}
		// STUB (p4, CMS-33): this is the body for `POST /api/leads`. Until the
		// leads backend exists it is built and dropped: not sent, not logged,
		// not stored.
		void toLeadPayload(fields, {
			productDocumentId: product.productId,
			providerDocumentId: product.providerId,
			sourcePath: window.location.pathname,
		});
		analytics.generateLead(product.productSlug, fields.consentMarketing);
		setFields(EMPTY);
		setSent(true);
	}

	const content = sent ? (
		<div className={styles.done}>
			<span className={styles.doneIcon} aria-hidden="true">
				<Icon name="check" size={24} />
			</span>
			<h2 ref={doneRef} tabIndex={-1} className={styles.doneTitle}>
				Terima kasih, tim mitra akan menghubungi Anda
			</h2>
			<p className={styles.doneText}>
				Permintaan Anda untuk {product.providerName} – {product.productTitle} sudah kami
				catat. Ini bukan pengajuan kredit.
			</p>
			<p className={styles.stubNote}>
				Pratinjau situs: formulir ini belum terhubung, jadi data Anda tidak dikirim dan
				tidak disimpan.
			</p>
			<div className={styles.actions}>
				<button type="button" className="button" onClick={close}>
					Tutup
				</button>
			</div>
		</div>
	) : (
		<form className={styles.form} onSubmit={onSubmit} noValidate>
			<Row label="Nama lengkap" htmlFor={ids.name}>
				<span className={styles.field}>
					<Icon name="user" size={20} />
					<input
						id={ids.name}
						className={styles.input}
						type="text"
						autoComplete="name"
						placeholder="Masukkan nama lengkap sesuai KTP"
						value={fields.fullName}
						aria-invalid={Boolean(shown('fullName'))}
						aria-describedby={shown('fullName') ? `${ids.name}-galat` : undefined}
						onChange={(event) => update('fullName', event.target.value)}
						onBlur={() => touch('fullName')}
					/>
				</span>
				<FieldError id={`${ids.name}-galat`} message={shown('fullName')} />
			</Row>
			<Row label="Nomor WhatsApp" htmlFor={ids.whatsapp}>
				<span className={styles.field}>
					<Icon name="chat" size={20} />
					<span className={styles.prefix} aria-hidden="true">
						+62
					</span>
					<input
						id={ids.whatsapp}
						className={styles.input}
						type="tel"
						inputMode="numeric"
						autoComplete="tel-national"
						placeholder="Masukkan nomor WhatsApp aktif"
						value={fields.whatsapp}
						aria-invalid={Boolean(shown('whatsapp'))}
						aria-describedby={`${ids.whatsapp}-awalan${shown('whatsapp') ? ` ${ids.whatsapp}-galat` : ''}`}
						onChange={(event) => update('whatsapp', event.target.value)}
						onBlur={() => touch('whatsapp')}
					/>
				</span>
				<span id={`${ids.whatsapp}-awalan`} className="visually-hidden">
					Diawali +62, tulis tanpa angka 0 di depan.
				</span>
				<FieldError id={`${ids.whatsapp}-galat`} message={shown('whatsapp')} />
			</Row>
			<Row label="Email" htmlFor={ids.email}>
				<span className={styles.field}>
					<Icon name="mail" size={20} />
					<input
						id={ids.email}
						className={styles.input}
						type="email"
						autoComplete="email"
						placeholder="Masukkan alamat email aktif"
						value={fields.email}
						aria-invalid={Boolean(shown('email'))}
						aria-describedby={shown('email') ? `${ids.email}-galat` : undefined}
						onChange={(event) => update('email', event.target.value)}
						onBlur={() => touch('email')}
					/>
				</span>
				<FieldError id={`${ids.email}-galat`} message={shown('email')} />
			</Row>
			<Row label="Kota" htmlFor={ids.city}>
				<span className={styles.field}>
					<Icon name="pin" size={20} />
					<select
						id={ids.city}
						className={`${styles.input} ${styles.select}`}
						value={fields.city}
						aria-invalid={Boolean(shown('city'))}
						aria-describedby={shown('city') ? `${ids.city}-galat` : undefined}
						onChange={(event) => {
							update('city', event.target.value);
							touch('city');
						}}
						onBlur={() => touch('city')}
					>
						<option value="">Pilih kota tempat tinggal</option>
						{LEAD_CITIES.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</span>
				<FieldError id={`${ids.city}-galat`} message={shown('city')} />
			</Row>

			<div className={styles.consents}>
				<div className={styles.check}>
					<input
						id={ids.consentA}
						type="checkbox"
						checked={fields.consentPartner}
						aria-invalid={Boolean(shown('consentPartner'))}
						aria-describedby={
							shown('consentPartner') ? `${ids.consentA}-galat` : undefined
						}
						onChange={(event) => {
							update('consentPartner', event.target.checked);
							touch('consentPartner');
						}}
					/>
					<label htmlFor={ids.consentA}>
						Saya setuju data saya diteruskan ke <strong>{product.providerName}</strong>{' '}
						untuk dihubungi terkait produk ini.
						<span className={styles.required} aria-hidden="true">
							{' '}
							*
						</span>
					</label>
				</div>
				<FieldError id={`${ids.consentA}-galat`} message={shown('consentPartner')} />
				<div className={styles.check}>
					<input
						id={ids.consentB}
						type="checkbox"
						checked={fields.consentMarketing}
						aria-describedby={`${ids.consentB}-opsional`}
						onChange={(event) => update('consentMarketing', event.target.checked)}
					/>
					<label htmlFor={ids.consentB}>
						Saya bersedia menerima informasi dan penawaran dari{' '}
						<strong>Financial Field Indonesia</strong> dan mitra.
						<span id={`${ids.consentB}-opsional`} className={styles.optional}>
							{' '}
							Opsional, bisa ditarik kapan saja.
						</span>
					</label>
				</div>
			</div>

			<div className={styles.footer}>
				<p className={styles.privacy}>
					<Icon name="lock" size={16} />
					<span>
						<Link href={routes.about('kebijakan-privasi')}>Kebijakan Privasi</Link> ·
						Data Anda aman dan hanya digunakan untuk menghubungi Anda.
					</span>
				</p>
				<div className={styles.actions}>
					<button type="button" className="button button-secondary" onClick={close}>
						Batal
					</button>
					<button
						type="submit"
						className="button"
						disabled={!ready}
						aria-describedby={ready ? undefined : ids.hint}
					>
						<Icon name="send" size={20} />
						Kirim permintaan
					</button>
				</div>
				{ready ? null : (
					<p id={ids.hint} className={styles.hint}>
						Lengkapi semua kolom bertanda * dan centang persetujuan pertama untuk
						mengirim.
					</p>
				)}
			</div>
		</form>
	);

	const panel = (
		<>
			<header className={styles.head}>
				<div className={styles.headText}>
					<h2 id={ids.title} className={styles.title}>
						Saya ingin tahu lebih lanjut tentang produk ini
					</h2>
					<p className={styles.subhead}>
						<span className={styles.provider}>{product.providerName}</span> –{' '}
						{product.productTitle}
					</p>
				</div>
				{preview ? null : (
					<button type="button" className={styles.close} onClick={close}>
						<Icon name="close" title="Tutup formulir" />
					</button>
				)}
			</header>
			<p id={ids.banner} className={styles.banner}>
				<Icon name="verified" size={20} />
				<span>
					Data Anda akan kami teruskan ke mitra agar mereka dapat menghubungi Anda. Ini{' '}
					<strong>bukan</strong> pengajuan kredit.
				</span>
			</p>
			<div className={styles.body}>{content}</div>
		</>
	);

	if (preview) {
		return (
			<section
				className={`${styles.dialog} ${styles.preview}`}
				aria-labelledby={ids.title}
				data-lead-relay=""
			>
				{panel}
			</section>
		);
	}

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				className={variant === 'button' ? 'button button-secondary' : styles.textTrigger}
				aria-haspopup="dialog"
				onClick={open}
				data-lead-trigger=""
			>
				Saya ingin tahu lebih lanjut
				<span className="visually-hidden">
					{' '}
					tentang {product.productTitle} dari {product.providerName}
				</span>
			</button>
			<dialog
				ref={dialogRef}
				className={styles.dialog}
				aria-labelledby={ids.title}
				aria-describedby={ids.banner}
				data-lead-relay=""
				onClose={() => {
					// Nothing typed outlives the dialog.
					setFields(EMPTY);
					setTouched({});
					triggerRef.current?.focus();
				}}
			>
				{panel}
			</dialog>
		</>
	);
}
