import { Loader2 } from 'lucide-react'
import type { LoadingSpinnerProps } from '@/shared/types'

/**
 * Displays a loading spinner with an optional message.
 *
 * @param props - The loading spinner configuration
 * @param props.message - The message to display below the spinner
 * @returns The loading spinner component
 *
 * @example
 * ```tsx
 * <LoadingSpinner message="Loading..." />
 * ```
 */
export function LoadingSpinner({ message }: LoadingSpinnerProps) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
			<div className="flex flex-col items-center gap-4">
				<Loader2 className="h-8 w-8 animate-spin text-zinc-900 dark:text-zinc-50" />
				<p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{message}</p>
			</div>
		</div>
	)
}
