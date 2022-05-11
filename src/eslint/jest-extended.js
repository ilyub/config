module.exports = {
  plugins: ["jest-extended"],
  rules: {
    ...require("./get-all")("eslint-plugin-jest-extended"),
    // eslint-disable-next-line no-warning-comments -- Ok
    // fixme
    "jest-extended/prefer-to-be-false": "off",
    // eslint-disable-next-line no-warning-comments -- Ok
    // fixme
    "jest-extended/prefer-to-be-true": "off"
  }
};
