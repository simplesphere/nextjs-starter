/**
 * Server action result type for password reset operation.
 */
export type ResetPasswordResult = { success: true; data: { message: string } } | { success: false; error: string }
