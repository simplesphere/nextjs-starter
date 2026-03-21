'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Square } from 'lucide-react'
import { Button } from '@/shared/ui/shadcn/button'

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
		<div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-lg">
			<div className="text-center">
				<div className="font-mono text-6xl font-bold text-foreground">{formatTime(time)}</div>
				<p className="mt-2 text-sm text-muted-foreground">Stopwatch</p>
			</div>
			<div className="flex gap-3">
				{!isRunning ? (
					<Button onClick={handleStart} size="lg">
						<Play className="h-4 w-4" />
						Start
					</Button>
				) : (
					<Button onClick={handlePause} size="lg">
						<Pause className="h-4 w-4" />
						Pause
					</Button>
				)}
				<Button onClick={handleReset} variant="outline" size="lg" disabled={time === 0}>
					<Square className="h-4 w-4" />
					Reset
				</Button>
			</div>
		</div>
	)
}
