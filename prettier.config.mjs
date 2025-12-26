/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
	arrowParens: 'avoid',
	bracketSameLine: false,
	bracketSpacing: true,
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	jsxSingleQuote: false,
	printWidth: 120,
	proseWrap: 'always',
	quoteProps: 'as-needed',
	requirePragma: false,
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'none',
	useTabs: true,
	importOrder: [
		'^(react/(.*)$)|^(react$)',
		'^(next/(.*)$)|^(next$)',
		'^lucide-react$',
		'<BUILTIN_MODULES>',
		'<TYPES>^(node:)',
		'<TYPES>',
		'^@/(shared|features)/(.*)$',
		'^@(assets|config|constants|components|ui|lib|providers|types|utils)/(.*)$',
		'^@/(.*)$',
		'^[./]'
	],
	importOrderCaseInsensitive: true,
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
	tailwindStylesheet: './src/app/globals.css',
	plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: ['*.json', '*.yml'],
			options: {
				tabWidth: 2
			}
		},
		{
			files: ['*.md'],
			options: {
				proseWrap: 'always'
			}
		}
	]
}

export default prettierConfig
