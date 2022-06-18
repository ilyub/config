const { eslint } = require("..");

module.exports = {
  plugins: ["no-use-extend-native"],
  rules: eslint.getAllRules("eslint-plugin-no-use-extend-native")
};
