import type { NextConfig } from 'next';

const cmsUrl = new URL(process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:1337');
const isProduction = process.env.SITE_ENV === 'production';
// HSTS and upgrade-insecure-requests only make sense on a real HTTPS origin;
// on http://localhost they would break production-mode test runs.
const isHttpsProduction =
	isProduction && (process.env.NEXT_PUBLIC_SITE_URL ?? '').startsWith('https://');
const isDev = process.env.NODE_ENV === 'development';

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
 * else stays strict: no framing, no plugins, same-origin forms and base.
 */
const contentSecurityPolicy = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline' ${GA_SCRIPT}${isDev ? " 'unsafe-eval'" : ''}`,
	`connect-src 'self' ${GA_CONNECT.join(' ')}`,
	`img-src 'self' data: blob: ${cmsUrl.origin} https://www.google-analytics.com https://www.googletagmanager.com`,
	"style-src 'self' 'unsafe-inline'",
	"font-src 'self'",
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
		// Only when the CMS is on this machine (local dev, e2e mock CMS). Any other
		// CMS host keeps the optimizer's private-address block.
		dangerouslyAllowLocalIP: ['localhost', '127.0.0.1'].includes(cmsUrl.hostname),
		remotePatterns: [
			{
				protocol: cmsUrl.protocol.replace(':', '') as 'http' | 'https',
				hostname: cmsUrl.hostname,
				port: cmsUrl.port,
				pathname: '/uploads/**',
			},
		],
	},
	async headers() {
		return [{ source: '/:path*', headers: securityHeaders }];
	},
};

export default nextConfig;
