import { env } from '@/shared/config/env'

/**
 * Canonical site URL, sourced from validated environment.
 * Used for metadata `metadataBase`, sitemap entries, and canonical links.
 */
export const siteUrl = env.NEXT_PUBLIC_SITE_URL
