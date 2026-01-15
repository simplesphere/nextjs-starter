import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { googleSans } from '@/shared/config/fonts'
import { routing } from '@/shared/config/i18n'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import type { LocaleLayoutProps } from '@/shared/types'

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
					<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
