const { eslint } = require("../../api");

module.exports = {
  plugins: ["xss"],
  rules: eslint.getAllRules("eslint-plugin-xss")
};
