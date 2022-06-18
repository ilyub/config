const { eslint } = require("..");

module.exports = {
  overrides: [
    {
      files: "./tests/**",
      plugins: ["jest-extended"],
      rules: {
        ...eslint.getAllRules("eslint-plugin-jest-extended"),
        "jest-extended/prefer-to-be-false": "off",
        "jest-extended/prefer-to-be-true": "off"
      }
    }
  ]
};
