module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: [
		'standard-with-typescript',
		'plugin:prettier/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {}
};
