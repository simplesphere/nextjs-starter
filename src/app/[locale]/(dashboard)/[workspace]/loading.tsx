import { getTranslations } from 'next-intl/server'
import { LoadingSpinner } from '@/shared/ui'

export default async function WorkspaceLoading() {
	const t = await getTranslations('LOADING')
	return <LoadingSpinner message={t('MESSAGE')} />
}
