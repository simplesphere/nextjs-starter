import { getTranslations } from 'next-intl/server'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'

export default async function Loading() {
	const t = await getTranslations('LOADING')
	return <LoadingSpinner message={t('MESSAGE')} />
}
