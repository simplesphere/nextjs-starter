import { getTranslations } from 'next-intl/server'
import type { MetadataRoute } from 'next'
import { DEFAULT_LOCALE } from '@/shared/constants/locales'

/**
 * Generates the PWA manifest using the localized site name from translations,
 * so installs/share sheets show the right brand. Theme/background colors mirror
 * the light-mode design tokens.
 *
 * @returns The Next.js web app manifest
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const t = await getTranslations({ locale: DEFAULT_LOCALE, namespace: 'METADATA' })

	return {
		name: t('SITE_NAME'),
		short_name: t('SITE_NAME'),
		description: t('DESCRIPTION'),
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/icon',
				sizes: '512x512',
				type: 'image/png'
			}
		]
	}
}
