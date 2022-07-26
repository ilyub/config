const { getAllRules } = require("./api");

module.exports = {
  plugins: ["pii"],
  rules: {
    ...getAllRules("eslint-plugin-pii"),
    "pii/no-dob": "off",
    "pii/no-phone-number": "off"
  }
};
