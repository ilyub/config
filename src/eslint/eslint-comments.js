const { eslint } = require("../../api");

module.exports = {
  plugins: ["eslint-comments"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-eslint-comments"),
    "eslint-comments/disable-enable-pair": ["warn", { allowWholeFile: true }],
    "eslint-comments/no-use": [
      "warn",
      { allow: ["eslint-disable", "eslint-disable-next-line"] }
    ]
  }
};
