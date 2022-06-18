const { eslint } = require("..");

module.exports = {
  plugins: ["deprecation"],
  rules: eslint.getAllRules("eslint-plugin-deprecation")
};
