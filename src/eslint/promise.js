module.exports = {
  plugins: ["promise"],
  rules: {
    ...require("./get-all")("eslint-plugin-promise"),
    "promise/always-return": "off",
    "promise/avoid-new": "off",
    "promise/catch-or-return": "off",
    "promise/no-native": "off",
    "promise/prefer-await-to-callbacks": "off"
  }
};
