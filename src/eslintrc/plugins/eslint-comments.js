const { getAllRules } = require("./api");

module.exports = {
  plugins: ["eslint-comments"],
  rules: {
    ...getAllRules("eslint-plugin-eslint-comments"),
    "eslint-comments/disable-enable-pair": ["warn", { allowWholeFile: true }],
    "eslint-comments/no-use": [
      "warn",
      { allow: ["eslint", "eslint-disable", "eslint-disable-next-line"] }
    ]
  }
};
