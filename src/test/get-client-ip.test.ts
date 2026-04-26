import { describe, expect, it } from 'vitest'
import { getClientIp } from '@/shared/lib/rate-limit/get-client-ip'

describe('getClientIp', () => {
	it('prefers x-real-ip when present', () => {
		const headers = new Headers({ 'x-real-ip': '203.0.113.1', 'x-forwarded-for': '198.51.100.1' })
		expect(getClientIp(headers)).toBe('203.0.113.1')
	})

	it('falls back to the first x-forwarded-for entry', () => {
		const headers = new Headers({ 'x-forwarded-for': '198.51.100.1, 10.0.0.1, 10.0.0.2' })
		expect(getClientIp(headers)).toBe('198.51.100.1')
	})

	it('trims whitespace around values', () => {
		const headers = new Headers({ 'x-forwarded-for': '  198.51.100.1  ' })
		expect(getClientIp(headers)).toBe('198.51.100.1')
	})

	it('returns null when no source is present', () => {
		expect(getClientIp(new Headers())).toBeNull()
	})
})
