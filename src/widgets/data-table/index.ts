/**
 * Data Table Widget
 *
 * A comprehensive data table component with sorting, filtering, pagination,
 * and column management capabilities.
 *
 * Features:
 * - Sortable columns with multi-sort support
 * - Advanced filtering with multiple filter types
 * - Pagination with configurable page sizes
 * - Column visibility toggle
 * - Row selection with bulk actions
 * - Export functionality
 * - Responsive design
 *
 * @example
 * ```tsx
 * import { DataTable } from '@/widgets/data-table'
 *
 * <DataTable
 *   data={users}
 *   columns={userColumns}
 *   config={{
 *     enableSorting: true,
 *     enableFiltering: true,
 *     enablePagination: true
 *   }}
 * />
 * ```
 */
import type { DataTableConfig, DataTableProps } from '@/widgets/data-table/model/types'
import { DataTable } from '@/widgets/data-table/ui/data-table'
import {
	DataTableSimpleToolbar,
	type DataTableSimpleToolbarProps
} from '@/widgets/data-table/ui/data-table-simple-toolbar'

export { DataTable, DataTableSimpleToolbar }
export type { DataTableConfig, DataTableProps, DataTableSimpleToolbarProps }
