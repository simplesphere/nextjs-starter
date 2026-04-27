import type { BillingPlan, Invoice, PaymentMethod, UsageMetric } from '@/entities/billing/model/types'

/**
 * MOCK DATA - replace with the real billing lookup once persistence is wired
 * up (e.g. fetch from your billing provider for the current workspace).
 */
export const billingPlanData: BillingPlan = {
	name: 'Pro',
	priceCents: 2900,
	currency: 'USD',
	billingPeriod: 'MONTHLY',
	renewsOn: '2026-05-15'
}

export const usageData: UsageMetric[] = [
	{ id: 'MEMBERS', used: 7, limit: 25 },
	{ id: 'PROJECTS', used: 12, limit: 50 },
	{ id: 'STORAGE', used: 18, limit: 100, unit: 'GB' }
]

export const paymentMethodData: PaymentMethod = {
	brand: 'VISA',
	last4: '4242',
	expiryMonth: 12,
	expiryYear: 2028
}

export const invoiceData: Invoice[] = [
	{
		id: 'inv_001',
		number: 'INV-2026-0004',
		issuedOn: '2026-04-15',
		amountCents: 2900,
		currency: 'USD',
		status: 'PAID',
		description: 'Pro plan - April 2026'
	},
	{
		id: 'inv_002',
		number: 'INV-2026-0003',
		issuedOn: '2026-03-15',
		amountCents: 2900,
		currency: 'USD',
		status: 'PAID',
		description: 'Pro plan - March 2026'
	},
	{
		id: 'inv_003',
		number: 'INV-2026-0002',
		issuedOn: '2026-02-15',
		amountCents: 2900,
		currency: 'USD',
		status: 'PAID',
		description: 'Pro plan - February 2026'
	},
	{
		id: 'inv_004',
		number: 'INV-2026-0001',
		issuedOn: '2026-01-15',
		amountCents: 2900,
		currency: 'USD',
		status: 'PENDING',
		description: 'Pro plan - January 2026'
	},
	{
		id: 'inv_005',
		number: 'INV-2025-0012',
		issuedOn: '2025-12-15',
		amountCents: 2900,
		currency: 'USD',
		status: 'FAILED',
		description: 'Pro plan - December 2025'
	}
]
