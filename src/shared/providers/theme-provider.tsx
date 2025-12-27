'use client'

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

/**
 * Theme provider component that wraps the application with theme context.
 *
 * @param props - Theme provider props
 * @param props.children - Child components
 * @param props.attribute - HTML attribute to apply theme class (default: 'class')
 * @param props.defaultTheme - Default theme (default: 'system')
 * @param props.enableSystem - Enable system theme detection (default: true)
 * @param props.disableTransitionOnChange - Disable transitions on theme change (default: false)
 * @returns The theme provider component
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
