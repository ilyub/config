module.exports = {
  extends: [
    "./src/eslintrc",
    "./src/eslintrc.allow-nodejs-modules",
    "./src/eslintrc.allow-require",
    "./src/eslintrc.allow-require-unsafe",
    "./.eslintrc.overrides",
    "./.eslintrc.rule-overrides",
    "./.eslintrc.temp"
  ]
};
