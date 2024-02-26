module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'import/no-anonymous-default-export': 'off',
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}
