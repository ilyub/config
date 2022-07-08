const { eslint } = require("../../api");

module.exports = {
  plugins: ["jest-extended"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-jest-extended"),
    "jest-extended/prefer-to-be-false": "off",
    "jest-extended/prefer-to-be-true": "off"
  }
};
