'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { loginAction } from '@/features/auth/login/api/actions'
import { type LoginFormData, loginSchema } from '@/features/auth/login/model/schema'
import { Link } from '@/shared/config/i18n'
import { useClearRootOnChange } from '@/shared/lib/forms'
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
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema)
	})
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = form
	const [isPending, startTransition] = useTransition()

	useClearRootOnChange(form, ['email', 'password'])

	/**
	 * Handles form submission with validated login data.
	 * Server action redirects on success - only failures land here.
	 *
	 * @param data - Validated login form data
	 */
	const onSubmit = (data: LoginFormData) => {
		startTransition(async () => {
			const result = await loginAction(data)
			if (result && !result.success) {
				setError('root', { message: result.error })
			}
		})
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
							autoComplete: 'email',
							placeholder: t('EMAIL_PLACEHOLDER'),
							disabled: isPending,
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
								autoComplete: 'current-password',
								placeholder: t('PASSWORD_PLACEHOLDER'),
								disabled: isPending,
								...register('password')
							}}
						/>
						<div className="flex justify-end">
							<Link
								href="/forgot-password"
								className="rounded-sm text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
							>
								{t('FORGOT_PASSWORD')}
							</Link>
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? t('SUBMIT_LOADING') : t('SUBMIT')}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
