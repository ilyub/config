module.exports = {
  plugins: ["sonarjs"],
  rules: {
    ...require("./getAll")("eslint-plugin-sonarjs"),
    "sonarjs/cognitive-complexity": ["warn", 50],
    "sonarjs/no-duplicate-string": "off",
    "sonarjs/no-identical-functions": ["warn", 10],
    "sonarjs/no-nested-switch": "off",
    "sonarjs/prefer-single-boolean-return": "off"
  }
};
