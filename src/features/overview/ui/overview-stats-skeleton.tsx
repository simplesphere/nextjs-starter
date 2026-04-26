import { Card } from '@shared/ui/shadcn/card'
import { Skeleton } from '@shared/ui/shadcn/skeleton'

/**
 * Suspense fallback for `OverviewStats`. Mirrors the four-card grid so the
 * page chrome paints immediately and only the stats area shows a loading
 * shimmer while the server work completes.
 *
 * @returns A skeleton grid with the same shape as the loaded stats grid
 */
export function OverviewStatsSkeleton() {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
			{Array.from({ length: 4 }).map((_, index) => (
				<Card key={index} className="flex flex-col gap-6 px-6 py-5">
					<div className="flex items-start justify-between">
						<Skeleton className="h-4 w-28" />
						<Skeleton className="h-5 w-5 rounded" />
					</div>
					<Skeleton className="h-8 w-24" />
				</Card>
			))}
		</div>
	)
}
