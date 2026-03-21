'use server'

import { headers } from 'next/headers'
import { type ResetPasswordFormData, resetPasswordSchema } from '@/features/auth/reset-password/model/schema'
import type { ResetPasswordResult } from '@/features/auth/reset-password/model/types'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getClientIp } from '@/shared/lib/rate-limit/get-client-ip'

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
		const headersList = await headers()
		const ip = getClientIp(headersList)
		const { allowed } = rateLimit(`reset-password:${ip}`, { maxAttempts: 3, windowMs: 60_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		const parsed = resetPasswordSchema.safeParse(data)
		if (!parsed.success) {
			return { success: false, error: 'VALIDATION' }
		}

		await new Promise(resolve => setTimeout(resolve, 1000))

		console.info('Password reset attempt with token:', resetToken)

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
