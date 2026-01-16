import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { googleSans } from '@/shared/config/fonts'
import { routing } from '@/shared/config/i18n'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import type { GenerateMetadataProps, LocaleLayoutProps } from '@/shared/types'

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'METADATA' })

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
		title: {
			template: `%s | ${t('SITE_NAME')}`,
			default: t('TITLE')
		},
		description: t('DESCRIPTION'),
		openGraph: {
			type: 'website',
			locale,
			images: [
				{
					url: '/placeholder.svg',
					width: 1200,
					height: 630,
					alt: t('TITLE')
				}
			],
			siteName: t('SITE_NAME')
		},
		twitter: {
			card: 'summary_large_image',
			images: ['/placeholder.svg']
		}
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
