const { eslint } = require("../api");

const noShadow = eslint.rules["@typescript-eslint/no-shadow"];

module.exports = {
  rules: {
    "@typescript-eslint/no-shadow": [
      "warn",
      { ...noShadow, allow: [...noShadow.allow, "jest"] }
    ]
  }
};
