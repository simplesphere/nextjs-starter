'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type LoginFormData, loginSchema } from '@/features/auth/login/model/schema'
import type { LoginResult } from '@/features/auth/login/model/types'
import { routes } from '@/shared/config/routes'
import { logger } from '@/shared/lib/logger'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getRateLimitKey } from '@/shared/lib/rate-limit/get-client-ip'

/**
 * Server action to handle user login.
 *
 * On success the action redirects to the active workspace dashboard via
 * Next.js `redirect()` so navigation cannot race with client-side state.
 * On failure it returns a structured `LoginResult` for the form to render.
 *
 * @param data - Validated login form data
 * @returns Login result on validation or rate-limit failure (success path redirects)
 *
 * @example
 * ```tsx
 * const result = await loginAction(formData)
 * if (!result.success) setError('root', { message: result.error })
 * ```
 */
export async function loginAction(data: LoginFormData): Promise<LoginResult> {
	try {
		const headersList = await headers()
		const ipKey = getRateLimitKey(headersList)
		if (!ipKey) {
			// Fail-closed in prod: refuse to bucket unidentified traffic together.
			return { success: false, error: 'GENERAL' }
		}
		const { allowed } = rateLimit(`login:${ipKey}`, { maxAttempts: 5, windowMs: 60_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		const parsed = loginSchema.safeParse(data)
		if (!parsed.success) {
			return { success: false, error: 'VALIDATION' }
		}

		// TODO: replace mock delay with the real authentication call.
		await new Promise(resolve => setTimeout(resolve, 1000))
	} catch (error) {
		logger.error('Login action failed', { error })
		return { success: false, error: 'GENERAL' }
	}

	// `redirect()` throws - must be called outside the try/catch above so the
	// special NEXT_REDIRECT control-flow signal is not swallowed.
	redirect(routes.dashboard.root)
}
