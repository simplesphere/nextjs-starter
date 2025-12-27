import { getTranslations } from 'next-intl/server'
import { Link } from '@/shared/config/i18n'

/**
 * Footer component with links and copyright information.
 *
 * @returns The footer component
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export async function Footer() {
	const t = await getTranslations('FOOTER')

	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
			<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="text-sm text-zinc-600 dark:text-zinc-400">{t('COPYRIGHT', { year: currentYear })}</div>
					<nav className="flex flex-wrap gap-6">
						<Link
							href="/privacy"
							className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
						>
							{t('PRIVACY_POLICY')}
						</Link>
						<Link
							href="/terms"
							className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
						>
							{t('TERMS_OF_SERVICE')}
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	)
}
