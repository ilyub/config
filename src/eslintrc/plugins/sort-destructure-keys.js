const { getAllRules } = require("./api");

module.exports = {
  plugins: ["sort-destructure-keys"],
  rules: {
    ...getAllRules("eslint-plugin-sort-destructure-keys"),
    "sort-destructure-keys/sort-destructure-keys": [
      "warn",
      { caseSensitive: true }
    ]
  }
};
