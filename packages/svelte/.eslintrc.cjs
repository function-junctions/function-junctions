module.exports = {
  extends: ['custom', 'plugin:svelte/recommended'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2023,
    sourceType: 'module',
    extraFileExtensions: ['.svelte'],
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  rules: {
    'svelte/html-quotes': 'error',
    'svelte/mustache-spacing': 'error',
    'svelte/shorthand-attribute': 'error',
    'svelte/valid-compile': 'off',
  },
};
