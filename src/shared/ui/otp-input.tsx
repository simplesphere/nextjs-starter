'use client'

import { useTranslations } from 'next-intl'
import { type ClipboardEvent, type KeyboardEvent, useRef } from 'react'
import { cn } from '@/shared/lib/utils'
import type { OtpInputProps } from '@/shared/types'
import { Input } from '@/shared/ui/shadcn/input'

/**
 * OTP input component with individual digit inputs.
 *
 * @param props - OTP input configuration
 * @param props.length - Number of OTP digits (default: 6)
 * @param props.value - Current OTP value
 * @param props.onChange - Callback when OTP value changes
 * @param props.disabled - Whether the input is disabled
 * @param props.className - Additional CSS classes
 * @returns The OTP input component
 *
 * @example
 * ```tsx
 * <OtpInput
 *   value={otp}
 *   onChange={setOtp}
 *   length={6}
 * />
 * ```
 */
export function OtpInput({ length = 6, value, onChange, disabled, className }: OtpInputProps) {
	const t = useTranslations('OTP_INPUT')
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	const setDigit = (index: number, digit: string) => {
		const chars = value.split('')
		chars[index] = digit
		return chars.join('').slice(0, length)
	}

	const focusCell = (index: number) => {
		const target = inputRefs.current[index]
		if (target) {
			target.focus()
			target.select()
		}
	}

	const handleChange = (index: number, raw: string) => {
		// Take only the last typed digit so overwriting a filled cell works as expected.
		const digit = raw.replace(/\D/g, '').slice(-1)
		if (!digit && !value[index]) return

		onChange(setDigit(index, digit))
		if (digit && index < length - 1) focusCell(index + 1)
	}

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace') {
			// Backspace clears the current cell if filled, otherwise clears+focuses the previous one.
			e.preventDefault()
			if (value[index]) {
				onChange(setDigit(index, ''))
			} else if (index > 0) {
				onChange(setDigit(index - 1, ''))
				focusCell(index - 1)
			}
			return
		}

		if (e.key === 'ArrowLeft' && index > 0) {
			e.preventDefault()
			focusCell(index - 1)
			return
		}

		if (e.key === 'ArrowRight' && index < length - 1) {
			e.preventDefault()
			focusCell(index + 1)
		}
	}

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()
		const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
		if (!pasted) return

		onChange(pasted)
		focusCell(Math.min(pasted.length, length - 1))
	}

	return (
		<div className={cn('flex gap-2', className)}>
			{Array.from({ length }).map((_, index) => (
				<Input
					key={index}
					ref={el => {
						inputRefs.current[index] = el
					}}
					type="text"
					inputMode="numeric"
					autoComplete="one-time-code"
					maxLength={1}
					value={value[index] ?? ''}
					onChange={e => handleChange(index, e.target.value)}
					onKeyDown={e => handleKeyDown(index, e)}
					onPaste={handlePaste}
					onFocus={e => e.currentTarget.select()}
					disabled={disabled}
					className="h-12 w-12 text-center text-lg font-semibold"
					aria-label={t('DIGIT_ARIA_LABEL', { digit: index + 1 })}
				/>
			))}
		</div>
	)
}
