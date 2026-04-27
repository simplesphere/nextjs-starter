'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { Download } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/shadcn/button'
import type { Invoice, InvoiceStatus } from '@/entities/billing'
import { DataTable, type DataTableConfig } from '@/widgets/data-table'

const STATUS_CLASS: Record<InvoiceStatus, string> = {
	PAID: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
	PENDING: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
	FAILED: 'bg-destructive/10 text-destructive'
}

interface InvoiceTableProps {
	invoices: Invoice[]
	locale: string
}

function formatCurrency(amountCents: number, currency: string, locale: string): string {
	return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amountCents / 100)
}

function formatDate(iso: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(iso))
}

export function InvoiceTable({ invoices, locale }: InvoiceTableProps) {
	const t = useTranslations('BILLING.INVOICES')

	const columns = useMemo<ColumnDef<Invoice>[]>(
		() => [
			{
				accessorKey: 'number',
				header: t('HEADERS.NUMBER'),
				cell: ({ row }) => <span className="font-medium">{row.original.number}</span>
			},
			{
				accessorKey: 'issuedOn',
				header: t('HEADERS.DATE'),
				cell: ({ row }) => formatDate(row.original.issuedOn, locale)
			},
			{
				accessorKey: 'description',
				header: t('HEADERS.DESCRIPTION'),
				cell: ({ row }) => row.original.description
			},
			{
				accessorKey: 'amountCents',
				header: () => <span className="block text-right">{t('HEADERS.AMOUNT')}</span>,
				cell: ({ row }) => (
					<span className="block text-right font-medium tabular-nums">
						{formatCurrency(row.original.amountCents, row.original.currency, locale)}
					</span>
				)
			},
			{
				accessorKey: 'status',
				header: t('HEADERS.STATUS'),
				cell: ({ row }) => (
					<span
						className={cn(
							'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
							STATUS_CLASS[row.original.status]
						)}
					>
						{t(`STATUS.${row.original.status}`)}
					</span>
				),
				filterFn: (row, _columnId, filterValue: string[]) =>
					!filterValue?.length || filterValue.includes(row.original.status)
			},
			{
				id: 'actions',
				header: () => <span className="sr-only">{t('HEADERS.DOWNLOAD')}</span>,
				cell: ({ row }) => (
					<div className="text-right">
						<Button
							size="sm"
							variant="ghost"
							aria-label={t('DOWNLOAD_ARIA', { number: row.original.number })}
							className="text-muted-foreground hover:text-foreground"
						>
							<Download className="size-4" />
						</Button>
					</div>
				),
				enableColumnFilter: false
			}
		],
		[t, locale]
	)

	const config = useMemo<DataTableConfig<Invoice>>(
		() => ({
			columns,
			defaultPageSize: 5,
			pageSizeOptions: [5, 10, 25, 50],
			enableSorting: true,
			enableFiltering: true,
			enableColumnVisibility: true,
			sortableColumns: ['issuedOn', 'amountCents', 'status'],
			filterableColumns: [
				{
					id: 'status',
					title: t('HEADERS.STATUS'),
					options: [
						{ value: 'PAID', label: t('STATUS.PAID') },
						{ value: 'PENDING', label: t('STATUS.PENDING') },
						{ value: 'FAILED', label: t('STATUS.FAILED') }
					]
				}
			],
			labels: {
				search: t('SEARCH_PLACEHOLDER'),
				noResults: t('NO_RESULTS')
			},
			getRowId: row => row.id,
			urlSync: false
		}),
		[columns, t]
	)

	return <DataTable<Invoice> data={invoices} config={config} />
}
