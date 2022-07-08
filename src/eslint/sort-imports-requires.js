const { eslint } = require("../../api");

module.exports = {
  plugins: ["sort-imports-requires"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-sort-imports-requires"),
    "sort-imports-requires/sort-imports": ["warn", { unsafeAutofix: true }],
    "sort-imports-requires/sort-requires": ["warn", { unsafeAutofix: true }]
  }
};
