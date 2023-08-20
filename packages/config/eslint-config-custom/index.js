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
  ignorePatterns: [
    'dist',
    'node_modules',
    '.eslintrc.cjs',
    '.prettierrc.cjs',
    'vite.config.ts',
    'svelte.config.js',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
  },
};
