import { describe, expect, it } from 'vitest'
import { translateError } from '@/shared/lib/i18n'

describe('translateError', () => {
	it('returns undefined when no error key is provided', () => {
		const t = (k: string) => k
		expect(translateError(t, undefined)).toBeUndefined()
	})

	it('looks up the error under ERRORS.<key>', () => {
		const map: Record<string, string> = {
			'ERRORS.EMAIL_INVALID': 'Please enter a valid email'
		}
		const t = (k: string) => {
			if (!(k in map)) throw new Error('missing')
			return map[k]!
		}
		expect(translateError(t, 'EMAIL_INVALID')).toBe('Please enter a valid email')
	})

	it('falls back to GENERAL when the specific key is missing', () => {
		const map: Record<string, string> = { 'ERRORS.GENERAL': 'Something went wrong' }
		const t = (k: string) => {
			if (!(k in map)) throw new Error('missing')
			return map[k]!
		}
		expect(translateError(t, 'UNKNOWN_KEY')).toBe('Something went wrong')
	})

	it('returns the original key as a last resort', () => {
		const t = () => {
			throw new Error('missing')
		}
		expect(translateError(t, 'UNKNOWN_KEY')).toBe('UNKNOWN_KEY')
	})
})
