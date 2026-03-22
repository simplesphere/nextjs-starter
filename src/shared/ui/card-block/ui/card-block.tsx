import { Card, CardContent, CardHeader } from '@shared/ui/shadcn/card'
import { cn } from '@/shared/lib/utils'
import type { CardBlockProps } from '@/shared/ui/card-block/model/types'

export function CardBlock({ title, subtitle, rightContent, children, className }: CardBlockProps) {
	return (
		<Card className={cn('w-full rounded-lg', className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 py-4">
				<div className="space-y-1">
					<h3 className="text-lg font-semibold">{title}</h3>
					{subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
				</div>
				{rightContent && <div className="flex items-center">{rightContent}</div>}
			</CardHeader>
			<CardContent className="px-5 pt-0 pb-5">{children}</CardContent>
		</Card>
	)
}
