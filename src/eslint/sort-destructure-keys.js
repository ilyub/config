const { eslint } = require("../../api");

module.exports = {
  plugins: ["sort-destructure-keys"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-sort-destructure-keys"),
    "sort-destructure-keys/sort-destructure-keys": [
      "warn",
      { caseSensitive: true }
    ]
  }
};
