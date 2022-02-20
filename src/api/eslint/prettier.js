module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/quotes": ["warn", "double", { avoidEscape: true }],
    "prettier/prettier": "warn",
    "vue/html-self-closing": [
      "warn",
      {
        html: {
          component: "always",
          normal: "never",
          void: "always"
        },
        math: "always",
        svg: "always"
      }
    ]
  }
};
