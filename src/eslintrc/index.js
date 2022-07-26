module.exports = {
  extends: [
    "./plugins/core",
    "./plugins/deprecation",
    "./plugins/es",
    "./plugins/escompat",
    "./plugins/eslint-comments",
    "./plugins/etc",
    "./plugins/github",
    "./plugins/import",
    "./plugins/jsdoc",
    "./plugins/no-type-assertion",
    "./plugins/no-use-extend-native",
    "./plugins/node",
    "./plugins/only-warn",
    "./plugins/pii",
    "./plugins/promise",
    "./plugins/regexp",
    "./plugins/security",
    "./plugins/skylib",
    "./plugins/sonarjs",
    "./plugins/sort-destructure-keys",
    "./plugins/sort-imports-requires",
    "./plugins/typescript-sort-keys",
    "./plugins/unicorn",
    "./plugins/vue",
    "./plugins/vue-scoped-css",
    "./plugins/xss",
    "./plugins/typescript-eslint",
    "./plugins/prettier",
    "./plugins/unused-imports"
  ],
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2017,
    extraFileExtensions: [".vue"],
    parser: "@typescript-eslint/parser",
    project: "tsconfig.json",
    sourceType: "module"
  },
  overrides: [
    { files: "**/__mocks__/**", extends: "./roles/mocks" },
    { files: "./src/test-utils/**", extends: "./roles/test-utils" },
    { files: "./tests/**", extends: "./roles/tests" },
    {
      files: [".eslintrc.*.js", ".eslintrc.js", "eslintrc.*.js", "eslintrc.js"],
      extends: "./roles/eslintrc"
    }
  ]
};
