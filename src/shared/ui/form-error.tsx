import type { FormErrorProps } from '@/shared/types'

/**
 * Displays a general form error message.
 *
 * @param props - Error message props
 * @param props.message - Error message to display
 * @returns The error message component
 *
 * @example
 * ```tsx
 * <FormError message="An error occurred" />
 * ```
 */
export function FormError({ message }: FormErrorProps) {
	return (
		<div
			role="alert"
			aria-live="polite"
			className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
		>
			{message}
		</div>
	)
}
