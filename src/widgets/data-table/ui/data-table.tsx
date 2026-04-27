'use client'

/* eslint-disable complexity, max-lines, react-hooks/incompatible-library */
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type Row,
	type RowSelectionState,
	type SortingState,
	useReactTable,
	type VisibilityState
} from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { Checkbox } from '@/shared/ui/shadcn/checkbox'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/shadcn/table'
import type { DataTableProps } from '@/widgets/data-table/model/types'
import { DataTablePagination } from '@/widgets/data-table/ui/data-table-pagination'
import { DataTableToolbar } from '@/widgets/data-table/ui/data-table-toolbar'

const SKELETON_CELL_WIDTHS = ['w-[85%]', 'w-[55%]', 'w-[70%]', 'w-[45%]', 'w-[75%]', 'w-[60%]']

const URL_SYNC_RESERVED_KEYS = ['page', 'per_page', 'q', 'sort']
const URL_SYNC_FILTER_PREFIX = 'filter_'

function parseSortFromUrl(value: string | null): SortingState {
	if (!value) {
		return []
	}
	return value
		.split(',')
		.map(s => s.trim())
		.filter(Boolean)
		.map(s => (s.startsWith('-') ? { id: s.slice(1), desc: true } : { id: s, desc: false }))
}

function serializeSortForUrl(sorting: SortingState): string {
	return sorting.map(s => (s.desc ? '-' : '') + s.id).join(',')
}

function parseColumnFiltersFromUrl(params: URLSearchParams): ColumnFiltersState {
	const result: ColumnFiltersState = []
	params.forEach((value, key) => {
		if (!key.startsWith(URL_SYNC_FILTER_PREFIX)) {
			return
		}
		const id = key.slice(URL_SYNC_FILTER_PREFIX.length)
		const parts = value
			.split(',')
			.map(v => v.trim())
			.filter(v => v.length > 0)
		if (parts.length === 0) {
			return
		}
		result.push({ id, value: parts.length > 1 ? parts : parts[0] })
	})
	return result
}

function serializeColumnFiltersForUrl(filters: ColumnFiltersState): Array<[string, string]> {
	return filters
		.map<[string, string] | null>(f => {
			const raw = f.value
			let serialized: string
			if (Array.isArray(raw)) {
				serialized = raw.filter(v => v !== undefined && v !== null && v !== '').join(',')
			} else if (raw === undefined || raw === null || raw === '') {
				return null
			} else {
				serialized = String(raw)
			}
			if (!serialized) {
				return null
			}
			return [`${URL_SYNC_FILTER_PREFIX}${f.id}`, serialized]
		})
		.filter((entry): entry is [string, string] => entry !== null)
}

/**
 * A feature-rich data table component built on top of TanStack Table (React Table v8).
 * Provides comprehensive data management capabilities including sorting, filtering, pagination,
 * row selection, clickable rows, and row highlighting with customizable UI elements.
 *
 * @param {DataTableProps<TData>} props - The component props
 * @param {TData[]} props.data - Array of data objects to display in the table. Each object should match the column definitions.
 * @param {DataTableConfig<TData>} props.config - Configuration object that defines table behavior and appearance
 * @returns {JSX.Element} A fully featured data table with toolbar, pagination, optional row selection, clickable rows, and highlighting
 *
 * @example
 * \`\`\`tsx
 * <DataTable
 *   data={[
 *     { id: 1, name: "Product A", price: 99.99, status: "active" },
 *     { id: 2, name: "Product B", price: 149.99, status: "inactive" }
 *   ]}
 *   config={{
 *     columns: [
 *       { accessorKey: "name", header: "Product Name" },
 *       { accessorKey: "price", header: "Price" },
 *       { accessorKey: "status", header: "Status" }
 *     ],
 *     enableSorting: true,
 *     enableFiltering: true,
 *     enableRowSelection: true,
 *     enableColumnVisibility: true,
 *     defaultPageSize: 10,
 *     pageSizeOptions: [10, 20, 50, 100],
 *     sortableColumns: ["name", "price"],
 *     onRowClick: (row) => console.log("Row clicked:", row.original),
 *     rowClickUrl: (row) => `/products/${row.original.id}`,
 *     highlightRow: (row) => row.original.status === "error" ? "bg-red-50 border-red-200" : false,
 *     onRowSelectionChange: (selectedRows, rowSelection) => {
 *       console.log("Selected rows:", selectedRows)
 *       console.log("Row selection state:", rowSelection)
 *     },
 *     filterableColumns: [
 *       {
 *         id: "status",
 *         title: "Status",
 *         options: [
 *           { value: "active", label: "Active" },
 *           { value: "inactive", label: "Inactive" }
 *         ]
 *       }
 *     ],
 *     labels: {
 *       search: "Search products...",
 *       filter: "Filter",
 *       columns: "Columns",
 *       noResults: "No products found",
 *       selectAll: "Select all",
 *       selectRow: "Select row"
 *     }
 *   }}
 * />
 * \`\`\`
 */
