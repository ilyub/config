const { getAllRules } = require("./api");

module.exports = {
  plugins: ["no-use-extend-native"],
  rules: getAllRules("eslint-plugin-no-use-extend-native")
};
