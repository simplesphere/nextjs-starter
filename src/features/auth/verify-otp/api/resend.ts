'use server'

import { headers } from 'next/headers'
import { logger } from '@/shared/lib/logger'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getRateLimitKey } from '@/shared/lib/rate-limit/get-client-ip'

interface ResendResult {
	success: boolean
	error?: 'RATE_LIMIT' | 'GENERAL'
}

/**
 * Server action to resend a verification code.
 *
 * Aggressively rate-limited (1 attempt per 30s per IP) so the resend link
 * cannot be used to flood email infrastructure or enumerate accounts.
 *
 * @returns Result with optional error code
 *
 * @example
 * ```tsx
 * const result = await resendOtpAction()
 * if (!result.success) toast(result.error)
 * ```
 */
export async function resendOtpAction(): Promise<ResendResult> {
	try {
		const headersList = await headers()
		const ipKey = getRateLimitKey(headersList)
		if (!ipKey) {
			return { success: false, error: 'GENERAL' }
		}

		const { allowed } = rateLimit(`resend-otp:${ipKey}`, { maxAttempts: 1, windowMs: 30_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		// TODO: replace mock delay with the real email/SMS resend call.
		await new Promise(resolve => setTimeout(resolve, 500))

		return { success: true }
	} catch (error) {
		logger.error('Resend OTP action failed', { error })
		return { success: false, error: 'GENERAL' }
	}
}
