import { cn } from '@/shared/lib/utils'
import type { FormFieldProps } from '@/shared/types'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'

/**
 * Reusable form field component with label, input, and error display.
 *
 * @param props - Form field configuration
 * @param props.label - Label text for the field
 * @param props.error - Error message to display
 * @param props.required - Whether the field is required
 * @param props.inputProps - Props to pass to the Input component
 * @returns The form field component
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   error={errors.email}
 *   inputProps={{
 *     id: "email",
 *     name: "email",
 *     type: "email",
 *     ...register("email")
 *   }}
 * />
 * ```
 */
export function FormField({ label, error, required, inputProps }: FormFieldProps) {
	const { id } = inputProps
	const errorId = error ? `${id}-error` : undefined

	return (
		<div className="space-y-2">
			<Label htmlFor={id} className={required ? "after:ml-0.5 after:text-red-500 after:content-['*']" : ''}>
				{label}
			</Label>
			<Input
				{...inputProps}
				aria-invalid={!!error}
				aria-describedby={errorId}
				className={cn(error && 'border-red-500 focus-visible:ring-red-500')}
			/>
			{error && (
				<p id={errorId} className="text-sm text-red-600 dark:text-red-400">
					{error}
				</p>
			)}
		</div>
	)
}
