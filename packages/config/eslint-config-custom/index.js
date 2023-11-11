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
    'no-console': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'operator-linebreak': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['..*'],
            message: 'Relative parent imports aren\'t allowed',
          },
          {
            group: ['@/*/*/*'],
            message: 'Don\'t reach that deep, re-export with index.ts instead',
          },
        ],
      },
    ],
  },
};
