module.exports = {
  plugins: ["regexp"],
  rules: {
    ...require("./getAll")("eslint-plugin-regexp"),
    "regexp/prefer-lookaround": "off",
    // eslint-disable-next-line no-warning-comments
    // fixme: Postponed
    "regexp/prefer-named-capture-group": "off"
  }
};
