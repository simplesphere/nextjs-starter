import type { MetadataRoute } from 'next'
import { siteUrl } from '@/shared/config/site'
import { LOCALES } from '@/shared/constants/locales'

const PUBLIC_PATHS = ['/', '/about', '/login', '/forgot-password', '/privacy', '/terms'] as const

/**
 * Builds the sitemap with one entry per locale per public path. Localized
 * routes use `as-needed` prefixes, matching the runtime routing config.
 *
 * @returns The Next.js sitemap entries
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date()

	return LOCALES.flatMap(locale =>
		PUBLIC_PATHS.map(path => {
			const localeSegment = locale === LOCALES[0] ? '' : `/${locale}`
			const url = `${siteUrl}${localeSegment}${path === '/' ? '' : path}` || `${siteUrl}/`
			return {
				url: url || `${siteUrl}/`,
				lastModified: now,
				changeFrequency: 'monthly' as const,
				priority: path === '/' ? 1 : 0.7
			}
		})
	)
}
