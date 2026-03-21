/**
 * Extracts the client IP address from request headers.
 *
 * Checks headers in order of trust:
 * 1. x-real-ip — typically set by a trusted reverse proxy (Nginx, Caddy, etc.)
 * 2. x-forwarded-for — first IP in the chain (original client, if proxies are trusted)
 * 3. Falls back to 'unknown'
 *
 * NOTE: Both headers are spoofable unless your reverse proxy strips/overwrites them.
 * Ensure your hosting platform (Vercel, AWS ALB, Nginx, etc.) sets these headers
 * from the actual TCP connection, not from the incoming request.
 */
export function getClientIp(headersList: Headers): string {
	const realIp = headersList.get('x-real-ip')
	if (realIp) return realIp.trim()

	const forwardedFor = headersList.get('x-forwarded-for')
	if (forwardedFor) {
		const firstIp = forwardedFor.split(',')[0]?.trim()
		if (firstIp) return firstIp
	}

	return 'unknown'
}
