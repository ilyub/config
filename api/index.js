/* eslint-disable @skylib/disallow-import/no-relative-parent-imports -- Ok */

const { getAllRules } = require("../src/eslintrc/plugins/api");

const preset = require("../src/jest-preset");

const skylib = require("../src/eslintrc/plugins/skylib");

const tsEslint = require("../src/eslintrc/plugins/typescript-eslint");

module.exports = {
  eslint: {
    getAllRules,
    rules: {
      "@skylib/consistent-import": skylib.rules["@skylib/consistent-import"][1],
      "@typescript-eslint/no-shadow":
        tsEslint.rules["@typescript-eslint/no-shadow"][1]
    }
  },
  jest: { preset }
};
