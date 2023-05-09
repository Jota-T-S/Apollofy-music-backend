module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
};
