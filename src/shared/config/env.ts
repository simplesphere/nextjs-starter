import { z } from 'zod'

/**
 * Centralized, validated environment-variable surface.
 *
 * Server runtime variables go in `serverSchema`; values exposed to the client
 * bundle MUST be prefixed with `NEXT_PUBLIC_` and live in `clientSchema`.
 *
 * On import, this module validates `process.env` against the schemas and
 * throws at startup if a required variable is missing or malformed —
 * preferring fail-fast over silent localhost fallbacks.
 *
 * @example
 * ```ts
 * import { env } from '@/shared/config/env'
 * console.log(env.NEXT_PUBLIC_SITE_URL)
 * ```
 */
const clientSchema = z.object({
	NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL must be a valid URL (e.g. https://example.com)'),
	/**
	 * Optional space-separated list of additional origins to allow in the CSP
	 * `connect-src` directive (e.g. analytics, error tracking, your API).
	 * Example: `https://api.example.com https://*.posthog.com`.
	 */
	NEXT_PUBLIC_CSP_CONNECT_SRC: z.string().optional()
})

const serverSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
})

const clientResult = clientSchema.safeParse({
	NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
	NEXT_PUBLIC_CSP_CONNECT_SRC: process.env.NEXT_PUBLIC_CSP_CONNECT_SRC
})

const serverResult = serverSchema.safeParse({
	NODE_ENV: process.env.NODE_ENV
})

// In development we tolerate a missing site URL by defaulting to localhost so
// `bun dev` works out of the box; in any other environment we throw to surface
// the misconfiguration before it becomes a silent prod bug.
function resolveClientEnv() {
	if (clientResult.success) return clientResult.data

	if (process.env.NODE_ENV === 'development') {
		return {
			NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
			NEXT_PUBLIC_CSP_CONNECT_SRC: process.env.NEXT_PUBLIC_CSP_CONNECT_SRC
		}
	}

	throw new Error(
		`Invalid environment variables:\n${clientResult.error.issues.map(i => `  - ${i.path.join('.')}: ${i.message}`).join('\n')}`
	)
}

if (!serverResult.success) {
	throw new Error(
		`Invalid environment variables:\n${serverResult.error.issues.map(i => `  - ${i.path.join('.')}: ${i.message}`).join('\n')}`
	)
}

export const env = {
	...resolveClientEnv(),
	...serverResult.data
} as const
