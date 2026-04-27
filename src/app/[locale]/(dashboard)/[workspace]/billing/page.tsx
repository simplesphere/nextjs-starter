import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { CreditCard, FolderOpen, HardDrive, Users } from 'lucide-react'
import { createPageMetadata } from '@/shared/lib/metadata'
import type { WorkspaceMetadataProps, WorkspacePageProps } from '@/shared/types'
import { CardBlock, StatsCard } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn/button'
import { InvoiceTable } from '@/app/[locale]/(dashboard)/[workspace]/billing/invoice-table'
import { billingPlanData, invoiceData, paymentMethodData, usageData, type UsageMetric } from '@/entities/billing'
import { getWorkspaceBySlug } from '@/entities/workspace'
import { type DashboardBreadcrumb, DashboardPageWrapper } from '@/widgets/sidebar'

export async function generateMetadata(
	{ params }: WorkspaceMetadataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { locale, workspace } = await params
	return createPageMetadata('METADATA.BILLING', locale, parent, { path: `/${workspace}/billing` })
}

function formatCurrency(amountCents: number, currency: string, locale: string): string {
	return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amountCents / 100)
}

function formatDate(iso: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(iso))
}

const USAGE_ICONS: Record<UsageMetric['id'], ReactNode> = {
	MEMBERS: <Users className="size-4" />,
	PROJECTS: <FolderOpen className="size-4" />,
	STORAGE: <HardDrive className="size-4" />
}

function formatUsageValue(metric: UsageMetric): string {
	const unit = metric.unit ? ` ${metric.unit}` : ''
	return `${metric.used}${unit} / ${metric.limit}${unit}`
}

export default async function BillingPage({ params }: WorkspacePageProps) {
	const { locale, workspace: workspaceSlug } = await params
	if (!getWorkspaceBySlug(workspaceSlug)) notFound()

	const t = await getTranslations('BILLING')

	const breadcrumbs: DashboardBreadcrumb[] = [
		{
			id: 'billing',
			icon: 'CreditCard',
			title: t('TITLE'),
			'data-testid': 'breadcrumb-billing'
		}
	]

	const planPrice = formatCurrency(billingPlanData.priceCents, billingPlanData.currency, locale)
	const renewsOn = formatDate(billingPlanData.renewsOn, locale)

	return (
		<DashboardPageWrapper
			breadcrumbs={breadcrumbs}
			pageHeader={{ headline: t('TITLE'), subheadline: t('DESCRIPTION') }}
		>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{usageData.map(metric => (
					<StatsCard
						key={metric.id}
						title={t(`USAGE.METRICS.${metric.id}`)}
						value={formatUsageValue(metric)}
						icon={USAGE_ICONS[metric.id]}
					/>
				))}
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<CardBlock
					title={t('PLAN.TITLE')}
					subtitle={t('PLAN.SUBTITLE')}
					rightContent={<Button size="sm">{t('PLAN.MANAGE')}</Button>}
				>
					<div className="space-y-4">
						<div className="flex items-baseline gap-2">
							<span className="text-3xl font-semibold tracking-tight">{planPrice}</span>
							<span className="text-sm text-muted-foreground">{t(`PLAN.PERIOD.${billingPlanData.billingPeriod}`)}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span className="font-medium text-foreground">{billingPlanData.name}</span>
							<span aria-hidden>·</span>
							<span>{t('PLAN.RENEWS_ON', { date: renewsOn })}</span>
						</div>
					</div>
				</CardBlock>

				<CardBlock
					title={t('PAYMENT_METHOD.TITLE')}
					subtitle={t('PAYMENT_METHOD.SUBTITLE')}
					rightContent={
						<Button size="sm" variant="outline">
							{t('PAYMENT_METHOD.UPDATE')}
						</Button>
					}
				>
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
							<CreditCard className="size-5" />
						</div>
						<div className="space-y-0.5">
							<p className="text-sm font-medium">
								{t(`PAYMENT_METHOD.BRAND.${paymentMethodData.brand}`)}
								<span className="ml-1 text-muted-foreground">•••• {paymentMethodData.last4}</span>
							</p>
							<p className="text-xs text-muted-foreground">
								{t('PAYMENT_METHOD.EXPIRES', {
									month: String(paymentMethodData.expiryMonth).padStart(2, '0'),
									year: String(paymentMethodData.expiryYear).slice(-2)
								})}
							</p>
						</div>
					</div>
				</CardBlock>
			</div>

			<CardBlock title={t('INVOICES.TITLE')} subtitle={t('INVOICES.SUBTITLE')}>
				<InvoiceTable invoices={invoiceData} locale={locale} />
			</CardBlock>
		</DashboardPageWrapper>
	)
}
