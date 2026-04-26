/**
 * Extracts the client IP address from request headers.
 *
 * Checks headers in order of trust:
 * 1. x-real-ip — typically set by a trusted reverse proxy (Nginx, Caddy, etc.)
 * 2. x-forwarded-for — first IP in the chain (original client, if proxies are trusted)
 * 3. Returns `null` when neither is present so callers can fail closed.
 *
 * NOTE: Both headers are spoofable unless your reverse proxy strips/overwrites them.
 * Ensure your hosting platform (Vercel, AWS ALB, Nginx, etc.) sets these headers
 * from the actual TCP connection, not from the incoming request.
 *
 * @param headersList - The request headers (e.g. from `next/headers`)
 * @returns The client IP, or `null` when no trusted source is available
 */
export function getClientIp(headersList: Headers): string | null {
	const realIp = headersList.get('x-real-ip')
	if (realIp) return realIp.trim()

	const forwardedFor = headersList.get('x-forwarded-for')
	if (forwardedFor) {
		const firstIp = forwardedFor.split(',')[0]?.trim()
		if (firstIp) return firstIp
	}

	return null
}

/**
 * Resolves the IP for rate-limiting purposes. Returns the actual client IP
 * when available, otherwise:
 * - in development: returns the literal string `'local'` so you can test
 *   without a reverse proxy.
 * - in production: returns `null` so the caller can fail closed (deny the
 *   request) rather than letting unidentified traffic share a single bucket.
 */
export function getRateLimitKey(headersList: Headers): string | null {
	const ip = getClientIp(headersList)
	if (ip) return ip
	return process.env.NODE_ENV === 'development' ? 'local' : null
}
