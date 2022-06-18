const { eslint } = require("..");

module.exports = {
  plugins: ["jquery"],
  rules: eslint.getAllRules("eslint-plugin-jquery")
};
