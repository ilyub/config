const { getAllRules } = require("./api");

module.exports = {
  plugins: ["node"],
  rules: {
    ...getAllRules("eslint-plugin-node"),
    "node/callback-return": "off",
    "node/no-callback-literal": "off",
    "node/no-hide-core-modules": "off",
    "node/no-sync": "off",
    "node/no-unpublished-import": [
      "warn",
      { tryExtensions: [".js", ".json", ".ts"] }
    ],
    "node/no-unsupported-features": "off",
    "node/no-unsupported-features/es-syntax": "off"
  },
  overrides: [
    {
      files: "!*.js",
      rules: {
        "node/file-extension-in-import": "off",
        "node/no-missing-import": "off"
      }
    }
  ]
};
