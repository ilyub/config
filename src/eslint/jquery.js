const { eslint } = require("../../api");

module.exports = {
  plugins: ["jquery"],
  rules: eslint.getAllRules("eslint-plugin-jquery")
};
