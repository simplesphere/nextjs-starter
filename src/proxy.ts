import createIntlMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { routing } from '@/shared/config/i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

const isDev = process.env.NODE_ENV === 'development'

function buildCspHeader(nonce: string): string {
	if (isDev) {
		return (
			"default-src 'self'; " +
			`script-src 'self' 'unsafe-eval' 'nonce-${nonce}'; ` +
			"style-src 'self' 'unsafe-inline'; " +
			"img-src 'self' data: blob: https:; " +
			"font-src 'self' data:; " +
			"connect-src 'self' ws: wss:; " +
			"frame-ancestors 'self'; " +
			"base-uri 'self'; " +
			"form-action 'self';"
		)
	}

	return (
		"default-src 'self'; " +
		`script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; ` +
		"style-src 'self' 'unsafe-inline'; " +
		"img-src 'self' data: blob: https:; " +
		"font-src 'self' data:; " +
		"connect-src 'self'; " +
		"frame-ancestors 'self'; " +
		"base-uri 'self'; " +
		"form-action 'self';"
	)
}

export default function proxy(request: NextRequest) {
	const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
	const response = intlMiddleware(request)

	response.headers.set('Content-Security-Policy', buildCspHeader(nonce))
	response.headers.set('x-nonce', nonce)

	return response
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
