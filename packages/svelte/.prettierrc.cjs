const prettierConfig = require('prettier-plugin-custom');

module.exports = {
  ...prettierConfig,
  svelteSortOrder: 'options-styles-scripts-markup',
  svelteBracketNewLine: true,
  svelteAllowShorthand: true,
  svelteIndentScriptAndStyle: true,
  plugins: ['prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte'
      },
    },
  ],
};
