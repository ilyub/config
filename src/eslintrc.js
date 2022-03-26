module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    jest: true,
    node: true
  },
  extends: ["./eslint/all"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2017,
    extraFileExtensions: [".vue"],
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    sourceType: "module"
  },
  plugins: ["boundaries", "only-warn"]
};
