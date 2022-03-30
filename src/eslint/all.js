const fs = require("fs");

const { locations, quasarGlobalComponents } = (() => {
  const rawOptions = fs.existsSync(".eslintrc.options.js")
    ? require(fs.realpathSync(".eslintrc.options.js"))
    : {};

  const options = {
    extraChoreLocations: [],
    extraDefaultExportLocations: [],
    extraTestsLocations: [],
    extraUtilsLocations: [],
    quasar: false,
    quasarGlobalComponents: [],
    utility: false,
    ...rawOptions
  };

  return {
    locations: {
      chore: ["./*", "./__mocks__/**", ...options.extraChoreLocations],
      defaultExport: [
        "svg.d.ts",
        "vue.d.ts",
        ...options.extraDefaultExportLocations,
        ...(options.quasar ? ["./src/boot/*", "./src/router/index.ts"] : [])
      ],
      tests: ["./tests/**", ...options.extraTestsLocations],
      utils: [
        "./src/**/__mocks__/**",
        "./src/testUtils/**",
        ...options.extraUtilsLocations,
        ...(options.utility ? ["**"] : [])
      ]
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
        "./escompat.javascript",
        "./import.javascript",
        "./skylib.javascript"
      ],
      files: ["*.js"]
    },
    {
      extends: [
        "./typescript-eslint",
        "./core.typescript",
        "./escompat.typescript"
      ],
      files: ["*.ts", "*.vue"],
      overrides: [{ extends: ["./typescript-eslint.dts"], files: ["*.d.ts"] }]
    },
    {
      extends: ["./vue", "./vue-scoped-css", "./import.vue", "./skylib.vue"],
      files: ["*.vue"],
      overrides: [
        { extends: ["./vue.chore-tests-utils"], files: locations.chore },
        { extends: ["./vue.chore-tests-utils"], files: locations.tests },
        { extends: ["./vue.chore-tests-utils"], files: locations.utils }
      ],
      rules: {
        "vue/no-undef-components": [
          "warn",
          { ignorePatterns: quasarGlobalComponents }
        ]
      }
    },
    {
      extends: [
        "./es.chore-tests-utils",
        "./import.chore-tests",
        "./import.chore-tests-utils",
        "./skylib.chore-tests"
      ],
      files: locations.chore
    },
    { extends: ["./import.defaultExport"], files: locations.defaultExport },
    {
      extends: [
        "./core.tests",
        "./es.chore-tests-utils",
        "./import.chore-tests",
        "./import.chore-tests-utils",
        "./jest.tests",
        "./skylib.chore-tests",
        "./unicorn.tests"
      ],
      files: locations.tests
    },
    {
      extends: ["./es.chore-tests-utils", "./import.chore-tests-utils"],
      files: locations.utils
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
