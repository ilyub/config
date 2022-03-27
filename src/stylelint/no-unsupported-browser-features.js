module.exports = {
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      { ignore: ["css-sticky", "flexbox", "user-select-none"] }
    ]
  }
};
