import { Loader2 } from 'lucide-react'
import type { LoadingSpinnerProps } from '@/shared/types'

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="flex flex-col items-center gap-4">
				<Loader2 className="h-8 w-8 animate-spin text-foreground" />
				<p className="text-sm font-medium text-muted-foreground">{message}</p>
			</div>
		</div>
	)
}
