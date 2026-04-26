import { DEFAULT_WORKSPACE_SLUG } from '@/entities/workspace'

/**
 * Centralized route paths used across the app. Forms, server actions,
 * navigation widgets, and middleware should consume these instead of
 * inlining string literals — renames become one-file changes.
 *
 * All paths are relative to the locale prefix; pass them to next-intl's
 * `Link` / `useRouter` / `redirect` directly.
 */
export const routes = {
	home: '/',
	about: '/about',
	privacy: '/privacy',
	terms: '/terms',
	auth: {
		login: '/login',
		forgotPassword: '/forgot-password',
		verifyOtp: '/verify-otp',
		resetPassword: '/reset-password'
	},
	dashboard: {
		root: `/${DEFAULT_WORKSPACE_SLUG}/dashboard`,
		analytics: (workspace: string) => `/${workspace}/analytics`,
		projects: (workspace: string) => `/${workspace}/projects`,
		team: (workspace: string) => `/${workspace}/team`,
		settings: (workspace: string) => `/${workspace}/settings`,
		dashboard: (workspace: string) => `/${workspace}/dashboard`
	}
} as const
