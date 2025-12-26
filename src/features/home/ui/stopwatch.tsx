'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Square } from 'lucide-react'

/**
 * Stopwatch component with start, pause, and reset functionality.
 *
 * @returns The stopwatch component
 *
 * @example
 * ```tsx
 * <Stopwatch />
 * ```
 */
export function Stopwatch() {
	const [time, setTime] = useState(0)
	const [isRunning, setIsRunning] = useState(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (isRunning) {
			intervalRef.current = setInterval(() => {
				setTime(prev => prev + 10)
			}, 10)
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isRunning])

	const handleStart = () => {
		setIsRunning(true)
	}

	const handlePause = () => {
		setIsRunning(false)
	}

	const handleReset = () => {
		setIsRunning(false)
		setTime(0)
	}

	const formatTime = (milliseconds: number) => {
		const totalSeconds = Math.floor(milliseconds / 1000)
		const minutes = Math.floor(totalSeconds / 60)
		const seconds = totalSeconds % 60
		const centiseconds = Math.floor((milliseconds % 1000) / 10)

		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
	}

	return (
		<div className="flex flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
			<div className="text-center">
				<div className="font-mono text-6xl font-bold text-zinc-900 dark:text-zinc-50">{formatTime(time)}</div>
				<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Stopwatch</p>
			</div>
			<div className="flex gap-3">
				{!isRunning ? (
					<button
						onClick={handleStart}
						className="flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
					>
						<Play className="h-4 w-4" />
						Start
					</button>
				) : (
					<button
						onClick={handlePause}
						className="flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
					>
						<Pause className="h-4 w-4" />
						Pause
					</button>
				)}
				<button
					onClick={handleReset}
					disabled={time === 0}
					className="flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
				>
					<Square className="h-4 w-4" />
					Reset
				</button>
			</div>
		</div>
	)
}
