'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { loginAction } from '@/features/auth/login/api/actions'
import { type LoginFormData, loginSchema } from '@/features/auth/login/model/schema'
import { Link } from '@/shared/config/i18n'
import { translateError } from '@/shared/lib/i18n'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, FormError, FormField } from '@/shared/ui'

/**
 * Login form component with validation using react-hook-form and zod.
 *
 * @returns The login form component
 *
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 */
export function LoginForm() {
	const t = useTranslations('AUTH.LOGIN')
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema)
	})

	/**
	 * Handles form submission with validated login data.
	 *
	 * @param data - Validated login form data
	 */
	const onSubmit = async (data: LoginFormData) => {
		const result = await loginAction(data)

		if (!result.success) {
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
						label={t('EMAIL_LABEL')}
						error={translateError(t, errors.email?.message)}
						required
						inputProps={{
							id: 'email',
							type: 'email',
							placeholder: t('EMAIL_PLACEHOLDER'),
							disabled: isSubmitting,
							...register('email')
						}}
					/>

					<div className="space-y-2">
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
						<div className="flex justify-end">
							<Link
								href="/forgot-password"
								className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
							>
								{t('FORGOT_PASSWORD')}
							</Link>
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? t('SUBMIT_LOADING') : t('SUBMIT')}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
