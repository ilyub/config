const { eslint } = require("..");

module.exports = {
  plugins: ["typescript-sort-keys"],
  rules: eslint.getAllRules("eslint-plugin-typescript-sort-keys")
};
