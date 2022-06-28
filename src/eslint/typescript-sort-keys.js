const { eslint } = require("../../api");

module.exports = {
  plugins: ["typescript-sort-keys"],
  rules: eslint.getAllRules("eslint-plugin-typescript-sort-keys")
};
