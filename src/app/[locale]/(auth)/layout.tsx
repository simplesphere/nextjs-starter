import type { ReactNode } from 'react'

/**
 * Shared layout for the unauthenticated auth route group.
 * Provides the centered card shell used by sign-in, forgot-password,
 * verify-otp, and reset-password pages.
 *
 * @param props - Layout props
 * @param props.children - Auth page content
 * @returns The auth layout wrapper
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<main id="content" className="w-full max-w-md space-y-6">
				{children}
			</main>
		</div>
	)
}
