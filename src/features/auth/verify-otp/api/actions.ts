'use server'

import type { VerifyOtpFormData } from '@/features/auth/verify-otp/model/schema'
import type { VerifyOtpResult } from '@/features/auth/verify-otp/model/types'

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
		await new Promise(resolve => setTimeout(resolve, 1000))

		console.info('OTP verification attempt:', data.otp)

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
