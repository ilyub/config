module.exports = {
  extends: ["plugin:jest/all"],
  rules: {
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
