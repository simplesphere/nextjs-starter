export type AccountPlan = 'ENTERPRISE' | 'PRO' | 'FREE'

export interface Account {
	name: string
	plan: AccountPlan
}
