module.exports = {
  extends: [
    "./eslintrc.allow-global-access",
    "./eslintrc.allow-nodejs-modules",
    "./eslintrc.allow-unsafe-require",
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/eslint-plugin update
    // fixme - Test should be named after src file
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
