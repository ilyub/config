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
    "import/group-exports": "off",
    "import/max-dependencies": "off",
    "import/newline-after-import": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-deprecated": "off",
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
    "import/no-named-export": "off",
    "import/no-namespace": "off",
    "import/no-unassigned-import": [
      "warn",
      { allow: ["**/*.css", "**/*.scss", "jest-extended", "reflect-metadata"] }
    ],
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
  overrides: [
    {
      files: "*.{ts,vue}",
      rules: { "import/namespace": "off", "import/no-unresolved": "off" }
    },
    { files: "*.js", rules: { "import/no-commonjs": "off" } },
    {
      files: "*.vue",
      rules: {
        "import/no-default-export": "off",
        "import/no-named-export": "warn"
      }
    }
  ]
};
