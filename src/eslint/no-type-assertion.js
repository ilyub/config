const { eslint } = require("..");

module.exports = {
  plugins: ["no-type-assertion"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-no-type-assertion"),
    "no-type-assertion/no-type-assertion": "warn"
  }
};
