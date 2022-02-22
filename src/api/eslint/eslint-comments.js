module.exports = {
  plugins: ["eslint-comments"],
  rules: {
    "eslint-comments/disable-enable-pair": ["warn", { "allowWholeFile": true }],
    "eslint-comments/no-aggregating-enable": "warn",
    "eslint-comments/no-duplicate-disable": "warn",
    "eslint-comments/no-restricted-disable": "warn",
    "eslint-comments/no-unlimited-disable": "warn",
    "eslint-comments/no-unused-disable": "warn",
    "eslint-comments/no-unused-enable": "warn",
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
    // eslint-disable-next-line @skylib/disallow-by-regexp
    // temp
    "eslint-comments/require-description": "off"
  }
};
