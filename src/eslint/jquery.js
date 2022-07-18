const { getAllRules } = require("./api");

module.exports = {
  plugins: ["jquery"],
  rules: getAllRules("eslint-plugin-jquery")
};
