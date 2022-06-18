module.exports = {
  extends: [
    "./src/eslintrc",
    "./src/eslintrc.allow-nodejs-modules",
    "./src/eslintrc.allow-unsafe-require"
  ],
  overrides: [
    {
      extends: "./src/eslintrc.skip-html-literal-check",
      files: "./src/index.js"
    },
    { extends: ["./.eslintrc.overrides", "./.eslintrc.temp"], files: "**" }
  ]
};
