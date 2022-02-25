module.exports = {
  plugins: ["jest"],
  rules: {
    ...require("./getAll")("eslint-plugin-jest"),
    "jest/no-hooks": "off",
    "jest/prefer-expect-assertions": [
      "warn",
      {
        onlyFunctionsWithExpectInCallback: true,
        onlyFunctionsWithExpectInLoop: true
      }
    ],
    "jest/require-hook": "off",
    "jest/require-top-level-describe": "off"
  }
};
