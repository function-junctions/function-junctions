module.exports = {
  extends: ["turbo", "prettier"],
  plugins: ['prettier'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
