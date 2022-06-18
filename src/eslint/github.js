const { eslint } = require("..");

module.exports = {
  plugins: ["github"],
  rules: eslint.getAllRules("eslint-plugin-github")
};
