'use server'

import { headers } from 'next/headers'
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/features/auth/forgot-password/model/schema'
import type { ForgotPasswordResult } from '@/features/auth/forgot-password/model/types'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getClientIp } from '@/shared/lib/rate-limit/get-client-ip'

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
		const headersList = await headers()
		const ip = getClientIp(headersList)
		const { allowed } = rateLimit(`forgot-password:${ip}`, { maxAttempts: 3, windowMs: 60_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		const parsed = forgotPasswordSchema.safeParse(data)
		if (!parsed.success) {
			return { success: false, error: 'VALIDATION' }
		}

		await new Promise(resolve => setTimeout(resolve, 1000))

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
