'use server'

import type { LoginFormData } from '@/features/auth/login/model/schema'
import type { LoginResult } from '@/features/auth/login/model/types'

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
		await new Promise(resolve => setTimeout(resolve, 1000))

		console.info('Login attempt:', data.email)

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
