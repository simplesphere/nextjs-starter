'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/features/auth/forgot-password/model/schema'
import type { ForgotPasswordResult } from '@/features/auth/forgot-password/model/types'
import { routes } from '@/shared/config/routes'
import { logger } from '@/shared/lib/logger'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getRateLimitKey } from '@/shared/lib/rate-limit/get-client-ip'

/**
 * Server action to handle forgot-password requests.
 * On success the action redirects to the OTP verification page; on failure
 * it returns a structured result for the form to surface.
 *
 * @param data - Validated forgot password form data
 * @returns Result on validation or rate-limit failure (success path redirects)
 *
 * @example
 * ```tsx
 * const result = await forgotPasswordAction(formData)
 * if (!result.success) setError('root', { message: result.error })
 * ```
 */
export async function forgotPasswordAction(data: ForgotPasswordFormData): Promise<ForgotPasswordResult> {
	try {
		const headersList = await headers()
		const ipKey = getRateLimitKey(headersList)
		if (!ipKey) {
			return { success: false, error: 'GENERAL' }
		}
		const { allowed } = rateLimit(`forgot-password:${ipKey}`, { maxAttempts: 3, windowMs: 60_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		const parsed = forgotPasswordSchema.safeParse(data)
		if (!parsed.success) {
			return { success: false, error: 'VALIDATION' }
		}

		// TODO: replace mock delay with the real "send code" call.
		await new Promise(resolve => setTimeout(resolve, 1000))
	} catch (error) {
		logger.error('Forgot password action failed', { error })
		return { success: false, error: 'GENERAL' }
	}

	// `redirect()` throws - must run outside the try/catch so the NEXT_REDIRECT
	// signal is not swallowed.
	redirect(routes.auth.verifyOtp)
}
