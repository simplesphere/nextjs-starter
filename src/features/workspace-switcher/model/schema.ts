import { z } from 'zod'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const createWorkspaceSchema = z.object({
	name: z.string().trim().min(1, 'NAME_REQUIRED').max(50, 'NAME_TOO_LONG'),
	slug: z.string().trim().min(2, 'SLUG_TOO_SHORT').max(40, 'SLUG_TOO_LONG').regex(SLUG_PATTERN, 'SLUG_INVALID')
})

export type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>
