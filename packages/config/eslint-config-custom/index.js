module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-base',
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
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto' }
    ],
    '@typescript-eslint/lines-between-class-members': 0,
    'react/jsx-filename-extension': 0,
    'import/extensions': 0,
    'class-methods-use-this': 0,
    'import/no-cycle': 0,
  },
};
