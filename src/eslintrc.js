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
    { extends: "./eslintrc.tests", files: "./tests/**" },
    {
      extends: "./eslintrc.allow-default-export",
      files: ["*.d.ts", "**/__mocks__/**"]
    },
    {
      extends: "./eslintrc.allow-global-access",
      files: ["**/__mocks__/**", "./src/test-utils/**", "./tests/**"]
    },
    { extends: "./eslintrc.allow-jest-shadow", files: "./jest.config.js" },
    {
      extends: "./eslintrc.allow-nodejs-modules",
      files: ["**/__mocks__/**", "./*", "./src/test-utils/**", "./tests/**"]
    },
    {
      extends: "./eslintrc.allow-unsafe-require",
      files: ["**/__mocks__/**", "./*", "./src/test-utils/**", "./tests/**"]
    },
    {
      extends: "./eslintrc.skip-only-export-check",
      files: ["*.*.ts", "**/__mocks__/**"]
    },
    {
      extends: "./eslintrc.skip-html-literal-check",
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
