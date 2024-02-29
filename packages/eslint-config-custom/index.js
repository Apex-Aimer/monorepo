module.exports = {
  extends: [
    'next',
    'turbo',
    'prettier',
    'plugin:eslint-plugin-next-on-pages/recommended',
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'import/no-anonymous-default-export': 'off',
  },
  plugins: ['eslint-plugin-next-on-pages'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}
