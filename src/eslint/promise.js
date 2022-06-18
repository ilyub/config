const { eslint } = require("..");

module.exports = {
  plugins: ["promise"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-promise"),
    "promise/always-return": "off",
    "promise/catch-or-return": "off",
    "promise/no-native": "off",
    "promise/prefer-await-to-callbacks": "off"
  }
};
