import bundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/request.ts')

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})

// CSP is now handled per-request in proxy.ts with nonce-based script protection.

const securityHeaders = [
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload'
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN'
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff'
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block'
	},
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin'
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
	}
]

const nextConfig: NextConfig = {
	output: 'standalone',
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders
			}
		]
	},
	images: {
		remotePatterns: [],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60
	}
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
