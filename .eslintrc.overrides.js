module.exports = {
  overrides: [
    { files: "./src/eslintrc/**", extends: "./src/eslintrc/roles/eslintrc" },
    {
      files: "./src/jest-preset.js",
      extends: "./src/eslintrc/options/skip-html-literal-check"
    }
  ]
};
