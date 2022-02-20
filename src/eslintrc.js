const locations = (() => {
  const fs = require("fs");

  const options = fs.existsSync("./.eslintrc.options.js")
    ? require(fs.realpathSync("./.eslintrc.options.js"))
    : {};

  const extraChoreLocations = options.extraChoreLocations ?? [];

  const extraNodeLocations = options.extraNodeLocations ?? [];

  const tests = ["./tests/**"];

  const chore = ["./*", "./__mocks__/**", ...tests, ...extraChoreLocations];

  const node = [
    "./src/**/__mocks__/**",
    "./src/testUtils/**",
    ...chore,
    ...extraNodeLocations
  ];

  return {
    chore,
    node,
    tests
  };
})();

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2017: true,
    es2020: true,
    es2021: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    "./api/eslint/core",
    "./api/eslint/es",
    "./api/eslint/eslint-comments",
    "./api/eslint/etc",
    "./api/eslint/github",
    "./api/eslint/import",
    "./api/eslint/jsdoc",
    "./api/eslint/no-type-assertion",
    "./api/eslint/no-use-extend-native",
    "./api/eslint/pii",
    "./api/eslint/promise",
    "./api/eslint/regexp",
    "./api/eslint/security",
    "./api/eslint/simple-import-sort",
    "./api/eslint/skylib",
    "./api/eslint/sonarjs",
    "./api/eslint/sort-destructure-keys",
    "./api/eslint/sort-export-all",
    "./api/eslint/typescript-sort-keys",
    "./api/eslint/unicorn",
    "./api/eslint/xss"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2017,
    extraFileExtensions: [".vue"],
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    sourceType: "module"
  },
  plugins: ["boundaries", "only-warn"],
  root: true,
  // @skylib/sort-keys break
  overrides: [
    {
      extends: ["./api/eslint/import.js-extension"],
      files: ["*.js"]
    },
    {
      extends: [
        "./api/eslint/core.ts-extension",
        "./api/eslint/typescript-eslint"
      ],
      files: ["*.ts"]
    },
    {
      extends: [
        "./api/eslint/core.ts-extension",
        "./api/eslint/import.vue-extension",
        "./api/eslint/skylib.vue-extension",
        "./api/eslint/typescript-eslint",
        "./api/eslint/vue",
        "./api/eslint/vue-scoped-css"
      ],
      files: ["*.vue"],
      overrides: [
        {
          extends: ["./api/eslint/vue.node"],
          files: locations.node
        }
      ]
    },
    {
      extends: ["./api/eslint/import.chore"],
      files: locations.chore
    },
    {
      extends: [
        "./api/eslint/es.node",
        "./api/eslint/import.node",
        "./api/eslint/security.node"
      ],
      files: locations.node
    },
    {
      extends: ["./api/eslint/jest"],
      files: locations.tests
    },
    {
      extends: ["./api/eslint/prettier"],
      files: ["**"]
    }
  ]
};
