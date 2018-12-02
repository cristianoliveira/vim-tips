module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],

  env: {
    'jest/globals': true,
  },
  parser: 'typescript-eslint-parser',
  rules: {
    'implicit-arrow-linebreak': 0,
  },
};
