import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'

/**
 * Creates page metadata with proper OpenGraph and Twitter card configuration.
 * Inherits site name and OG images from parent layout metadata for consistency,
 * and sets `alternates.canonical` plus locale alternates so search engines can
 * index the right canonical URL when the same content is reachable under
 * multiple locale prefixes.
 *
 * @param namespace - The translation namespace for the page (e.g. `METADATA.HOME`)
 * @param locale - The current locale
 * @param parent - Parent metadata resolver for inheriting base metadata
 * @param options - Optional overrides
 * @param options.path - Route path used to build canonical + alternate URLs
 *   (e.g. `'/about'`). Defaults to `'/'`.
 * @returns Metadata object with title, description, canonical, and social tags
 *
 * @example
 * ```ts
 * export async function generateMetadata(
 *   { params }: GenerateMetadataProps,
 *   parent: ResolvingMetadata
 * ): Promise<Metadata> {
 *   const { locale } = await params
 *   return createPageMetadata('METADATA.HOME', locale, parent, { path: '/' })
 * }
 * ```
 */
export async function createPageMetadata(
	namespace: string,
	locale: string,
	parent: ResolvingMetadata,
	options: { path?: string } = {}
): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace })
	const parentMetadata = await parent

	const title = t('TITLE')
	const description = t('DESCRIPTION')
	const siteName = parentMetadata.openGraph?.siteName ?? undefined
	const path = options.path ?? '/'

	return {
		title,
		description,
		alternates: {
			canonical: path
		},
		openGraph: {
			title,
			description,
			siteName,
			type: 'website',
			locale,
			url: path
			// `images` is left unset so Next.js inherits the root layout's auto-injected
			// `app/opengraph-image.tsx` (or any route-scoped override).
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description
		}
	}
}
