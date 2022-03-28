const fs = require("fs");

const { locations, quasarGlobalComponents } = (() => {
  const rawOptions = fs.existsSync("./.eslintrc.options.js")
    ? require(fs.realpathSync("./.eslintrc.options.js"))
    : {};

  const options = {
    extraChoreLocations: [],
    extraDefaultExportLocations: [],
    quasar: false,
    quasarGlobalComponents: [],
    utility: false,
    ...rawOptions
  };

  const defaultExport = (() => {
    const result = ["svg.d.ts", "vue.d.ts"];

    if (options.quasar) result.push("**/boot/*", "**/router/index.ts");

    result.push(...options.extraDefaultExportLocations);

    return result;
  })();

  const tests = ["./tests/**"];

  const chore = [
    "./*",
    "./__mocks__/**",
    ...tests,
    ...options.extraChoreLocations
  ];

  const devUtils = options.utility
    ? ["**"]
    : ["./src/**/__mocks__/**", "./src/testUtils/**", ...chore];

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
    "./boundaries",
    "./es",
    "./eslint-comments",
    "./etc",
    "./github",
    "./import",
    "./jsdoc",
    "./no-type-assertion",
    "./no-use-extend-native",
    "./only-warn",
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
      extends: [
        "./escompat.js-extension",
        "./import.js-extension",
        "./skylib.js-extension"
      ],
      files: ["*.js"]
    },
    {
      extends: [
        "./typescript-eslint",
        "./core.ts-extension",
        "./escompat.ts-extension"
      ],
      files: ["*.ts", "*.vue"],
      overrides: [
        {
          extends: ["./typescript-eslint.d-ts-extension"],
          files: ["*.d.ts"]
        }
      ]
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
    { extends: ["./import.chore", "./skylib.chore"], files: locations.chore },
    { extends: ["./import.default-export"], files: locations.defaultExport },
    {
      extends: ["./es.dev-utils", "./import.dev-utils"],
      files: locations.devUtils
    },
    {
      extends: ["./core.tests", "./jest.tests", "./unicorn.tests"],
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
