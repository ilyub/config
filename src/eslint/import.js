const { eslint } = require("../../api");

module.exports = {
  plugins: ["import"],
  settings: { "import/resolver": { typescript: { project: "tsconfig.json" } } },
  rules: {
    ...eslint.getAllRules("eslint-plugin-import"),
    "import/dynamic-import-chunkname": [
      "warn",
      {
        importFunctions: ["dynamicImport"],
        webpackChunknameFormat: /dynamic\/[\w+\-/]+/u.source
      }
    ],
    "import/export": "off",
    "import/exports-last": "off",
    "import/extensions": "off",
    "import/group-exports": "off",
    "import/max-dependencies": "off",
    "import/newline-after-import": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-cycle": "off",
    "import/no-deprecated": "off",
    "import/no-duplicates": "off",
    "import/no-extraneous-dependencies": "off",
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/eslint update
    // fixme
    "import/no-internal-modules": [
      "off",
      {
        allow: [
          "@skylib/*/dist/test-utils",
          "@vue/test-utils/dist/interfaces/wrapperLike",
          "@vue/test-utils/dist/types",
          "date-fns/locale/*",
          "flag-icon-css/flags/*/*.svg",
          "jest-extended/all",
          "quasar/wrappers",
          "ts-toolbelt/**",
          "typeface-roboto-multilang/*.css",
          "/configs/eslintrc.synonyms",
          "/src/eslintrc.synonyms",
          "/src/test-utils"
        ]
      }
    ],
    "import/no-namespace": "off",
    "import/no-nodejs-modules": "off",
    "import/no-relative-packages": "off",
    "import/no-relative-parent-imports": "off",
    "import/no-restricted-paths": "off",
    "import/no-self-import": "off",
    "import/no-unassigned-import": [
      "warn",
      { allow: ["**/*.css", "**/*.scss", "jest-extended", "reflect-metadata"] }
    ],
    "import/order": "off",
    "import/prefer-default-export": "off",
    "import/unambiguous": "off"
  },
  overrides: [
    {
      files: "!*.js",
      rules: {
        "import/default": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/no-named-as-default": "off",
        "import/no-unresolved": "off"
      }
    },
    { files: "!*.vue", rules: { "import/no-named-export": "off" } },
    { files: "*.js", rules: { "import/no-commonjs": "off" } },
    { files: "*.vue", rules: { "import/no-default-export": "off" } }
  ]
};
