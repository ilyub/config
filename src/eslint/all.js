const { locations, quasarGlobalComponents } = (() => {
  const fs = require("fs");

  const defaultOptions = {
    extraChoreLocations: [],
    extraDefaultExport: [],
    extraNoneProductionLocations: [],
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

  const noneProduction = [
    "./src/**/__mocks__/**",
    "./src/testUtils/**",
    ...chore,
    ...options.extraNoneProductionLocations
  ];

  return {
    locations: {
      chore,
      defaultExport,
      noneProduction,
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
      extends: ["./import.js-extension"],
      files: ["*.js"]
    },
    {
      extends: ["./typescript-eslint", "./core.ts-extension"],
      files: ["*.ts"]
    },
    {
      extends: [
        "./typescript-eslint",
        "./core.ts-extension",
        "./vue",
        "./vue-scoped-css",
        "./import.vue-extension",
        "./skylib.vue-extension"
      ],
      files: ["*.vue"],
      overrides: [
        {
          extends: ["./vue.none-production"],
          files: locations.noneProduction
        }
      ],
      rules: {
        "vue/no-undef-components": [
          "warn",
          { ignorePatterns: quasarGlobalComponents }
        ]
      }
    },
    {
      extends: ["./import.chore"],
      files: locations.chore
    },
    {
      extends: ["./import.default-export"],
      files: locations.defaultExport
    },
    {
      extends: [
        "./es.none-production",
        "./import.none-production",
        "./security.none-production"
      ],
      files: locations.noneProduction
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
