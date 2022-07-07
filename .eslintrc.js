module.exports = {
  extends: [
    "./src/eslintrc",
    "./src/eslintrc.allow-nodejs-modules",
    "./src/eslintrc.allow-require",
    "./src/eslintrc.allow-unsafe-require",
    "./.eslintrc.overrides",
    "./.eslintrc.rule-overrides",
    "./.eslintrc.temp"
  ]
};
