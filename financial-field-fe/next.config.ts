import type { NextConfig } from 'next';

// Set only to read a real Strapi; empty = the local API over src/data, whose
// images are files of this site (PRP-0002.p1 §S4.8).
const cmsUrl = (process.env.CMS_URL ?? '').trim() ? new URL(process.env.CMS_URL as string) : null;

const isProduction = process.env.SITE_ENV === 'production';
// HSTS and upgrade-insecure-requests only make sense on a real HTTPS origin;
// on http://localhost they would break production-mode test runs.
const isHttpsProduction =
	isProduction && (process.env.NEXT_PUBLIC_SITE_URL ?? '').startsWith('https://');
const isDev = process.env.NODE_ENV === 'development';

// Article videos (ADR-0019): the player loads from YouTube's privacy-enhanced
// domain after a click; stills go through the image optimizer, so browsers
// never request i.ytimg.com themselves.
const YOUTUBE_PLAYER = 'https://www.youtube-nocookie.com';

const GA_SCRIPT = 'https://www.googletagmanager.com';
const GA_CONNECT = [
	'https://www.google-analytics.com',
	'https://*.google-analytics.com',
	'https://*.analytics.google.com',
	'https://www.googletagmanager.com',
];

/**
 * REQ-SEC-001. Scripts need 'unsafe-inline': a nonce-based CSP would force
 * every route into dynamic rendering and defeat ISR (DSC-0010). Everything
 * else stays strict: nobody may frame this site, the only frame it shows is
 * the YouTube player (REQ-SEC-010), no plugins, same-origin forms and base.
 */
const contentSecurityPolicy = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline' ${GA_SCRIPT}${isDev ? " 'unsafe-eval'" : ''}`,
	`connect-src 'self' ${GA_CONNECT.join(' ')}`,
	`img-src 'self' data: blob:${cmsUrl ? ` ${cmsUrl.origin}` : ''} https://www.google-analytics.com https://www.googletagmanager.com`,
	"style-src 'self' 'unsafe-inline'",
	"font-src 'self'",
	`frame-src ${YOUTUBE_PLAYER}`,
	"frame-ancestors 'none'",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	...(isHttpsProduction ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
	{ key: 'Content-Security-Policy', value: contentSecurityPolicy },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
	},
	{ key: 'X-Frame-Options', value: 'DENY' },
	...(isHttpsProduction
		? [
				{
					key: 'Strict-Transport-Security',
					value: 'max-age=31536000; includeSubDomains',
				},
			]
		: []),
];

const nextConfig: NextConfig = {
	// Container image for self-hosting in an Indonesian data center (REQ-INFRA-002).
	// Vercel staging builds with it set (ADR-0016).
	output: 'standalone',
	poweredByHeader: false,
	images: {
		formats: ['image/avif', 'image/webp'],
		// Only when the CMS is on this machine. Any other CMS host keeps the
		// optimizer's private-address block.
		dangerouslyAllowLocalIP: cmsUrl
			? ['localhost', '127.0.0.1'].includes(cmsUrl.hostname)
			: false,
		remotePatterns: [
			// Video stills by id only (src/lib/video.ts).
			{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' },
			...(cmsUrl
				? [
						{
							protocol: cmsUrl.protocol.replace(':', '') as 'http' | 'https',
							hostname: cmsUrl.hostname,
							port: cmsUrl.port,
							pathname: '/uploads/**',
						},
					]
				: []),
		],
	},
	async headers() {
		return [{ source: '/:path*', headers: securityHeaders }];
	},
};

export default nextConfig;
