import { getTranslations } from 'next-intl/server'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'

/**
 * Loading component for locale-specific routes.
 *
 * @returns The loading spinner component
 *
 * @example
 * Automatically rendered by Next.js while loading locale-specific content.
 */
export default async function Loading() {
	const t = await getTranslations('LOADING')

	return <LoadingSpinner message={t('MESSAGE')} />
}
