const lintStageConfig = {
	'*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
	'*.css': ['prettier --write'],
	'*.{json,md}': ['prettier --write'],
}

export default lintStageConfig
