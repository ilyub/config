const { getAllRules } = require("./api");

module.exports = {
  plugins: ["security"],
  rules: {
    ...getAllRules("eslint-plugin-security"),
    "security/detect-non-literal-fs-filename": "off",
    "security/detect-object-injection": "off"
  }
};
