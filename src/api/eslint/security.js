module.exports = {
  extends: ["plugin:security/recommended"],
  rules: {
    "security/detect-non-literal-fs-filename": "off",
    "security/detect-non-literal-require": "off",
    "security/detect-object-injection": "off"
  }
};
