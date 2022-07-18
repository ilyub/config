/* eslint-disable @skylib/disallow-import/no-relative-parent-imports -- Ok */

const eslint = require("../src/eslint/api");

const preset = require("../src/jest-preset");

module.exports = { eslint, jest: { preset } };
