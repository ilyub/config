const {
  extraChoreLocations,
  extraDefaultExportLocations,
  extraTestsLocations,
  extraUtilsLocations,
  quasar,
  utility
} = require("./getOptions");

const chore = ["./*", "./__mocks__/**"];

const defaultExport = ["svg.d.ts", "vue.d.ts"];

const tests = ["./tests/**"];

const utils = ["./src/**/__mocks__/**", "./src/testUtils/**"];

chore.push(...extraChoreLocations);
defaultExport.push(...extraDefaultExportLocations);
tests.push(...extraTestsLocations);
utils.push(...extraUtilsLocations);

if (quasar) defaultExport.push("./src/boot/*", "./src/router/index.ts");

if (utility) utils.push("**");

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
        "./core.javascript",
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
      overrides: [
        { extends: ["./typescript-eslint.dts"], files: ["*.d.ts"] },
        { extends: ["./typescript-eslint.tests"], files: tests }
      ]
    },
    {
      extends: ["./vue", "./vue-scoped-css", "./import.vue", "./skylib.vue"],
      files: ["*.vue"],
      overrides: [
        { extends: ["./vue.chore-tests-utils"], files: chore },
        { extends: ["./vue.chore-tests-utils"], files: tests },
        { extends: ["./vue.chore-tests-utils"], files: utils }
      ]
    },
    {
      extends: [
        "./es.chore-tests-utils",
        "./import.chore-tests",
        "./import.chore-tests-utils",
        "./skylib.chore-tests"
      ],
      files: chore
    },
    { extends: ["./import.defaultExport"], files: defaultExport },
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
      files: tests
    },
    {
      extends: ["./es.chore-tests-utils", "./import.chore-tests-utils"],
      files: utils
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
