import { Card } from '@shared/ui/shadcn/card'
import type { StatsCardProps } from '@/shared/types'
import { StatsCardTooltip } from '@/shared/ui/stats-card-tooltip'

/**
 * Compact statistic card used on the dashboard overview grid.
 *
 * @param props - Stats card configuration
 * @param props.title - Metric label
 * @param props.value - Metric value (string or number)
 * @param props.icon - Decorative icon node
 * @param props.tooltip - Optional explanation surfaced via an info button
 * @returns The stats card component
 */
export function StatsCard({ title, value, icon, tooltip }: StatsCardProps) {
	return (
		<Card className="flex flex-col gap-6 px-6 py-5">
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
		</Card>
	)
}
