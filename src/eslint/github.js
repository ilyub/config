const { getAllRules } = require("./api");

module.exports = {
  plugins: ["github"],
  rules: getAllRules("eslint-plugin-github")
};
