module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'turbo',
    'prettier'
    ],
  plugins: ['import', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
  },
};
