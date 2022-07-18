module.exports = {
  overrides: [
    {
      files: "./src/jest-preset.js",
      extends: "./src/eslintrc.skip-html-literal-check"
    },
    { files: "./src/eslint/*", extends: "./src/eslintrc.eslintrc" }
  ]
};
