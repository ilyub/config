const { getAllRules } = require("./api");

module.exports = {
  plugins: ["regexp"],
  rules: {
    ...getAllRules("eslint-plugin-regexp"),
    "regexp/prefer-lookaround": "off",
    "regexp/prefer-named-capture-group": "off"
  }
};
