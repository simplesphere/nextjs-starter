import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { googleSans } from '@/shared/config/fonts'
import { routing } from '@/shared/config/i18n'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import type { LocaleLayoutProps } from '@/shared/types'
import { Footer, Navigation, ThemeToggle } from '@/shared/ui'

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('METADATA')

	return {
		title: t('TITLE'),
		description: t('DESCRIPTION')
	}
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale } = await params

	if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
		notFound()
	}

	setRequestLocale(locale)

	const messages = await getMessages()

	return (
		<html lang={locale} className={googleSans.variable} suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<NextIntlClientProvider messages={messages}>
						<div className="flex min-h-screen flex-col">
							<header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
								<div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-4 py-4 sm:px-6 lg:px-8">
									<ThemeToggle />
									<Navigation />
								</div>
							</header>
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
