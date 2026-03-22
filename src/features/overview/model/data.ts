import { createElement } from 'react'
import { DollarSign, TrendingUp, Users, UsersRound } from 'lucide-react'
import type { OverviewStatItem } from '@/features/overview/model/types'

export function getOverviewStats(t: (key: string) => string): OverviewStatItem[] {
	return [
		{
			title: t('ACTIVE_PROFILES'),
			value: '346,357',
			icon: createElement(UsersRound, { className: 'size-5' }),
			tooltip: t('ACTIVE_PROFILES_TOOLTIP')
		},
		{
			title: t('REVENUE'),
			value: '$48,290',
			icon: createElement(DollarSign, { className: 'size-5' })
		},
		{
			title: t('ACTIVE_USERS'),
			value: '1,247',
			icon: createElement(Users, { className: 'size-5' })
		},
		{
			title: t('GROWTH_RATE'),
			value: '+12.5%',
			icon: createElement(TrendingUp, { className: 'size-5' })
		}
	]
}
