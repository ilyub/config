module.exports = {
  rules: {
    "no-shadow": [
      "warn",
      {
        allow: ["event", "jest", "name"],
        builtinGlobals: true,
        hoist: "all"
      }
    ]
  }
};
