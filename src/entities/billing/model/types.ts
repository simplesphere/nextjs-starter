export type InvoiceStatus = 'PAID' | 'PENDING' | 'FAILED'
export type CardBrand = 'VISA' | 'MASTERCARD' | 'AMEX'

export interface BillingPlan {
	name: string
	priceCents: number
	currency: string
	billingPeriod: 'MONTHLY' | 'YEARLY'
	renewsOn: string
}

export interface UsageMetric {
	id: 'MEMBERS' | 'PROJECTS' | 'STORAGE'
	used: number
	limit: number
	unit?: string
}

export interface PaymentMethod {
	brand: CardBrand
	last4: string
	expiryMonth: number
	expiryYear: number
}

export interface Invoice {
	id: string
	number: string
	issuedOn: string
	amountCents: number
	currency: string
	status: InvoiceStatus
	description: string
}
