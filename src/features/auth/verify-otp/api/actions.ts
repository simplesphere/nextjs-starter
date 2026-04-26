'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { setResetToken } from '@/features/auth/shared/reset-token-cookie'
import { type VerifyOtpFormData, verifyOtpSchema } from '@/features/auth/verify-otp/model/schema'
import type { VerifyOtpResult } from '@/features/auth/verify-otp/model/types'
import { routes } from '@/shared/config/routes'
import { logger } from '@/shared/lib/logger'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getRateLimitKey } from '@/shared/lib/rate-limit/get-client-ip'

/**
 * Server action to verify a one-time code.
 *
 * On success the action issues a short-lived, HttpOnly `reset_token` cookie
 * and redirects to the reset-password page. The client never sees the token.
 *
 * @param data - Validated OTP form data
 * @returns Result on validation or rate-limit failure (success path redirects)
 *
 * @example
 * ```tsx
 * const result = await verifyOtpAction(formData)
 * if (!result.success) setError('root', { message: result.error })
 * ```
 */
export async function verifyOtpAction(data: VerifyOtpFormData): Promise<VerifyOtpResult> {
	try {
		const headersList = await headers()
		const ipKey = getRateLimitKey(headersList)
		if (!ipKey) {
			return { success: false, error: 'GENERAL' }
		}
		const { allowed } = rateLimit(`verify-otp:${ipKey}`, { maxAttempts: 5, windowMs: 60_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		const parsed = verifyOtpSchema.safeParse(data)
		if (!parsed.success) {
			return { success: false, error: 'VALIDATION' }
		}

		// TODO: replace mock delay + token with real OTP verification + signed token.
		await new Promise(resolve => setTimeout(resolve, 1000))
		await setResetToken('mock-reset-token')
	} catch (error) {
		logger.error('OTP verification action failed', { error })
		return { success: false, error: 'GENERAL' }
	}

	redirect(routes.auth.resetPassword)
}
