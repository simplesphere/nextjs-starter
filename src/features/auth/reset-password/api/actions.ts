'use server'

import type { ResetPasswordFormData } from '@/features/auth/reset-password/model/schema'
import type { ResetPasswordResult } from '@/features/auth/reset-password/model/types'

/**
 * Server action to reset user password.
 *
 * @param data - Validated reset password form data
 * @param resetToken - Optional reset token from OTP verification
 * @returns Reset password result with success status
 *
 * @example
 * ```tsx
 * const result = await resetPasswordAction(formData, token)
 * if (result.success) {
 *   router.push('/login')
 * } else {
 *   setError('root', { message: result.error })
 * }
 * ```
 */
export async function resetPasswordAction(
	data: ResetPasswordFormData,
	resetToken?: string
): Promise<ResetPasswordResult> {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000))

		console.info(
			'Password reset attempt with token:',
			resetToken,
			'for user with new password length:',
			data.password.length
		)

		return {
			success: true,
			data: { message: 'Password reset successful' }
		}
	} catch (error) {
		console.error('Password reset error:', error)
		return {
			success: false,
			error: 'GENERAL'
		}
	}
}
