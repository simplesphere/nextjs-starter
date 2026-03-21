import { getTranslations } from 'next-intl/server'
import { Link } from '@/shared/config/i18n'

export async function Footer() {
	const t = await getTranslations('FOOTER')

	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t border-border bg-background">
			<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="text-sm text-muted-foreground">{t('COPYRIGHT', { year: currentYear })}</div>
					<nav className="flex flex-wrap gap-6">
						<Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
							{t('PRIVACY_POLICY')}
						</Link>
						<Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
							{t('TERMS_OF_SERVICE')}
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	)
}
