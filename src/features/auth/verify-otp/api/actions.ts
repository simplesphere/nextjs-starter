'use server'

import { headers } from 'next/headers'
import { type VerifyOtpFormData, verifyOtpSchema } from '@/features/auth/verify-otp/model/schema'
import type { VerifyOtpResult } from '@/features/auth/verify-otp/model/types'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getClientIp } from '@/shared/lib/rate-limit/get-client-ip'

/**
 * Server action to verify OTP code.
 *
 * @param data - Validated OTP form data
 * @returns Verification result with success status and optional reset token
 *
 * @example
 * ```tsx
 * const result = await verifyOtpAction(formData)
 * if (result.success) {
 *   router.push(`/reset-password?token=${result.data.resetToken}`)
 * } else {
 *   setError('root', { message: result.error })
 * }
 * ```
 */
export async function verifyOtpAction(data: VerifyOtpFormData): Promise<VerifyOtpResult> {
	try {
		const headersList = await headers()
		const ip = getClientIp(headersList)
		const { allowed } = rateLimit(`verify-otp:${ip}`, { maxAttempts: 5, windowMs: 60_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		const parsed = verifyOtpSchema.safeParse(data)
		if (!parsed.success) {
			return { success: false, error: 'VALIDATION' }
		}

		await new Promise(resolve => setTimeout(resolve, 1000))

		return {
			success: true,
			data: {
				message: 'OTP verified successfully',
				resetToken: 'mock-reset-token'
			}
		}
	} catch (error) {
		console.error('OTP verification error:', error)
		return {
			success: false,
			error: 'GENERAL'
		}
	}
}
