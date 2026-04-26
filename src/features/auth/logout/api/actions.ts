'use server'

import { redirect } from 'next/navigation'
import { clearResetToken } from '@/features/auth/shared/reset-token-cookie'
import { routes } from '@/shared/config/routes'
import { logger } from '@/shared/lib/logger'

/**
 * Server action that signs the current user out and redirects to the login page.
 *
 * Today this is scaffolding — it clears the short-lived reset-token cookie
 * (the only auth-shaped cookie the template ships) and redirects. When you
 * wire a real auth provider, replace the body with the provider's signOut +
 * cookie/session cleanup, then keep the redirect.
 *
 * @example
 * ```tsx
 * <form action={logoutAction}>
 *   <button type="submit">Log out</button>
 * </form>
 * ```
 */
export async function logoutAction(): Promise<void> {
	try {
		// TODO: replace with real session destruction (auth provider signOut,
		// session cookie deletion, server-side revoke, etc.)
		await clearResetToken()
	} catch (error) {
		logger.error('Logout action failed', { error })
	}

	redirect(routes.auth.login)
}
