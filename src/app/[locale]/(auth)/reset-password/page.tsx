import { getTranslations } from 'next-intl/server'
import { ArrowLeft } from 'lucide-react'
import { ResetPasswordForm } from '@/features/auth'
import { Link } from '@/shared/config/i18n'

/**
 * Reset password page component with OTP verification.
 *
 * @returns The reset password page
 */
export default async function ResetPasswordPage() {
	const t = await getTranslations('AUTH.RESET_PASSWORD')

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
			<div className="w-full max-w-md space-y-6">
				<Link
					href="/login"
					className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
				>
					<ArrowLeft className="h-4 w-4" />
					{t('BACK')}
				</Link>

				<div className="flex justify-center">
					<ResetPasswordForm />
				</div>
			</div>
		</div>
	)
}
