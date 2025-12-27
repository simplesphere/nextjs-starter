'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { resetPasswordAction } from '@/features/auth/reset-password/api/actions'
import { type ResetPasswordFormData, resetPasswordSchema } from '@/features/auth/reset-password/model/schema'
import { useRouter } from '@/shared/config/i18n'
import { translateError } from '@/shared/lib/i18n'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, FormError, FormField } from '@/shared/ui'

/**
 * Reset password form component for setting a new password.
 *
 * @returns The reset password form component
 *
 * @example
 * ```tsx
 * <ResetPasswordForm />
 * ```
 */
export function ResetPasswordForm() {
	const t = useTranslations('AUTH.RESET_PASSWORD')
	const router = useRouter()
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema)
	})

	/**
	 * Handles form submission with validated reset password data.
	 *
	 * @param data - Validated reset password form data
	 */
	const onSubmit = async (data: ResetPasswordFormData) => {
		const result = await resetPasswordAction(data)

		if (result.success) {
			router.push('/login')
		} else {
			setError('root', { message: result.error })
		}
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">{t('TITLE')}</CardTitle>
				<CardDescription>{t('DESCRIPTION')}</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{errors.root && <FormError message={translateError(t, errors.root.message) || t('ERRORS.GENERAL')} />}

					<FormField
						label={t('PASSWORD_LABEL')}
						error={translateError(t, errors.password?.message)}
						required
						inputProps={{
							id: 'password',
							type: 'password',
							placeholder: t('PASSWORD_PLACEHOLDER'),
							disabled: isSubmitting,
							...register('password')
						}}
					/>

					<FormField
						label={t('CONFIRM_PASSWORD_LABEL')}
						error={translateError(t, errors.confirmPassword?.message)}
						required
						inputProps={{
							id: 'confirmPassword',
							type: 'password',
							placeholder: t('CONFIRM_PASSWORD_PLACEHOLDER'),
							disabled: isSubmitting,
							...register('confirmPassword')
						}}
					/>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? t('SUBMIT_LOADING') : t('SUBMIT')}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
