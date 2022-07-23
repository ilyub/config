/* eslint-disable @skylib/disallow-import/no-relative-parent-imports -- Ok */

const { getAllRules } = require("../src/eslint/api");

const preset = require("../src/jest-preset");

const skylib = require("../src/eslint/skylib");

const tsEslint = require("../src/eslint/typescript-eslint");

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
