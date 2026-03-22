import { cn } from '@/shared/lib/utils'
import type { EmptyStateProps } from '@/shared/ui/empty-state/model/types'
import { GridBackground } from '@/shared/ui/empty-state/ui/grid-background'

export function EmptyState({ icon, title, description, actions, className }: EmptyStateProps) {
	return (
		<div
			className={cn(
				'relative mx-auto flex h-[480px] w-full max-w-[600px] items-center justify-center overflow-hidden',
				className
			)}
		>
			<GridBackground />

			<div className="relative z-10 flex flex-col items-center gap-3 text-center">
				<div className="mb-1 flex size-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
					{icon}
				</div>

				<h2 className="text-lg font-semibold">{title}</h2>

				{description && <p className="max-w-[300px] text-sm leading-relaxed text-muted-foreground">{description}</p>}

				{actions && <div className="mt-1.5">{actions}</div>}
			</div>
		</div>
	)
}
