const { getAllRules } = require("./api");

module.exports = {
  extends: "prettier",
  plugins: ["prettier"],
  rules: {
    ...getAllRules("eslint-plugin-prettier"),
    "@typescript-eslint/quotes": ["warn", "double", { avoidEscape: true }],
    "curly": ["warn", "multi"],
    "quote-props": ["warn", "consistent-as-needed"],
    "vue/html-self-closing": [
      "warn",
      {
        html: { component: "always", normal: "never", void: "always" },
        math: "always",
        svg: "always"
      }
    ]
  }
};
