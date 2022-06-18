const { eslint } = require("..");

module.exports = {
  extends: "prettier",
  plugins: ["prettier"],
  rules: { ...eslint.getAllRules("eslint-plugin-prettier") }
};
