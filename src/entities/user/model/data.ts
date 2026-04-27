import type { User } from '@/entities/user/model/types'

/**
 * MOCK DATA - replace with the real authenticated-user lookup once auth
 * is wired up (e.g. fetch from your DB based on the session). Importing this
 * into a client component is safe today only because the value is static.
 *
 * @deprecated Mark imports of `userData` with a TODO until they're sourced from
 *   the real auth provider; do not ship Sarah Johnson to production.
 */
export const userData: User = {
	name: 'Sarah Johnson',
	email: 'sarah@example.com',
	avatar: '/placeholder.svg?height=32&width=32'
}
