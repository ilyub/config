module.exports = {
  plugins: ["eslint-comments"],
  rules: {
    ...require("./getAll")("eslint-plugin-eslint-comments"),
    "eslint-comments/disable-enable-pair": ["warn", { allowWholeFile: true }],
    "eslint-comments/no-use": [
      "warn",
      {
        allow: [
          "eslint-enable",
          "eslint-disable",
          "eslint-disable-line",
          "eslint-disable-next-line"
        ]
      }
    ],
    // eslint-disable-next-line no-warning-comments
    // fixme: Postponed until the number of ESLint comments is reduced
    "eslint-comments/require-description": "off"
  }
};
