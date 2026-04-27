'use client'

/* eslint-disable complexity */
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/select'
import type { DataTablePaginationProps } from '@/widgets/data-table/model/types'

/**
 * A pagination component for data tables that provides page navigation and page size selection.
 *
 * @param props - The data table pagination props
 * @param props.table - The TanStack Table instance that manages the table state
 * @param props.config - Configuration object containing pagination options
 *
 * @remarks
 * This component provides pagination controls with:
 * - Page size selection dropdown
 * - Page navigation buttons (first, previous, next, last)
 * - Current page indicator
 * - Responsive design that adapts to different screen sizes
 * - Integration with TanStack Table pagination state
 * - Customizable labels and page size options
 *
 * @example
 * ```tsx
 * <DataTablePagination
 *   table={table}
 *   config={{
 *     defaultPageSize: 10,
 *     pageSizeOptions: [10, 20, 50, 100],
 *     labels: {
 *       rowsPerPage: "Rows per page",
 *       page: "Page",
 *       of: "of",
 *       goToFirstPage: "Go to first page",
 *       goToPreviousPage: "Go to previous page",
 *       goToNextPage: "Go to next page",
 *       goToLastPage: "Go to last page"
 *     }
 *   }}
 * />
 * ```
 */
export function DataTablePagination<TData>({ table, config }: DataTablePaginationProps<TData>) {
	const t = useTranslations('WIDGETS.DATA_TABLE')
	const isLoading = config.customProps?.isLoading || false
	const defaultLabels = {
		rowsPerPage: t('ROWS_PER_PAGE'),
		page: t('PAGINATION.PAGE'),
		of: t('PAGINATION.OF'),
		goToFirstPage: t('PAGINATION.GO_TO_FIRST_PAGE'),
		goToPreviousPage: t('PAGINATION.GO_TO_PREVIOUS_PAGE'),
		goToNextPage: t('PAGINATION.GO_TO_NEXT_PAGE'),
		goToLastPage: t('PAGINATION.GO_TO_LAST_PAGE')
	}
	const labels = { ...defaultLabels, ...(config?.labels || {}) }
	const pageSizeOptions = config.pageSizeOptions || [10, 20, 30, 50]
	const isLinkBased = Boolean(config.customProps?.paginationLinks)
	const hasNextLink = Boolean(config.customProps?.paginationLinks?.next)
	const hasPrevLink = Boolean(config.customProps?.paginationLinks?.previous)

	const currentPage = table.getState().pagination.pageIndex + 1
	const pageCount = table.getPageCount()
	const [pageInput, setPageInput] = useState(String(currentPage))

	useEffect(() => {
		setPageInput(String(currentPage))
	}, [currentPage])

	const goToPage = (page: number) => {
		const clamped = Math.min(Math.max(page, 1), Math.max(pageCount, 1))
		if (clamped === currentPage) {
			return
		}
		if (config.customProps?.onPageChange) {
			config.customProps.onPageChange(clamped)
		} else {
			table.setPageIndex(clamped - 1)
		}
	}

	const commitPageInput = () => {
		const parsed = parseInt(pageInput, 10)
		if (Number.isFinite(parsed)) {
			goToPage(parsed)
		} else {
			setPageInput(String(currentPage))
		}
	}

	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex items-center gap-2">
				<Label htmlFor="rows-per-page" className="text-sm">
					{labels.rowsPerPage}
				</Label>
				<Select
					value={`${table.getState().pagination.pageSize}`}
					onValueChange={value => {
						const newPageSize = Number(value)
						table.setPageSize(newPageSize)
						if (config.customProps?.onPerPageChange) {
							config.customProps.onPerPageChange(newPageSize)
						}
					}}
					disabled={isLoading}
				>
					<SelectTrigger className="h-8 w-16" id="rows-per-page">
						<SelectValue placeholder={table.getState().pagination.pageSize} />
					</SelectTrigger>
					<SelectContent side="top">
						{pageSizeOptions.map(pageSize => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center gap-6">
				<div className="flex items-center gap-1.5 text-sm">
					<span>{labels.page}</span>
					{pageCount > 1 ? (
						<Input
							type="text"
							inputMode="numeric"
							pattern="[0-9]*"
							value={pageInput}
							onChange={e => setPageInput(e.target.value.replace(/[^0-9]/g, ''))}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									e.preventDefault()
									commitPageInput()
								}
							}}
							onBlur={commitPageInput}
							disabled={isLoading}
							aria-label={labels.page}
							className="field-sizing-content h-8 min-w-12 px-1.5 text-center tabular-nums"
						/>
					) : (
						<span className="tabular-nums">{currentPage}</span>
					)}
					<span>{labels.of}</span>
					<span className="tabular-nums">{pageCount}</span>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => {
							if (isLinkBased && config.customProps?.onFirstPage) {
								config.customProps.onFirstPage()
							} else {
								table.setPageIndex(0)
							}
						}}
						disabled={(isLinkBased ? !hasPrevLink : !table.getCanPreviousPage()) || isLoading}
					>
						<span className="sr-only">{labels.goToFirstPage}</span>
						<ChevronsLeftIcon className="size-3.5" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => {
							if (isLinkBased && config.customProps?.onPrevPage) {
								config.customProps.onPrevPage()
							} else {
								table.previousPage()
							}
						}}
						disabled={(isLinkBased ? !hasPrevLink : !table.getCanPreviousPage()) || isLoading}
					>
						<span className="sr-only">{labels.goToPreviousPage}</span>
						<ChevronLeftIcon className="size-3.5" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => {
							if (isLinkBased && config.customProps?.onNextPage) {
								config.customProps.onNextPage()
							} else {
								table.nextPage()
							}
						}}
						disabled={(isLinkBased ? !hasNextLink : !table.getCanNextPage()) || isLoading}
					>
						<span className="sr-only">{labels.goToNextPage}</span>
						<ChevronRightIcon className="size-3.5" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => {
							if (isLinkBased && config.customProps?.onLastPage) {
								config.customProps.onLastPage()
							} else {
								table.setPageIndex(table.getPageCount() - 1)
							}
						}}
						disabled={(isLinkBased ? !hasNextLink : !table.getCanNextPage()) || isLoading}
					>
						<span className="sr-only">{labels.goToLastPage}</span>
						<ChevronsRightIcon className="size-3.5" />
					</Button>
				</div>
			</div>
		</div>
	)
}
