'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/shadcn/tooltip'
import { CircleHelp } from 'lucide-react'
import type { StatsCardTooltipProps } from '@/shared/types'

export function StatsCardTooltip({ content }: StatsCardTooltipProps) {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<button type="button" aria-label="More info" className="text-muted-foreground/60 hover:text-muted-foreground">
						<CircleHelp className="size-3.5" />
					</button>
				</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
