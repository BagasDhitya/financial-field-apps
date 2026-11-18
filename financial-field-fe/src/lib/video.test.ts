import { describe, expect, it } from 'vitest';

import { mapVideo } from './cms/mappers/video';
import { isoDuration, isYouTubeEmbedUrl, parseIsoDuration, parseYouTubeId } from './video';

describe('parseIsoDuration', () => {
	it('reads the hours, minutes and seconds form the CMS stores', () => {
		expect(parseIsoDuration('PT1M30S')).toBe(90);
		expect(parseIsoDuration('PT10M26S')).toBe(626);
		expect(parseIsoDuration('PT1H2M5S')).toBe(3725);
		expect(parseIsoDuration('PT14S')).toBe(14);
	});

	it('refuses the clock form and anything empty', () => {
		expect(parseIsoDuration('1:30')).toBeNull();
		expect(parseIsoDuration('PT')).toBeNull();
		expect(parseIsoDuration('PT0S')).toBeNull();
		expect(parseIsoDuration('')).toBeNull();
		expect(parseIsoDuration(null)).toBeNull();
	});

	it('round-trips with isoDuration', () => {
		expect(isoDuration(parseIsoDuration('PT10M26S'))).toBe('PT10M26S');
	});
});

describe('isYouTubeEmbedUrl', () => {
	it('accepts only the /embed/ form', () => {
		expect(isYouTubeEmbedUrl('https://www.youtube.com/embed/FIAXLR8eiEo')).toBe(true);
		expect(isYouTubeEmbedUrl('https://www.youtube.com/watch?v=FIAXLR8eiEo')).toBe(false);
		expect(isYouTubeEmbedUrl('https://youtu.be/FIAXLR8eiEo')).toBe(false);
		expect(isYouTubeEmbedUrl('<iframe src="x">')).toBe(false);
	});

	it('still reads the id from an embed link', () => {
		expect(parseYouTubeId('https://www.youtube.com/embed/FIAXLR8eiEo')).toBe('FIAXLR8eiEo');
	});
});

describe('mapVideo', () => {
	const entry = {
		title: 'Judul video',
		channel: 'Kanal Contoh',
		uploadedAt: '2018-12-05T12:00:00.000Z',
		duration: 'PT14S',
		caption: 'Keterangan.',
		embedUrl: 'https://www.youtube.com/embed/u31qwQUeGuM',
	};

	it('maps the CMS component', () => {
		expect(mapVideo(entry, 'Judul artikel')).toEqual({
			provider: 'youtube',
			id: 'u31qwQUeGuM',
			title: 'Judul video',
			channelName: 'Kanal Contoh',
			uploadedAt: '2018-12-05T12:00:00.000Z',
			durationSeconds: 14,
			caption: 'Keterangan.',
		});
	});

	it('falls back to the article title when the video has none', () => {
		expect(mapVideo({ ...entry, title: '  ' }, 'Judul artikel')?.title).toBe('Judul artikel');
		expect(mapVideo({ embedUrl: entry.embedUrl }, 'Judul artikel')).toMatchObject({
			title: 'Judul artikel',
			channelName: null,
			durationSeconds: null,
		});
	});

	it('is null without a YouTube link', () => {
		expect(mapVideo(null, 'Judul artikel')).toBeNull();
		expect(mapVideo({ ...entry, embedUrl: 'https://example.com/x' }, 'Judul')).toBeNull();
	});
});
