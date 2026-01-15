export interface NavigationItem {
	href: string
	label: string
}

export interface NavigationCategory {
	title: string
	items: NavigationItem[]
}

export interface NavigationData {
	categories: NavigationCategory[]
	standalonePages: NavigationItem[]
}
