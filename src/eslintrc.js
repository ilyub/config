module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    jest: true,
    node: true
  },
  extends: "./eslint",
  overrides: [
    {
      extends: "./eslintrc.chore",
      files: ["./*", "./__mocks__/**", "./tests/**"]
    },
    { extends: "./eslintrc.mocks", files: "**/__mocks__/**" },
    { extends: "./eslintrc.tests", files: "./tests/**" },
    { extends: "./eslintrc.test-utils", files: "./src/test-utils/**" },
    { extends: "./eslintrc.allow-default-export", files: "*.d.ts" },
    {
      extends: [
        "./eslintrc.skip-filename-check",
        "./eslintrc.skip-only-export-check"
      ],
      files: "*.*.ts"
    },
    {
      extends: [
        "./eslintrc.allow-jest-shadow",
        "./eslintrc.skip-html-literal-check"
      ],
      files: "./jest.config.js"
    }
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2017,
    extraFileExtensions: [".vue"],
    parser: "@typescript-eslint/parser",
    project: "tsconfig.json",
    sourceType: "module"
  }
};
