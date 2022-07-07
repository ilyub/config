module.exports = {
  extends: [
    "./eslintrc.allow-global-access",
    "./eslintrc.allow-nodejs-modules",
    "./eslintrc.allow-require",
    "./eslintrc.allow-unsafe-require",
    "./eslintrc.skip-filename-check",
    "./eslintrc.skip-html-literal-check"
  ],
  rules: {
    "@skylib/require-jsdoc": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "max-classes-per-file": "off",
    "unicorn/no-null": "off"
  }
};
