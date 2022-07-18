const { getAllRules } = require("./api");

module.exports = {
  plugins: ["no-type-assertion"],
  rules: {
    ...getAllRules("eslint-plugin-no-type-assertion"),
    "no-type-assertion/no-type-assertion": "warn"
  }
};
