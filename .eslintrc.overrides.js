module.exports = {
  overrides: [
    {
      files: "./api/index.js",
      extends: "./src/eslintrc.skip-html-literal-check"
    },
    {
      files: ["./src/eslint/*", "./src/eslintrc.*.js", "./src/eslintrc.js"],
      extends: "./src/eslintrc.eslintrc"
    }
  ]
};
