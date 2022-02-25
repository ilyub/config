module.exports = {
  plugins: ["etc"],
  rules: {
    ...require("./getAll")("eslint-plugin-etc"),
    "etc/no-misused-generics": "off",
    // eslint-disable-next-line @skylib/disallow-by-regexp
    // temp
    "etc/no-t": "off",
    // eslint-disable-next-line @skylib/disallow-by-regexp
    // temp
    "etc/prefer-less-than": "off"
  }
};
