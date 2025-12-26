import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

const eslintConfig = [
	{
		ignores: [
			'node_modules',
			'.next/**',
			'out/**',
			'build/**',
			'dist',
			'coverage',
			'next-env.d.ts',
			'.husky',
			'.vscode',
			'public/**',
			'src/shared/ui/**',
			'**/*._*',
			'**/.DS_Store'
		]
	},

	...nextCoreWebVitals,
	...nextTypescript,

	{
		plugins: {
			'unused-imports': unusedImports
		},
		rules: {
			'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
			'no-duplicate-imports': 'error',
			eqeqeq: 'error',
			'no-var': 'error',
			'prefer-const': 'error',
			'no-shadow': 'error',
			curly: 'error',
			'dot-notation': 'error',
			'no-else-return': 'error',
			complexity: ['warn', 25],
			'max-depth': ['warn', 4],
			'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: [
								'./*',
								'./**',
								'../*',
								'../**',
								'../../*',
								'../../**',
								'../../../*',
								'../../../**',
								'../../../../*',
								'../../../../**',
								'../../../../../*',
								'../../../../../**'
							],
							message: 'Use alias imports (@/*) instead of relative imports. Relative imports are not allowed.',
							allowTypeImports: false
						}
					]
				}
			],

			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'error',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			]
		}
	},

	prettier
]

export default eslintConfig
