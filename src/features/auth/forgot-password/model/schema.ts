import { z } from 'zod'

export const forgotPasswordSchema = z.object({
	email: z.string().min(1, 'EMAIL_REQUIRED').email('EMAIL_INVALID')
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
