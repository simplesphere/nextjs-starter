import { getTranslations } from 'next-intl/server'
import { getOverviewStats } from '@/features/overview/model/data'
import { StatsCard } from '@/shared/ui'

export async function OverviewStats() {
	const t = await getTranslations('DASHBOARD.STATS')
	const stats = getOverviewStats(t)

	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map(stat => (
				<StatsCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} tooltip={stat.tooltip} />
			))}
		</div>
	)
}
