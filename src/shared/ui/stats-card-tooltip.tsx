'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui/shadcn/tooltip'
import { useTranslations } from 'next-intl'
import { CircleHelp } from 'lucide-react'
import type { StatsCardTooltipProps } from '@/shared/types'

/**
 * Info-button tooltip rendered next to a stats card title.
 * Relies on a `<TooltipProvider>` higher up the tree (mounted in the dashboard layout).
 *
 * @param props - Tooltip props
 * @param props.content - Localized explanation shown on hover/focus
 * @returns The tooltip trigger and content
 */
export function StatsCardTooltip({ content }: StatsCardTooltipProps) {
	const t = useTranslations('STATS_CARD_TOOLTIP')

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					aria-label={t('MORE_INFO')}
					className="rounded-sm text-muted-foreground/60 transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
				>
					<CircleHelp className="size-3.5" />
				</button>
			</TooltipTrigger>
			<TooltipContent>{content}</TooltipContent>
		</Tooltip>
	)
}
