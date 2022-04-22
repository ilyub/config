const {
  extraChoreLocations,
  extraDefaultExportLocations,
  extraTestsLocations,
  extraUtilsLocations,
  quasar,
  utility
} = require("./getOptions");

const chore = ["./*", "./__mocks__/**"];

const defaultExport = ["*.vue", "svg.d.ts", "vue.d.ts"];

const tests = ["./tests/**"];

const utils = ["./configs/**", "./src/**/__mocks__/**", "./src/testUtils/**"];

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
    "./deprecation",
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
    "./skylib",
    "./sonarjs",
    "./sort-destructure-keys",
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
        "./escompat.typescript",
        "./import.typescript"
      ],
      files: ["*.ts", "*.vue"],
      overrides: [
        { extends: ["./typescript-eslint.dts"], files: ["*.d.ts"] },
        { extends: ["./typescript-eslint.tests"], files: tests }
      ]
    },
    {
      extends: ["./vue", "./vue-scoped-css", "./core.vue", "./skylib.vue"],
      files: ["*.vue"],
      overrides: [{ extends: ["./vue.chore"], files: chore }]
    },
    {
      extends: ["./es.chore", "./import.chore", "./skylib.chore"],
      files: chore
    },
    { extends: ["./import.defaultExport"], files: defaultExport },
    {
      extends: [
        "./core.tests",
        "./es.tests",
        "./import.tests",
        "./jest.tests",
        "./skylib.tests",
        "./unicorn.tests"
      ],
      files: tests
    },
    { extends: ["./es.utils", "./import.utils"], files: utils },
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
