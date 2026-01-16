import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'

/**
 * Default OG image configuration used across all pages.
 */
const DEFAULT_OG_IMAGE = {
	url: '/placeholder.svg',
	width: 1200,
	height: 630
} as const

/**
 * Creates page metadata with proper OpenGraph and Twitter card configuration.
 * Inherits site name from parent layout metadata for consistency.
 *
 * @param namespace - The translation namespace for the page (e.g., 'METADATA.HOME')
 * @param locale - The current locale
 * @param parent - Parent metadata resolver for inheriting base metadata
 * @returns Metadata object with title, description, and social sharing tags
 *
 * @example
 * ```ts
 * export async function generateMetadata(
 *   { params }: GenerateMetadataProps,
 *   parent: ResolvingMetadata
 * ): Promise<Metadata> {
 *   const { locale } = await params
 *   return createPageMetadata('METADATA.HOME', locale, parent)
 * }
 * ```
 */
export async function createPageMetadata(
	namespace: string,
	locale: string,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace })
	const parentMetadata = await parent

	const title = t('TITLE')
	const description = t('DESCRIPTION')
	const siteName = parentMetadata.openGraph?.siteName ?? undefined

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			siteName,
			type: 'website',
			locale,
			images: [{ ...DEFAULT_OG_IMAGE, alt: title }]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [DEFAULT_OG_IMAGE.url]
		}
	}
}
