module.exports = {
  plugins: ["jest"],
  rules: {
    ...require("./get-all")("eslint-plugin-jest"),
    "jest/no-hooks": "off",
    "jest/prefer-expect-assertions": [
      "warn",
      {
        onlyFunctionsWithExpectInCallback: true,
        onlyFunctionsWithExpectInLoop: true
      }
    ],
    "jest/prefer-lowercase-title": "off",
    "jest/prefer-to-be": "warn",
    "jest/require-hook": "off",
    "jest/require-top-level-describe": "off"
  }
};
