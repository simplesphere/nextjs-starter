'use client'

import type { Table as TanStackTable } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { ColumnsIcon, Filter, SearchIcon } from 'lucide-react'
import { Button } from '@/shared/ui/shadcn/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/shared/ui/shadcn/dropdown-menu'
import { Input } from '@/shared/ui/shadcn/input'

export interface DataTableSimpleToolbarProps<TData> {
	searchPlaceholder: string
	searchValue: string
	onSearchChange?: (value: string) => void
	isLoading?: boolean
	filterLabel: string
	onOpenFilters: () => void
	filterCount?: number
	columnsLabel: string
	table: TanStackTable<TData>
	afterSearchSlot?: ReactNode
	endSlot?: ReactNode
}

/**
 * Lightweight toolbar variant for data tables that only need search, filter,
 * and column visibility controls. Use the full `DataTableToolbar` when export
 * and bulk-action dropdowns are required.
 */
export function DataTableSimpleToolbar<TData>({
	searchPlaceholder,
	searchValue,
	onSearchChange,
	isLoading,
	filterLabel,
	onOpenFilters,
	filterCount,
	columnsLabel,
	table,
	afterSearchSlot,
	endSlot
}: DataTableSimpleToolbarProps<TData>) {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
				<div className="relative w-full sm:max-w-xs">
					<SearchIcon className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder={searchPlaceholder}
						className="w-full pl-8"
						value={searchValue}
						onChange={e => onSearchChange?.(e.target.value)}
						disabled={isLoading}
					/>
				</div>
				{afterSearchSlot}
			</div>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" className="h-8" onClick={onOpenFilters}>
					<Filter className="h-4 w-4" />
					{filterLabel}
					{filterCount && filterCount > 0 ? (
						<span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
							{filterCount}
						</span>
					) : null}
				</Button>
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm" className="h-8">
							<ColumnsIcon className="h-4 w-4" />
							{columnsLabel}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-[180px] p-2">
						{table
							.getAllLeafColumns()
							.filter(column => column.getCanHide())
							.map(column => (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="cursor-pointer"
									checked={column.getIsVisible()}
									onCheckedChange={value => column.toggleVisibility(value)}
								>
									<span>{column.id}</span>
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
				{endSlot}
			</div>
		</div>
	)
}
