import type { MetadataRoute } from 'next'
import { siteUrl } from '@/shared/config/site'

/**
 * Robots policy generated at build time. Allows full crawling of the public
 * surface and points crawlers at the sitemap. Tweak the `disallow` list when
 * you add admin or auth-protected sections that shouldn't be indexed.
 *
 * @returns The Next.js robots configuration
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/']
			}
		],
		sitemap: `${siteUrl}/sitemap.xml`,
		host: siteUrl
	}
}
