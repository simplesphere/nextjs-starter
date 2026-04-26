import 'server-only'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'reset_token'
const TTL_SECONDS = 60 * 10

/**
 * Server-side helpers for the short-lived reset-password token issued by the
 * verify-otp action and consumed by the reset-password action.
 *
 * The token is delivered via an HttpOnly, SameSite=Lax cookie so it cannot be
 * read by client JS, can't be sent in third-party contexts, and is automatically
 * discarded after {@link TTL_SECONDS}. In production it is also `Secure`.
 *
 * This is scaffolding for the eventual real auth integration — the token value
 * itself is not yet cryptographically meaningful.
 */
export async function setResetToken(token: string): Promise<void> {
	const store = await cookies()
	store.set(COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: TTL_SECONDS
	})
}

export async function readResetToken(): Promise<string | undefined> {
	const store = await cookies()
	return store.get(COOKIE_NAME)?.value
}

export async function clearResetToken(): Promise<void> {
	const store = await cookies()
	store.delete(COOKIE_NAME)
}
