module.exports = {
  plugins: ["unicorn"],
  rules: {
    ...require("./get-all")("eslint-plugin-unicorn"),
    "unicorn/catch-error-name": ["warn", { name: "e" }],
    "unicorn/consistent-function-scoping": "off",
    "unicorn/error-message": "off",
    "unicorn/explicit-length-check": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/no-array-push-push": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prefer-array-flat": "off",
    "unicorn/prefer-array-flat-map": "off",
    "unicorn/prefer-dom-node-dataset": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prefer-object-has-own": "off",
    "unicorn/prefer-string-replace-all": "off",
    "unicorn/prevent-abbreviations": "off"
  }
};
