'use server'

import { headers } from 'next/headers'
import { type LoginFormData, loginSchema } from '@/features/auth/login/model/schema'
import type { LoginResult } from '@/features/auth/login/model/types'
import { rateLimit } from '@/shared/lib/rate-limit'
import { getClientIp } from '@/shared/lib/rate-limit/get-client-ip'

/**
 * Server action to handle user login.
 *
 * @param data - Validated login form data
 * @returns Login result with success status
 *
 * @example
 * ```tsx
 * const result = await loginAction(formData)
 * if (result.success) {
 *   router.push('/dashboard')
 * } else {
 *   setError('root', { message: result.error })
 * }
 * ```
 */
export async function loginAction(data: LoginFormData): Promise<LoginResult> {
	try {
		const headersList = await headers()
		const ip = getClientIp(headersList)
		const { allowed } = rateLimit(`login:${ip}`, { maxAttempts: 5, windowMs: 60_000 })
		if (!allowed) {
			return { success: false, error: 'RATE_LIMIT' }
		}

		const parsed = loginSchema.safeParse(data)
		if (!parsed.success) {
			return { success: false, error: 'VALIDATION' }
		}

		await new Promise(resolve => setTimeout(resolve, 1000))

		return {
			success: true,
			data: { message: 'Login successful' }
		}
	} catch (error) {
		console.error('Login error:', error)
		return {
			success: false,
			error: 'GENERAL'
		}
	}
}
