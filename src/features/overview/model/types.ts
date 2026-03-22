import type { ReactNode } from 'react'

export interface OverviewStatItem {
	title: string
	value: string | number
	icon: ReactNode
	tooltip?: string
}
