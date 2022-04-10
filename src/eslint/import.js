const { extraUnassignedImportLocations } = require("./getOptions");

const unassignedImport = ["**/*.css", "**/*.scss"];

unassignedImport.push(...extraUnassignedImportLocations);

module.exports = {
  plugins: ["import"],
  rules: {
    ...require("./getAll")("eslint-plugin-import"),
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
    "import/no-internal-modules": "off",
    "import/no-named-export": "off",
    "import/no-namespace": "off",
    "import/no-unassigned-import": ["warn", { allow: unassignedImport }],
    "import/order": "off",
    "import/prefer-default-export": "off",
    "import/unambiguous": "off"
  },
  settings: { "import/resolver": { typescript: { project: "tsconfig.json" } } }
};
