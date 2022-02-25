module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    jest: true,
    node: true
  },
  extends: ["./eslint/all"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2017,
    project: "./tsconfig.json",
    sourceType: "module"
  },
  plugins: ["boundaries", "only-warn"]
};
