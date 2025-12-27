/**
 * Server action result type for login operation.
 */
export type LoginResult = { success: true; data: { message: string } } | { success: false; error: string }
