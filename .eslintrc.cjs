module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    indent: 'off',
    semi: [2, 'never'],
    quotes: [1, 'single'],
    'no-trailing-spaces': ['error'],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'space-infix-ops': ['error', { int32Hint: false }],
  },
}
