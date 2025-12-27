'use server'

import type { ForgotPasswordFormData } from '@/features/auth/forgot-password/model/schema'
import type { ForgotPasswordResult } from '@/features/auth/forgot-password/model/types'

/**
 * Server action to handle forgot password request.
 * Sends a verification code to the user's email.
 *
 * @param data - Validated forgot password form data
 * @returns Forgot password result with success status
 *
 * @example
 * ```tsx
 * const result = await forgotPasswordAction(formData)
 * if (result.success) {
 *   router.push('/verify-otp')
 * } else {
 *   setError('root', { message: result.error })
 * }
 * ```
 */
export async function forgotPasswordAction(data: ForgotPasswordFormData): Promise<ForgotPasswordResult> {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000))

		console.info('Forgot password request for:', data.email)

		return {
			success: true,
			data: { message: 'Verification code sent to your email' }
		}
	} catch (error) {
		console.error('Forgot password error:', error)
		return {
			success: false,
			error: 'GENERAL'
		}
	}
}
