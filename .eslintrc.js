module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["jest", "@typescript-eslint"],
  env: {
    "jest/globals": true,
  },
  rules: {
    "implicit-arrow-linebreak": 0,
  },
};
