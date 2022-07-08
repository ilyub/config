const { eslint } = require("../../api");

module.exports = {
  plugins: ["deprecation"],
  rules: eslint.getAllRules("eslint-plugin-deprecation"),
  overrides: [{ files: "*.js", rules: { "deprecation/deprecation": "off" } }]
};
