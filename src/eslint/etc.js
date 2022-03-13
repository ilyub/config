module.exports = {
  plugins: ["etc"],
  rules: {
    ...require("./getAll")("eslint-plugin-etc"),
    "etc/no-misused-generics": "off",
    // eslint-disable-next-line no-warning-comments
    // temp
    "etc/no-t": "off",
    // eslint-disable-next-line no-warning-comments
    // temp
    "etc/prefer-less-than": "off"
  }
};
