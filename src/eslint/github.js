const { eslint } = require("../../api");

module.exports = {
  plugins: ["github"],
  rules: eslint.getAllRules("eslint-plugin-github")
};
