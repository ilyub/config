module.exports = {
  plugins: ["regexp"],
  rules: {
    ...require("./get-all")("eslint-plugin-regexp"),
    "regexp/prefer-lookaround": "off",
    // eslint-disable-next-line no-warning-comments -- Wait for ecmaVersion 2018
    // fixme
    "regexp/prefer-named-capture-group": "off"
  }
};
