module.exports = {
  plugins: ["etc"],
  rules: {
    ...require("./getAll")("eslint-plugin-etc"),
    "etc/no-misused-generics": "off",
    // eslint-disable-next-line no-warning-comments -- Postponed
    // fixme
    "etc/no-t": "off",
    "etc/prefer-less-than": "off"
  }
};
