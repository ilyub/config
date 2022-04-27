module.exports = {
  plugins: ["security"],
  rules: {
    ...require("./get-all")("eslint-plugin-security"),
    "security/detect-non-literal-fs-filename": "off",
    "security/detect-non-literal-require": "off",
    "security/detect-object-injection": "off",
    "security/detect-unsafe-regex": "off"
  }
};
