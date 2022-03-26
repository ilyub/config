const { locations, quasarGlobalComponents } = (() => {
  const fs = require("fs");

  const rawOptions = fs.existsSync("./.eslintrc.options.js")
    ? require(fs.realpathSync("./.eslintrc.options.js"))
    : {};

  const options = {
    extraChoreLocations: [],
    extraDefaultExportLocations: [],
    extraDevUtilsLocations: [],
    extraTestsLocations: [],
    quasar: false,
    quasarGlobalComponents: [],
    utility: false,
    ...rawOptions
  };

  if (options.quasar)
    options.extraDefaultExportLocations.push("**/boot/*", "**/router/index.ts");

  if (options.utility) options.extraDevUtilsLocations.push("**");

  const defaultExport = [
    "svg.d.ts",
    "vue.d.ts",
    ...options.extraDefaultExportLocations
  ];

  const tests = ["./tests/**", ...options.extraTestsLocations];

  const chore = [
    "./*",
    "./__mocks__/**",
    ...tests,
    ...options.extraChoreLocations
  ];

  const devUtils = [
    "./src/**/__mocks__/**",
    "./src/testUtils/**",
    ...chore,
    ...options.extraDevUtilsLocations
  ];

  return {
    locations: {
      chore,
      defaultExport,
      devUtils,
      tests
    },
    quasarGlobalComponents: options.quasarGlobalComponents
  };
})();

module.exports = {
  extends: [
    "./core",
    "./es",
    "./eslint-comments",
    "./etc",
    "./github",
    "./import",
    "./jsdoc",
    "./no-type-assertion",
    "./no-use-extend-native",
    "./pii",
    "./promise",
    "./regexp",
    "./security",
    "./simple-import-sort",
    "./skylib",
    "./sonarjs",
    "./sort-destructure-keys",
    "./sort-export-all",
    "./typescript-sort-keys",
    "./unicorn",
    "./xss"
  ],
  overrides: [
    {
      extends: ["./escompat.js-extension", "./import.js-extension"],
      files: ["*.js"]
    },
    {
      extends: [
        "./typescript-eslint",
        "./core.ts-extension",
        "./escompat.ts-extension",
        "./tsdoc"
      ],
      files: ["*.ts", "*.vue"]
    },
    {
      extends: [
        "./vue",
        "./vue-scoped-css",
        "./import.vue-extension",
        "./skylib.vue-extension"
      ],
      files: ["*.vue"],
      overrides: [{ extends: ["./vue.dev-utils"], files: locations.devUtils }],
      rules: {
        "vue/no-undef-components": [
          "warn",
          { ignorePatterns: quasarGlobalComponents }
        ]
      }
    },
    { extends: ["./import.chore"], files: locations.chore },
    { extends: ["./import.default-export"], files: locations.defaultExport },
    {
      extends: ["./es.dev-utils", "./import.dev-utils"],
      files: locations.devUtils
    },
    {
      extends: ["./jest", "./core.tests", "./unicorn.tests"],
      files: locations.tests
    },
    {
      extends: [
        "./prettier",
        "./core.prettier",
        "./typescript-eslint.prettier",
        "./vue.prettier"
      ],
      files: ["**"]
    }
  ]
};
