const { getAllRules } = require("./api");

module.exports = {
  plugins: ["etc"],
  rules: {
    ...getAllRules("eslint-plugin-etc"),
    "etc/no-deprecated": "off",
    "etc/no-enum": "off",
    "etc/no-misused-generics": "off",
    "etc/no-t": "off",
    "etc/prefer-less-than": "off"
  }
};
