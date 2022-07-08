module.exports = {
  extends: [
    "./eslint/core",
    "./eslint/deprecation",
    "./eslint/es",
    "./eslint/escompat",
    "./eslint/eslint-comments",
    "./eslint/etc",
    "./eslint/github",
    "./eslint/import",
    "./eslint/jsdoc",
    "./eslint/no-type-assertion",
    "./eslint/no-use-extend-native",
    "./eslint/node",
    "./eslint/only-warn",
    "./eslint/pii",
    "./eslint/promise",
    "./eslint/regexp",
    "./eslint/security",
    "./eslint/skylib",
    "./eslint/sonarjs",
    "./eslint/sort-destructure-keys",
    "./eslint/sort-imports-requires",
    "./eslint/typescript-sort-keys",
    "./eslint/unicorn",
    "./eslint/vue",
    "./eslint/vue-scoped-css",
    "./eslint/xss",
    "./eslint/typescript-eslint",
    "./eslint/prettier"
  ],
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    jest: true,
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
    { files: "**/__mocks__/**", extends: "./eslintrc.mocks" },
    { files: "./src/test-utils/**", extends: "./eslintrc.test-utils" },
    { files: "./tests/**", extends: "./eslintrc.tests" },
    {
      files: "*.*.ts",
      extends: [
        "./eslintrc.skip-filename-check",
        "./eslintrc.skip-only-export-check"
      ]
    },
    { files: "*.d.ts", extends: "./eslintrc.allow-default-export" },
    { files: "index.ts", extends: "./eslintrc.skip-only-export-check" },
    {
      files: [
        "./.eslintrc.js",
        "./.eslintrc.overrides.js",
        "./.eslintrc.rule-overrides.js",
        "./.eslintrc.synonyms.js",
        "./.eslintrc.temp.js"
      ],
      extends: "./eslintrc.eslintrc"
    },
    {
      files: "./jest.config.js",
      extends: [
        "./eslintrc.allow-shadow-jest",
        "./eslintrc.skip-html-literal-check"
      ]
    }
  ]
};
