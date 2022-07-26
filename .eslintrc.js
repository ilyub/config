module.exports = {
  extends: [
    "./src/eslintrc",
    "./src/eslintrc/options/allow-nodejs-modules",
    "./src/eslintrc/options/allow-require",
    "./src/eslintrc/options/allow-require-unsafe",
    "./.eslintrc.overrides",
    "./.eslintrc.rule-overrides",
    "./.eslintrc.temp"
  ]
};
