import type { StatsCardProps } from '@/shared/types'
import { StatsCardTooltip } from '@/shared/ui/stats-card-tooltip'

export function StatsCard({ title, value, icon, tooltip }: StatsCardProps) {
	return (
		<div className="flex flex-col gap-6 rounded-lg border bg-card px-6 py-5 text-card-foreground shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-1.5">
					<div className="text-sm text-muted-foreground">{title}</div>
					{tooltip && <StatsCardTooltip content={tooltip} />}
				</div>
				<div className="text-muted-foreground" aria-hidden="true">
					{icon}
				</div>
			</div>
			<div className="text-3xl font-bold">{value}</div>
		</div>
	)
}
