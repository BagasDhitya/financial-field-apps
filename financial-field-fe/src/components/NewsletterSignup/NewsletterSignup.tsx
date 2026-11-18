'use client';

import { useId, useState, type FormEvent } from 'react';

import { Icon } from '../Icon/Icon';

import styles from './NewsletterSignup.module.css';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'invalid' | 'noted';

/**
 * The newsletter box (ADR-0022, Phase 2 behind FEATURE_NEWSLETTER). There is
 * no newsletter service yet, so nothing is sent or stored: the address is
 * checked in the browser and the reader is told plainly that sign-up isn't
 * open. The field has no `name`, so the address can't reach a URL even
 * without JavaScript.
 */
export function NewsletterSignup() {
	const id = useId();
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState<Status>('idle');

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus(EMAIL.test(email.trim()) ? 'noted' : 'invalid');
	}

	return (
		<section className={styles.root} aria-labelledby={`${id}-judul`}>
			<div className={styles.head}>
				<span className={styles.icon} aria-hidden="true">
					<Icon name="mail" size={24} />
				</span>
				<div className={styles.copy}>
					<h2 id={`${id}-judul`} className={styles.title}>
						Dapatkan Insight Keuangan Terbaru
					</h2>
					<p className={styles.lead}>
						Tips, berita, dan panduan keuangan langsung ke email Anda.
					</p>
				</div>
			</div>
			<form className={styles.form} onSubmit={onSubmit} noValidate>
				<label htmlFor={`${id}-email`} className="visually-hidden">
					Alamat email
				</label>
				<input
					id={`${id}-email`}
					className={styles.input}
					type="email"
					autoComplete="email"
					placeholder="Alamat email Anda"
					value={email}
					aria-invalid={status === 'invalid'}
					aria-describedby={`${id}-status`}
					onChange={(event) => {
						setEmail(event.target.value);
						setStatus('idle');
					}}
				/>
				<button type="submit" className={`button ${styles.submit}`}>
					Berlangganan
				</button>
			</form>
			<p id={`${id}-status`} className={styles.status} role="status">
				{status === 'invalid' ? 'Periksa kembali alamat email Anda.' : null}
				{status === 'noted'
					? 'Terima kasih. Pendaftaran newsletter belum dibuka, jadi alamat Anda tidak disimpan.'
					: null}
			</p>
			<p className={styles.note}>
				<Icon name="lock" size={16} />
				Gratis. Batalkan kapan saja.
			</p>
		</section>
	);
}
