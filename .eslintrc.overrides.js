module.exports = {
  overrides: [
    {
      extends: "./src/eslintrc.skip-html-literal-check",
      files: "./api/index.js"
    }
  ]
};
