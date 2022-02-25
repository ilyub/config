module.exports = {
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        ignore: [
          "css-filters",
          "css-sticky",
          "flexbox",
          "outline",
          "user-select-none",
          "will-change"
        ]
      }
    ]
  }
};
