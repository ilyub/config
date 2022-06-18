const { eslint } = require("..");

module.exports = {
  plugins: ["xss"],
  rules: eslint.getAllRules("eslint-plugin-xss")
};
