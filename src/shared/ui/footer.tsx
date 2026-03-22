import { getTranslations } from 'next-intl/server'
import { Link } from '@/shared/config/i18n'

export async function Footer() {
	const t = await getTranslations('FOOTER')

	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t border-border bg-foreground text-background">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
				<div className="text-sm">{t('COPYRIGHT', { year: currentYear })}</div>
				<nav className="flex gap-6">
					<Link href="/privacy" className="text-sm opacity-70 transition-opacity hover:opacity-100">
						{t('PRIVACY_POLICY')}
					</Link>
					<Link href="/terms" className="text-sm opacity-70 transition-opacity hover:opacity-100">
						{t('TERMS_OF_SERVICE')}
					</Link>
				</nav>
			</div>
		</footer>
	)
}
