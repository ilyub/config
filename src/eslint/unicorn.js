const { eslint } = require("../../api");

module.exports = {
  plugins: ["unicorn"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-unicorn"),
    "unicorn/consistent-function-scoping": "off",
    "unicorn/explicit-length-check": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/no-array-push-push": "off",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prefer-at": "off",
    "unicorn/prefer-string-replace-all": "off",
    "unicorn/prevent-abbreviations": "off"
  },
  overrides: [{ files: "*.js", rules: { "unicorn/prefer-module": "off" } }]
};
