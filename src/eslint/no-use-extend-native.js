const { eslint } = require("../../api");

module.exports = {
  plugins: ["no-use-extend-native"],
  rules: eslint.getAllRules("eslint-plugin-no-use-extend-native")
};
