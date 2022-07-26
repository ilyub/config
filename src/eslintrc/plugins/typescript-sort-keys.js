const { getAllRules } = require("./api");

module.exports = {
  plugins: ["typescript-sort-keys"],
  rules: getAllRules("eslint-plugin-typescript-sort-keys")
};
