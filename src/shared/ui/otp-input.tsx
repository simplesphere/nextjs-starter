'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
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
	const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

	const handleChange = (index: number, digit: string) => {
		if (!/^\d*$/.test(digit)) return

		const newValue = value.split('')
		newValue[index] = digit
		const updatedValue = newValue.join('').slice(0, length)
		onChange(updatedValue)

		if (digit && index < length - 1) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !value[index] && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()
		const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
		onChange(pastedData)
		if (pastedData.length === length) {
			inputRefs.current[length - 1]?.focus()
		} else if (pastedData.length > 0) {
			inputRefs.current[pastedData.length]?.focus()
		}
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
					maxLength={1}
					value={value[index] || ''}
					onChange={e => handleChange(index, e.target.value)}
					onKeyDown={e => handleKeyDown(index, e)}
					onPaste={handlePaste}
					disabled={disabled}
					className="h-12 w-12 text-center text-lg font-semibold"
					aria-label={t('DIGIT_ARIA_LABEL', { digit: index + 1 })}
				/>
			))}
		</div>
	)
}