export function DataTable<TData>({ data, config }: DataTableProps<TData>) {
	const t = useTranslations('WIDGETS.DATA_TABLE')
	const router = useRouter()
	const pathname = usePathname()
	const urlSearchParamsObj = useSearchParams()
	const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data])
	const safeColumns = Array.isArray(config.columns) ? config.columns : []

	const isServerSorting =
		config.customProps?.sorting !== undefined && typeof config.customProps?.onSortingChange === 'function'
	const isServerSidePagination = Boolean(
		config.customProps?.onPageChange || config.customProps?.onPerPageChange || config.customProps?.paginationLinks
	)
	// URL sync is automatic for widget-owned state. Skip when a feature hook already
	// owns pagination state (server-side mode) to avoid two writers racing for the URL.
	const urlSyncEnabled = config.urlSync !== false && !isServerSidePagination

	const defaultPageSize = config.defaultPageSize || 10

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(config.defaultVisibility || {})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
		urlSyncEnabled ? parseColumnFiltersFromUrl(urlSearchParamsObj) : config.defaultFilters || []
	)
	const [internalSorting, setInternalSorting] = useState<SortingState>(() =>
		urlSyncEnabled ? parseSortFromUrl(urlSearchParamsObj.get('sort')) : config.defaultSorting || []
	)
	const sorting = isServerSorting ? (config.customProps!.sorting as SortingState) : internalSorting
	const setSorting = isServerSorting ? config.customProps!.onSortingChange! : setInternalSorting
	const [pagination, setPagination] = useState(() => {
		if (isServerSidePagination) {
			return { pageIndex: (config.customProps?.currentPage || 1) - 1, pageSize: defaultPageSize }
		}
		if (urlSyncEnabled) {
			const urlPage = Number(urlSearchParamsObj.get('page'))
			const urlPerPage = Number(urlSearchParamsObj.get('per_page'))
			return {
				pageIndex: Number.isFinite(urlPage) && urlPage > 0 ? urlPage - 1 : 0,
				pageSize: Number.isFinite(urlPerPage) && urlPerPage > 0 ? urlPerPage : defaultPageSize
			}
		}
		return { pageIndex: 0, pageSize: defaultPageSize }
	})
	const [searchQuery, setSearchQuery] = useState(() => {
		if (config.customProps?.searchQuery !== undefined) {
			return config.customProps.searchQuery
		}
		return urlSyncEnabled ? urlSearchParamsObj.get('q') || '' : ''
	})
	const [rowSelectionMode, setRowSelectionMode] = useState(false)
	const [rowSelection, setRowSelection] = useState<RowSelectionState>(config.initialRowSelection ?? {})
	const [exportDialogOpen, setExportDialogOpen] = useState(false)
	const isLinkBasedPagination = Boolean(config.customProps?.paginationLinks)
	const [savedScrollPosition, setSavedScrollPosition] = useState<number | null>(null)

	const customRowSelectionMode = config.customProps?.rowSelectionMode ?? rowSelectionMode
	const setRowSelectionModeState = (mode: boolean) => {
		if (typeof config.customProps?.setRowSelectionMode === 'function') {
			config.customProps.setRowSelectionMode(mode)
		} else {
			setRowSelectionMode(mode)
		}
	}

	const filteredData = useMemo(() => {
		if (isServerSidePagination) {
			return safeData
		}

		if (!searchQuery) {
			return safeData
		}

		return safeData.filter(item => {
			if (!item) {
				return false
			}
			return Object.values(item as Record<string, unknown>).some(value => {
				if (typeof value === 'string') {
					return value.toLowerCase().includes(searchQuery.toLowerCase())
				}
				if (typeof value === 'number') {
					return value.toString().includes(searchQuery)
				}
				return false
			})
		})
	}, [safeData, searchQuery, isServerSidePagination])

	const isSingleRowSelection = config.enableMultiRowSelection === false

	const selectColumn: ColumnDef<TData> = {
		id: 'select',
		header: ({ table }) =>
			isSingleRowSelection ? (
				<span className="sr-only">{config.labels?.selectRow || t('SELECT_ROW')}</span>
			) : (
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
					onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
					onClick={e => e.stopPropagation()}
					aria-label={config.labels?.selectAll || t('SELECT_ALL')}
				/>
			),
		cell: ({ row }) => (
			<div onClick={e => e.stopPropagation()} className="flex items-center">
				{isSingleRowSelection ? (
					<button
						type="button"
						role="radio"
						aria-checked={row.getIsSelected()}
						disabled={!row.getCanSelect()}
						onClick={() => row.getCanSelect() && row.toggleSelected(true)}
						aria-label={config.labels?.selectRow || t('SELECT_ROW')}
						className={cn(
							'relative flex size-4 shrink-0 items-center justify-center rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
							row.getIsSelected() ? 'border-primary bg-primary' : 'border-input bg-background hover:border-primary/50',
							!row.getCanSelect() && 'cursor-not-allowed opacity-50'
						)}
					>
						{row.getIsSelected() && <span className="size-2 rounded-full bg-primary-foreground" aria-hidden />}
					</button>
				) : (
					<Checkbox
						checked={row.getIsSelected()}
						disabled={!row.getCanSelect()}
						onCheckedChange={value => row.toggleSelected(!!value)}
						onClick={e => e.stopPropagation()}
						aria-label={config.labels?.selectRow || t('SELECT_ROW')}
					/>
				)}
			</div>
		),
		enableSorting: false,
		enableHiding: false
	}

	const columnsWithSelection = [selectColumn, ...safeColumns]

	useEffect(() => {
		if (customRowSelectionMode) {
			setColumnVisibility(prev => ({ ...prev, select: true }))
		} else {
			setColumnVisibility(prev => ({ ...prev, select: false }))
			setRowSelection({})
		}
	}, [customRowSelectionMode])

	useEffect(() => {
		if (config.initialRowSelection) {
			setRowSelection(config.initialRowSelection)
		}
	}, [config.initialRowSelection])

	const table = useReactTable({
		data: filteredData,
		columns: columnsWithSelection.map(column => ({
			...column,
			enableSorting: config.enableSorting
				? config.sortableColumns
					? config.sortableColumns.includes(column.id || '')
					: true
				: false
		})),
		state: {
			sorting,
			columnVisibility,
			columnFilters,
			pagination,
			rowSelection
		},
		enableRowSelection:
			customRowSelectionMode && config.getRowCanSelect
				? (row: Row<TData>) => config.getRowCanSelect!(row.original as TData)
				: Boolean(customRowSelectionMode),
		enableMultiRowSelection: config.enableMultiRowSelection ?? true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getRowId: config.getRowId ? row => config.getRowId?.(row as TData) ?? String(row) : undefined,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: isServerSidePagination ? undefined : getFilteredRowModel(),
		getPaginationRowModel: isServerSidePagination ? undefined : getPaginationRowModel(),
		getSortedRowModel: isServerSorting ? undefined : getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		...(isServerSidePagination && {
			pageCount: (config.customProps?.totalPages || 1) as number,
			manualPagination: true
		}),
		...(isServerSorting && { manualSorting: true })
	})

	useEffect(() => {
		if (isLinkBasedPagination && config.customProps?.currentPage) {
			const serverPageIndex = config.customProps.currentPage - 1
			if (serverPageIndex !== pagination.pageIndex) {
				setPagination(prev => ({ ...prev, pageIndex: serverPageIndex }))
			}
		}
	}, [isLinkBasedPagination, config.customProps?.currentPage, pagination.pageIndex])

	useEffect(() => {
		if (isLinkBasedPagination && config.customProps?.perPage !== undefined && config.customProps?.perPage !== null) {
			const serverPageSize = config.customProps.perPage
			if (serverPageSize !== pagination.pageSize) {
				setPagination(prev => ({ ...prev, pageSize: serverPageSize }))
			}
		}
	}, [isLinkBasedPagination, config.customProps?.perPage, pagination.pageSize])

	useEffect(() => {
		if (config.onRowSelectionChange && Object.keys(rowSelection).length > 0) {
			const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original)
			config.onRowSelectionChange(selectedRows, rowSelection)
		}
	}, [rowSelection, config, table])

	useEffect(() => {
		const isLoading = config.customProps?.isLoading || false

		if (isLinkBasedPagination) {
			if (isLoading && savedScrollPosition === null) {
				setSavedScrollPosition(window.scrollY)
			} else if (!isLoading && savedScrollPosition !== null) {
				const currentScrollY = window.scrollY
				const scrollDifference = Math.abs(currentScrollY - savedScrollPosition)

				if (scrollDifference < 50) {
					requestAnimationFrame(() => {
						window.scrollTo({ top: savedScrollPosition, behavior: 'instant' })
					})
				}
				setSavedScrollPosition(null)
			}
		}
	}, [isLinkBasedPagination, config.customProps?.isLoading, savedScrollPosition])

	// Mirror widget-owned state into the URL so pagination/search/sort/filters are
	// shareable and restorable. Uses window.history.replaceState to avoid an RSC
	// round-trip; useSearchParams (Next.js 14+) picks up the change natively.
	useEffect(() => {
		if (!urlSyncEnabled || typeof window === 'undefined') {
			return
		}

		const next = new URLSearchParams(urlSearchParamsObj.toString())
		const toDrop: string[] = []
		next.forEach((_, key) => {
			if (URL_SYNC_RESERVED_KEYS.includes(key) || key.startsWith(URL_SYNC_FILTER_PREFIX)) {
				toDrop.push(key)
			}
		})
		toDrop.forEach(key => next.delete(key))

		if (pagination.pageIndex > 0) {
			next.set('page', String(pagination.pageIndex + 1))
		}
		if (pagination.pageSize !== defaultPageSize) {
			next.set('per_page', String(pagination.pageSize))
		}
		const trimmedSearch = searchQuery.trim()
		if (trimmedSearch) {
			next.set('q', trimmedSearch)
		}
		if (sorting.length > 0) {
			next.set('sort', serializeSortForUrl(sorting))
		}
		serializeColumnFiltersForUrl(columnFilters).forEach(([key, value]) => {
			next.set(key, value)
		})

		const qs = next.toString()
		const nextUrl = qs ? `${pathname}?${qs}` : pathname
		const currentUrl = `${window.location.pathname}${window.location.search}`
		if (currentUrl !== nextUrl) {
			window.history.replaceState(null, '', nextUrl)
		}
	}, [
		urlSyncEnabled,
		pathname,
		urlSearchParamsObj,
		pagination.pageIndex,
		pagination.pageSize,
		defaultPageSize,
		searchQuery,
		sorting,
		columnFilters
	])

	const handleRowClick = (row: Row<TData>) => {
		if (config.onRowClick) {
			config.onRowClick(row)
		} else if (config.rowClickUrl) {
			const url = config.rowClickUrl(row)
			router.push(url)
		}
	}

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
		if (
			isServerSidePagination &&
			config.customProps?.onSearchChange &&
			typeof config.customProps.onSearchChange === 'function'
		) {
			config.customProps.onSearchChange(query)
		}
	}

	const displaySearchQuery =
		config.customProps?.searchQuery !== undefined ? config.customProps.searchQuery : searchQuery

	const isRowClickable = Boolean(config.onRowClick || config.rowClickUrl)

	const getRowHighlight = (row: Row<TData>) => {
		if (!config.highlightRow) {
			return ''
		}
		const result = config.highlightRow(row)
		if (typeof result === 'string') {
			return result
		}
		if (result === true) {
			return 'bg-muted/50'
		}
		return ''
	}

	return (
		<div className="flex w-full flex-col justify-start gap-4">
			{config.header?.title && (
				<header className="gap-1.5">
					{config.header?.title && <h2 className="text-lg font-semibold">{config.header.title}</h2>}
					{config.header?.description && <p className="text-muted-foreground">{config.header.description}</p>}
				</header>
			)}
			{config.renderToolbar ? (
				config.renderToolbar(table, {
					searchQuery: displaySearchQuery,
					setSearchQuery: handleSearchChange,
					rowSelectionMode: Boolean(customRowSelectionMode),
					setRowSelectionMode: setRowSelectionModeState,
					setRowSelection
				})
			) : (
				<DataTableToolbar
					table={table}
					config={config}
					searchQuery={displaySearchQuery}
					setSearchQuery={handleSearchChange}
					rowSelectionMode={Boolean(customRowSelectionMode)}
					setRowSelectionMode={setRowSelectionModeState}
					exportDialogOpen={exportDialogOpen}
					setExportDialogOpen={setExportDialogOpen}
					selectedData={
						customRowSelectionMode ? table.getFilteredSelectedRowModel().rows.map(row => row.original) : undefined
					}
				/>
			)}

			{customRowSelectionMode &&
				Object.keys(rowSelection).length > 0 &&
				config.renderSelectedActions?.(
					rowSelection,
					data,
					() => setRowSelection({}),
					() => setExportDialogOpen(true)
				)}

			<div className="relative flex flex-col gap-4 overflow-auto">
				<div className="rounded-md border">
					<Table>
						<TableHeader className="bg-muted/50">
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id} className="hover:bg-muted/50">
									{headerGroup.headers.map(header => {
										const sortDirection = header.column.getIsSorted()
										const ariaSort = sortDirection
											? sortDirection === 'asc'
												? 'ascending'
												: 'descending'
											: header.column.getCanSort()
												? 'none'
												: undefined
										return (
											<TableHead key={header.id} colSpan={header.colSpan} aria-sort={ariaSort} className="py-1.5">
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody className="text-muted-foreground">
							{config.customProps?.isLoading ? (
								Array.from({ length: table.getState().pagination.pageSize }).map((_, rowIdx) => (
									<TableRow key={`skeleton-row-${rowIdx}`} className="hover:bg-transparent">
										{table.getVisibleLeafColumns().map((column, colIdx) => (
											<TableCell key={`skeleton-cell-${rowIdx}-${column.id}`} className="font-normal">
												<Skeleton
													className={cn(
														'h-4',
														column.id === 'select'
															? 'h-4 w-4 rounded-sm'
															: SKELETON_CELL_WIDTHS[(rowIdx + colIdx) % SKELETON_CELL_WIDTHS.length]
													)}
												/>
											</TableCell>
										))}
									</TableRow>
								))
							) : table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map(row => (
									<TableRow
										key={row.id}
										className={cn(isRowClickable && 'cursor-pointer hover:bg-muted/50', getRowHighlight(row))}
										onClick={isRowClickable ? () => handleRowClick(row) : undefined}
									>
										{row.getVisibleCells().map(cell => (
											<TableCell key={cell.id} className="font-normal">
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow className="hover:bg-transparent">
									<TableCell colSpan={columnsWithSelection.length} className="h-32 text-center align-middle">
										{config.renderNoResults ? config.renderNoResults() : t('NO_RESULTS_FOUND')}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				{config.renderPagination ? (
					config.renderPagination(table)
				) : (
					<DataTablePagination table={table} config={config} />
				)}
			</div>
		</div>
	)
}
