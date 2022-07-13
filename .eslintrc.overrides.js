module.exports = {
  overrides: [
    {
      files: "./api/index.js",
      extends: "./src/eslintrc.skip-html-literal-check"
    },
    { files: "./src/eslint/*", extends: "./src/eslintrc.eslintrc" }
  ]
};
