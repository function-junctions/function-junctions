module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base',
    'turbo',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js', 'node_modules'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
  },
};
