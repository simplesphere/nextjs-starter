'use client'

/* eslint-disable complexity */
import { useTranslations } from 'next-intl'
import { Columns3, MoreHorizontal, Search as SearchIcon, SlidersHorizontal, X as XIcon } from 'lucide-react'
import { Badge } from '@/shared/ui/shadcn/badge'
import { Button } from '@/shared/ui/shadcn/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/shadcn/dropdown-menu'
import { Input } from '@/shared/ui/shadcn/input'
import type { DataTableToolbarProps } from '@/widgets/data-table/model/types'

/**
 * Toolbar component for the data table widget. Provides search, faceted column
 * filtering, column visibility, and an overflow menu for row-selection mode and
 * filter management. Drop-in default rendered by DataTable when no
 * `renderToolbar` is supplied.
 *
 * Export is intentionally not wired up here. Plug your own export flow in via
 * `config.renderToolbar` if you need it.
 */
export function DataTableToolbar<TData>({
	table,
	config,
	searchQuery,
	setSearchQuery,
	rowSelectionMode,
	setRowSelectionMode
}: DataTableToolbarProps<TData>) {
	const t = useTranslations('WIDGETS.DATA_TABLE')
	const isLoading = config.customProps?.isLoading || false
	const defaultLabels = {
		filter: t('FILTER'),
		columns: t('COLUMNS'),
		openMenu: t('ACTIONS.OPEN_MENU'),
		clearAll: t('CLEAR_ALL'),
		activeFilters: t('ACTIVE_FILTERS')
	}
	const labels = { ...defaultLabels, ...(config?.labels || {}) }
	const customProps = config?.customProps || {}

	const rowSelectionModeState =
		customProps.rowSelectionMode !== undefined ? customProps.rowSelectionMode : rowSelectionMode

	const setRowSelectionModeState = customProps.setRowSelectionMode || setRowSelectionMode

	const activeFilters = table.getState().columnFilters.flatMap(filter => {
		const column = table.getColumn(filter.id)
		if (!column || !filter.value) return []

		const filterConfig = config?.filterableColumns?.find(col => col.id === filter.id)
		if (!filterConfig) return []

		const values = Array.isArray(filter.value) ? filter.value : [filter.value]
		return values.map(value => {
			const option = filterConfig.options.find(opt => opt.value === value)
			return {
				id: filter.id,
				value,
				label: option?.label || value,
				title: filterConfig.title
			}
		})
	})

	const addFilter = (columnId: string, value: string) => {
		const column = table.getColumn(columnId)
		if (!column) return
		const currentFilters = (column.getFilterValue() as string[]) || []
		if (!currentFilters.includes(value)) {
			column.setFilterValue([...currentFilters, value])
		}
	}

	const removeFilter = (columnId: string, value: string) => {
		const column = table.getColumn(columnId)
		if (!column) return
		const currentFilters = (column.getFilterValue() as string[]) || []
		column.setFilterValue(currentFilters.filter(item => item !== value))
	}

	const clearAllFilters = () => {
		table.resetColumnFilters()
	}

	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="relative w-full sm:max-w-xs">
				<SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					placeholder={labels.search || t('SEARCH')}
					className="w-full pl-9"
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					disabled={isLoading}
				/>
			</div>
			<div className="flex items-center gap-2">
				{config?.filterableColumns && config.filterableColumns.length > 0 && (
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-8 gap-1.5" />}>
							<SlidersHorizontal className="size-3.5" />
							{labels.filter}
							{activeFilters.length > 0 && (
								<Badge variant="secondary" className="ml-1 rounded-full px-1">
									{activeFilters.length}
								</Badge>
							)}
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-[180px] p-2">
							{config.filterableColumns.map(column => (
								<DropdownMenuGroup key={column.id}>
									<DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
										{column.title}
									</DropdownMenuLabel>
									{column.options.map(option => {
										const isActive = activeFilters.some(
											filter => filter.id === column.id && filter.value === option.value
										)
										return (
											<DropdownMenuItem
												key={option.value}
												className="flex cursor-pointer items-center gap-2 px-2 py-1.5"
												onSelect={e => {
													e.preventDefault()
													if (isActive) {
														removeFilter(column.id, option.value)
													} else {
														addFilter(column.id, option.value)
													}
												}}
											>
												<div className="flex size-4 items-center justify-center">
													{isActive && <span className="text-xs">✓</span>}
												</div>
												<span>{option.label}</span>
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuGroup>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}

				{config?.enableColumnVisibility && (
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-8 gap-1.5" />}>
							<Columns3 className="size-3.5" />
							{labels.columns}
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
										onCheckedChange={value => column.toggleVisibility(!!value)}
									>
										<span>{column.id}</span>
									</DropdownMenuCheckboxItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}

				{(config?.enableRowSelection || activeFilters.length > 0) && (
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-8 w-8 p-0" />}>
							<MoreHorizontal className="size-3.5" />
							<span className="sr-only">{labels.openMenu}</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-[180px] p-2">
							{config?.enableRowSelection && (
								<DropdownMenuItem
									className="flex cursor-pointer items-center px-2 py-1.5"
									onSelect={e => {
										e.preventDefault()
										setRowSelectionModeState(!rowSelectionModeState)
									}}
								>
									{rowSelectionModeState ? t('DROPDOWN.CANCEL_SELECTION') : t('DROPDOWN.SELECT_RECORDS')}
								</DropdownMenuItem>
							)}

							{activeFilters.length > 0 && (
								<>
									{config?.enableRowSelection && <DropdownMenuSeparator />}
									<DropdownMenuGroup>
										<DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium">
											{labels.activeFilters}
										</DropdownMenuLabel>
									</DropdownMenuGroup>
									{activeFilters.map(filter => (
										<DropdownMenuItem
											key={`${filter.id}-${filter.value}`}
											className="flex cursor-pointer items-center justify-between px-2 py-1.5"
											onSelect={e => {
												e.preventDefault()
												removeFilter(filter.id, filter.value)
											}}
										>
											<div className="flex items-center gap-2">
												<span className="text-xs font-medium">{filter.title}:</span>
												<span className="text-xs">{filter.label}</span>
											</div>
											<XIcon className="size-3.5" />
										</DropdownMenuItem>
									))}
									<DropdownMenuItem
										className="flex cursor-pointer items-center gap-2 px-2 py-1.5"
										onSelect={e => {
											e.preventDefault()
											clearAllFilters()
										}}
									>
										<XIcon className="size-4" />
										{labels.clearAll}
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	)
}
