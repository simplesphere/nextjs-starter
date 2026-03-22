import { Button } from '@shared/ui/shadcn/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import { cn } from '@/shared/lib/utils'
import type { PageHeaderProps } from '@/widgets/page-header/model/types'

export function PageHeader({
	headline,
	subheadline,
	actions,
	className,
	pageHeaderComponent,
	backLink
}: PageHeaderProps) {
	return (
		<header className={cn('flex w-full items-center justify-between', className)}>
			{pageHeaderComponent ? (
				pageHeaderComponent
			) : (
				<div>
					{backLink && (
						<Button asChild variant="outline" size="icon" className="mb-3">
							<Link href={backLink} className="flex items-center">
								<ArrowLeft />
							</Link>
						</Button>
					)}
					{headline && <h1 className="mb-1 text-3xl font-bold tracking-tight">{headline}</h1>}
					{subheadline && <p className="text-muted-foreground">{subheadline}</p>}
				</div>
			)}
			{actions && <div className="flex items-center">{actions}</div>}
		</header>
	)
}
