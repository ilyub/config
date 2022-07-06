module.exports = {
  extends: "./eslint",
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
    { files: ["./*", "./{__mocks__,tests}/**"], extends: "./eslintrc.chore" },
    { files: "**/__mocks__/**", extends: "./eslintrc.mocks" },
    { files: "./tests/**", extends: "./eslintrc.tests" },
    { files: "./src/test-utils/**", extends: "./eslintrc.test-utils" },
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
        "./.eslintrc.fast.js",
        "./.eslintrc.js",
        "./.eslintrc.overrides.js",
        "./.eslintrc.rule-overrides.js",
        "./.eslintrc.synonyms.js",
        "./.eslintrc.temp.js"
      ],
      extends: "./eslintrc.eslint"
    },
    {
      files: "./jest.config.js",
      extends: [
        "./eslintrc.allow-jest-shadow",
        "./eslintrc.skip-html-literal-check"
      ]
    }
  ]
};
