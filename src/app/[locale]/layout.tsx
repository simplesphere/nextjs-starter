import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { googleSansFlex } from '@/shared/config/fonts'
import { routing } from '@/shared/config/i18n'
import { siteUrl } from '@/shared/config/site'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import type { GenerateMetadataProps, LocaleLayoutProps } from '@/shared/types'
import { SkipLink } from '@/shared/ui'

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'METADATA' })

	return {
		metadataBase: new URL(siteUrl),
		title: {
			template: `%s | ${t('SITE_NAME')}`,
			default: t('TITLE')
		},
		description: t('DESCRIPTION'),
		openGraph: {
			type: 'website',
			locale,
			siteName: t('SITE_NAME')
			// `images` left unset so Next.js auto-injects `app/opengraph-image.tsx`.
			// Override per-route by adding a route-segment `opengraph-image.tsx`.
		},
		twitter: {
			card: 'summary_large_image'
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
		<html lang={locale} className={googleSansFlex.variable} suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<NextIntlClientProvider messages={messages}>
						<SkipLink />
						{children}
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
