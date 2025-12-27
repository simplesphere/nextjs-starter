import { z } from 'zod'

export const resetPasswordSchema = z
	.object({
		password: z.string().min(1, 'PASSWORD_REQUIRED').min(6, 'PASSWORD_MIN_LENGTH'),
		confirmPassword: z.string().min(1, 'CONFIRM_PASSWORD_REQUIRED')
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'PASSWORD_MISMATCH',
		path: ['confirmPassword']
	})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
