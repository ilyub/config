const { getAllRules } = require("./api");

module.exports = {
  plugins: ["jest-extended"],
  rules: {
    ...getAllRules("eslint-plugin-jest-extended"),
    "jest-extended/prefer-to-be-false": "off",
    "jest-extended/prefer-to-be-true": "off"
  }
};
