const { eslint } = require("../../api");

module.exports = {
  plugins: ["deprecation"],
  rules: eslint.getAllRules("eslint-plugin-deprecation")
};
