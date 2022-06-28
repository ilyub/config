const { eslint } = require("../../api");

module.exports = {
  plugins: ["no-type-assertion"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-no-type-assertion"),
    "no-type-assertion/no-type-assertion": "warn"
  }
};
