const { locations, quasarGlobalComponents } = (() => {
  const fs = require("fs");

  const defaultOptions = {
    extraChoreLocations: [],
    extraDefaultExport: [],
    extraNodeLocations: [],
    extraTestsLocations: [],
    quasar: false,
    quasarGlobalComponents: []
  };

  const options = fs.existsSync("./.eslintrc.options.js")
    ? {
        ...defaultOptions,
        ...require(fs.realpathSync("./.eslintrc.options.js"))
      }
    : defaultOptions;

  if (options.quasar)
    options.extraDefaultExport.push("**/boot/*", "**/router/index.ts");

  const defaultExport = ["svg.d.ts", "vue.d.ts", ...options.extraDefaultExport];

  const tests = ["./tests/**", ...options.extraTestsLocations];

  const chore = [
    "./*",
    "./__mocks__/**",
    ...tests,
    ...options.extraChoreLocations
  ];

  const node = [
    "./src/**/__mocks__/**",
    "./src/testUtils/**",
    ...chore,
    ...options.extraNodeLocations
  ];

  return {
    locations: {
      chore,
      defaultExport,
      node,
      tests
    },
    quasarGlobalComponents: options.quasarGlobalComponents
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
        "./api/eslint/typescript-eslint",
        "./api/eslint/core.ts-extension"
      ],
      files: ["*.ts"]
    },
    {
      extends: [
        "./api/eslint/typescript-eslint",
        "./api/eslint/core.ts-extension",
        "./api/eslint/vue",
        "./api/eslint/vue-scoped-css",
        "./api/eslint/import.vue-extension",
        "./api/eslint/skylib.vue-extension"
      ],
      files: ["*.vue"],
      overrides: [
        {
          extends: ["./api/eslint/vue.node"],
          files: locations.node
        }
      ],
      rules: {
        "vue/no-unregistered-components": [
          "warn",
          { ignorePatterns: quasarGlobalComponents }
        ]
      }
    },
    {
      extends: ["./api/eslint/import.chore"],
      files: locations.chore
    },
    {
      extends: ["./api/eslint/import.default-export"],
      files: locations.defaultExport
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
      extends: [
        "./api/eslint/jest",
        "./api/eslint/core.tests",
        "./api/eslint/unicorn.tests"
      ],
      files: locations.tests
    },
    {
      extends: ["./api/eslint/prettier", "./api/eslint/core.prettier"],
      files: ["**"]
    }
  ]
};
