'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type ResetPasswordFormData, resetPasswordSchema } from '@/features/auth/reset-password/model/schema'
import type { ResetPasswordResult } from '@/features/auth/reset-password/model/types'
import { clearResetToken, readResetToken } from '@/features/auth/shared/reset-token-cookie'
import { routes } from '@/shared/config/routes'
import { logger } from '@/shared/lib/logger'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getRateLimitKey } from '@/shared/lib/rate-limit/get-client-ip'

/**
 * Server action to reset a user's password.
 *
 * Requires a valid `reset_token` cookie issued by the verify-otp action.
 * On success the cookie is cleared and the user is redirected to login.
 *
 * @param data - Validated reset password form data
 * @returns Result on validation, rate-limit, or missing-token failure (success path redirects)
 *
 * @example
 * ```tsx
 * const result = await resetPasswordAction(formData)
 * if (!result.success) setError('root', { message: result.error })
 * ```
 */
export async function resetPasswordAction(data: ResetPasswordFormData): Promise<ResetPasswordResult> {
	try {
		const headersList = await headers()
		const ipKey = getRateLimitKey(headersList)
		if (!ipKey) {
			return { success: false, error: 'GENERAL' }
		}
		const { allowed } = rateLimit(`reset-password:${ipKey}`, { maxAttempts: 3, windowMs: 60_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		const token = await readResetToken()
		if (!token) {
			// No verified OTP in this session - block the reset entirely.
			return { success: false, error: 'INVALID_TOKEN' }
		}

		const parsed = resetPasswordSchema.safeParse(data)
		if (!parsed.success) {
			return { success: false, error: 'VALIDATION' }
		}

		// TODO: replace mock delay with the real password-reset call that also
		// invalidates the token on the server side.
		await new Promise(resolve => setTimeout(resolve, 1000))
		await clearResetToken()
	} catch (error) {
		logger.error('Password reset action failed', { error })
		return { success: false, error: 'GENERAL' }
	}

	redirect(routes.auth.login)
}
