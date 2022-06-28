const { eslint } = require("../../api");

module.exports = {
  plugins: ["security"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-security"),
    "security/detect-non-literal-fs-filename": "off",
    "security/detect-object-injection": "off"
  }
};
