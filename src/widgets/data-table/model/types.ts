import type {
	ColumnDef,
	ColumnFiltersState,
	Row,
	RowSelectionState,
	SortingState,
	Table,
	VisibilityState
} from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type DataTableToolbarProps<TData> = {
	table: Table<TData>
	config: DataTableConfig<TData>
	searchQuery: string
	setSearchQuery: (query: string) => void
	rowSelectionMode: boolean
	setRowSelectionMode: (mode: boolean) => void
	exportDialogOpen?: boolean
	setExportDialogOpen?: (open: boolean) => void
	selectedData?: TData[]
}

export type DataTableToolbarRenderProps = {
	searchQuery: string
	setSearchQuery: (query: string) => void
	rowSelectionMode: boolean
	setRowSelectionMode: (mode: boolean) => void
	setRowSelection: (selection: RowSelectionState) => void
}

export type DataTablePaginationProps<TData> = {
	table: Table<TData>
	config: DataTableConfig<TData>
}

export type FilterableColumn = {
	id: string
	title: string
	options: {
		value: string
		label: string
	}[]
}

export type DataTableLabels = {
	search?: string
	filter?: string
	columns?: string
	noResults?: string
	rowsPerPage?: string
	page?: string
	of?: string
	rowSelected?: string
	rowsSelected?: string
	actions?: string
	openMenu?: string
	clearAll?: string
	activeFilters?: string
	goToFirstPage?: string
	goToPreviousPage?: string
	goToNextPage?: string
	goToLastPage?: string
	selectAll?: string
	selectRow?: string
}

export type DataTableConfig<_TData> = {
	columns: ColumnDef<_TData>[]
	defaultPageSize?: number
	pageSizeOptions?: number[]
	defaultVisibility?: VisibilityState
	defaultSorting?: SortingState
	defaultFilters?: ColumnFiltersState

	/**
	 * When the widget owns its state (page, pageSize, sort, global search, column filters),
	 * mirror that state to the URL so the view is shareable/refreshable by default.
	 * Automatically skipped for tables driven by server-side `customProps.currentPage` —
	 * those features own URL state in their own hook.
	 * Set to false to opt out (e.g., when two DataTables share a page and would fight).
	 * @default true
	 */
	urlSync?: boolean

	enableRowSelection?: boolean
	enableColumnVisibility?: boolean
	enableFiltering?: boolean
	enableSorting?: boolean
	sortableColumns?: string[]

	header?: {
		title: string
		description?: string
	}

	labels?: DataTableLabels
	filterableColumns?: FilterableColumn[]

	onRowClick?: (row: Row<_TData>) => void
	rowClickUrl?: (row: Row<_TData>) => string
	highlightRow?: (row: Row<_TData>) => boolean | string
	onRowSelectionChange?: (selectedRows: _TData[], rowSelection: RowSelectionState) => void
	getRowId?: (row: _TData) => string
	getRowCanSelect?: (row: _TData) => boolean
	enableMultiRowSelection?: boolean
	initialRowSelection?: RowSelectionState

	customProps?: {
		rowSelectionMode?: boolean
		setRowSelectionMode?: (mode: boolean) => void
		currentPage?: number
		perPage?: number
		totalPages?: number
		totalItems?: number
		paginationLinks?: {
			first: string
			last: string
			previous: string | null
			next: string | null
		}
		onNextPage?: () => void
		onPrevPage?: () => void
		onFirstPage?: () => void
		onLastPage?: () => void
		onPageChange?: (page: number) => void
		onPerPageChange?: (perPage: number) => void
		onSearchChange?: (query: string) => void
		searchQuery?: string
		isLoading?: boolean
		error?: unknown
		sorting?: SortingState
		onSortingChange?: (updater: SortingState | ((old: SortingState) => SortingState)) => void
		[key: string]: unknown
	}

	renderToolbar?: (table: Table<_TData>, props: DataTableToolbarRenderProps) => ReactNode
	renderPagination?: (table: Table<_TData>) => ReactNode
	renderRowActions?: (row: Row<_TData>) => ReactNode
	renderNoResults?: () => ReactNode
	renderSelectedActions?: (
		rowSelection: RowSelectionState,
		data: _TData[],
		onClearSelection?: () => void,
		onExportRows?: () => void
	) => ReactNode
}

export type DataTableProps<TData> = {
	data: TData[]
	config: DataTableConfig<TData>
}
