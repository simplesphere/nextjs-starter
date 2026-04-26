import { getTranslations } from 'next-intl/server'
import { Link } from '@/shared/config/i18n'

/**
 * Site footer rendered on marketing pages.
 *
 * @returns The footer component
 */
export async function Footer() {
	const t = await getTranslations('FOOTER')

	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t border-border bg-card">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
				<div className="text-sm text-muted-foreground">{t('COPYRIGHT', { year: currentYear })}</div>
				<nav className="flex gap-6" aria-label={t('PRIVACY_POLICY')}>
					<Link
						href="/privacy"
						className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
					>
						{t('PRIVACY_POLICY')}
					</Link>
					<Link
						href="/terms"
						className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
					>
						{t('TERMS_OF_SERVICE')}
					</Link>
				</nav>
			</div>
		</footer>
	)
}
