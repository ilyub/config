module.exports = {
  rules: {
    "@typescript-eslint/no-shadow": [
      "warn",
      {
        allow: ["Plugin", "event", "jest", "name"],
        builtinGlobals: true,
        hoist: "all",
        ignoreFunctionTypeParameterNameValueShadow: false,
        ignoreTypeValueShadow: true
      }
    ]
  }
};
