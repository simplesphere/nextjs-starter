import { getTranslations } from 'next-intl/server'
import { Home } from 'lucide-react'
import { Link } from '@/shared/config/i18n'

/**
 * 404 Not Found page component for locale-specific routes.
 *
 * @returns The not found page component
 *
 * @example
 * Automatically rendered by Next.js when a route is not found.
 */
export default async function NotFound() {
	const t = await getTranslations('NOT_FOUND')

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
			<div className="w-full max-w-md space-y-6 text-center">
				<div className="space-y-4">
					<h1 className="text-7xl font-bold text-zinc-900 dark:text-zinc-50">{t('TITLE')}</h1>
					<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('HEADING')}</h2>
					<p className="text-zinc-600 dark:text-zinc-400">{t('DESCRIPTION')}</p>
				</div>
				<Link
					href="/"
					className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
				>
					<Home className="h-4 w-4" />
					{t('GO_HOME')}
				</Link>
			</div>
		</div>
	)
}
