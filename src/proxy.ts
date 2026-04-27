import createIntlMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { env } from '@/shared/config/env'
import { routing } from '@/shared/config/i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

const isDev = process.env.NODE_ENV === 'development'

function connectSrc(extras: string | undefined, devMode: boolean): string {
	const parts = ["'self'"]
	if (devMode) parts.push('ws:', 'wss:')
	if (extras) parts.push(...extras.split(/\s+/).filter(Boolean))
	return parts.join(' ')
}

function buildCspHeader(nonce: string): string {
	const connect = connectSrc(env.NEXT_PUBLIC_CSP_CONNECT_SRC, isDev)

	if (isDev) {
		return (
			"default-src 'self'; " +
			`script-src 'self' 'unsafe-eval' 'nonce-${nonce}'; ` +
			"style-src 'self' 'unsafe-inline'; " +
			"img-src 'self' data: blob: https:; " +
			"font-src 'self' data:; " +
			`connect-src ${connect}; ` +
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
		`connect-src ${connect}; ` +
		"frame-ancestors 'self'; " +
		"base-uri 'self'; " +
		"form-action 'self';"
	)
}

/**
 * Generates a fresh CSP nonce per request and:
 * 1. Mutates the inbound request headers so server components can read it via
 *    `headers().get('x-nonce')` (Next.js exposes the same Headers object).
 * 2. Sets the response CSP header so Next.js auto-applies the nonce to its
 *    own bootstrap scripts.
 *
 * If you add inline `<Script>` tags, read the nonce from `headers()` and pass
 * it explicitly - `'strict-dynamic'` will block anything else in production.
 */
export default function proxy(request: NextRequest) {
	// 16 random bytes → 128 bits of entropy, base64 for CSP-safe transport.
	const buffer = new Uint8Array(16)
	crypto.getRandomValues(buffer)
	const nonce = Buffer.from(buffer).toString('base64')

	// NextRequest exposes a mutable Headers facade - set nonce here so it
	// reaches server components downstream.
	request.headers.set('x-nonce', nonce)

	const response = intlMiddleware(request)

	response.headers.set('Content-Security-Policy', buildCspHeader(nonce))
	response.headers.set('x-nonce', nonce)

	return response
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
