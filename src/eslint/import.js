const { extraUnassignedImportLocations } = require("./get-options");

const unassignedImport = ["**/*.css", "**/*.scss"];

unassignedImport.push(...extraUnassignedImportLocations);

module.exports = {
  plugins: ["import"],
  rules: {
    ...require("./get-all")("eslint-plugin-import"),
    "import/dynamic-import-chunkname": [
      "warn",
      {
        importFunctions: ["dynamicImport"],
        // eslint-disable-next-line no-warning-comments -- https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1790
        // fixme
        webpackChunknameFormat: /dynamic\/[\w\-/]+/u.source
      }
    ],
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/max-dependencies": "off",
    "import/newline-after-import": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-extraneous-dependencies": [
      "warn",
      {
        bundledDependencies: false,
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: true
      }
    ],
    "import/no-internal-modules": [
      "warn",
      {
        allow: [
          "@skylib/*/configs/*",
          "@skylib/*/dist/test-utils",
          "@skylib/config/src/*",
          "@vue/test-utils/dist/types",
          "date-fns/locale/*",
          "flag-icon-css/flags/1x1/*.svg",
          "jest-extended/all",
          "quasar/wrappers",
          "ts-toolbelt/**",
          "typeface-roboto-multilang/*.css",
          "src/test-utils"
        ]
      }
    ],
    "import/no-named-export": "off",
    "import/no-namespace": "off",
    "import/no-unassigned-import": ["warn", { allow: unassignedImport }],
    "import/order": [
      "warn",
      {
        alphabetize: { caseInsensitive: false, order: "asc" },
        groups: [
          [
            "builtin",
            "external",
            "index",
            "internal",
            "object",
            "parent",
            "sibling",
            "unknown"
          ],
          "type"
        ],
        warnOnUnassignedImports: true
      }
    ],
    "import/prefer-default-export": "off",
    "import/unambiguous": "off"
  },
  settings: { "import/resolver": { typescript: { project: "tsconfig.json" } } }
};
