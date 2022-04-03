module.exports = {
  rules: {
    "id-length": [
      "warn",
      {
        exceptionPatterns: [],
        exceptions: [
          "extraChoreLocations",
          "extraDefaultExportLocations",
          "extraTestsLocations",
          "extraUtilsLocations",
          "ignoreFunctionTypeParameterNameValueShadow",
          "requireReturnForObjectLiteral",
          "onlyFunctionsWithExpectInCallback",
          "onlyFunctionsWithExpectInLoop"
        ],
        max: 25,
        min: 1,
        properties: "always"
      }
    ]
  }
};
