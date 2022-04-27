module.exports = {
  plugins: ["etc"],
  rules: {
    ...require("./get-all")("eslint-plugin-etc"),
    "etc/no-deprecated": "off",
    "etc/no-misused-generics": "off",
    "etc/no-t": "off",
    "etc/prefer-less-than": "off"
  }
};
