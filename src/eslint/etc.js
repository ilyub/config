module.exports = {
  plugins: ["etc"],
  rules: {
    ...require("./getAll")("eslint-plugin-etc"),
    "etc/no-misused-generics": "off",
    // eslint-disable-next-line no-warning-comments
    // fixme: Postponed
    "etc/no-t": "off",
    // eslint-disable-next-line no-warning-comments
    // fixme: https://github.com/cartant/eslint-plugin-etc/issues/40
    "etc/prefer-less-than": "off"
  }
};
