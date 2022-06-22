module.exports = {
  rules: {
    "@typescript-eslint/no-shadow": [
      "warn",
      {
        allow: ["event", "jest", "name"],
        builtinGlobals: true,
        hoist: "all",
        ignoreFunctionTypeParameterNameValueShadow: false,
        ignoreTypeValueShadow: true
      }
    ]
  }
};
