import { Button } from '@shared/ui/shadcn/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import { cn } from '@/shared/lib/utils'
import { Heading } from '@/shared/ui'
import type { PageHeaderProps } from '@/widgets/page-header/model/types'

export function PageHeader({
	headline,
	subheadline,
	actions,
	className,
	pageHeaderComponent,
	backLink,
	headingAs = 'h1'
}: PageHeaderProps) {
	return (
		<header className={cn('flex w-full items-center justify-between', className)}>
			{pageHeaderComponent ? (
				pageHeaderComponent
			) : (
				<div>
					{backLink && (
						<Button
							variant="outline"
							size="icon"
							className="mb-3"
							render={<Link href={backLink} className="flex items-center" />}
						>
							<ArrowLeft />
						</Button>
					)}
					{headline && (
						<Heading as={headingAs} size="lg" weight="bold" className="mb-1 tracking-tight">
							{headline}
						</Heading>
					)}
					{subheadline && <p className="text-muted-foreground">{subheadline}</p>}
				</div>
			)}
			{actions && <div className="flex items-center">{actions}</div>}
		</header>
	)
}
