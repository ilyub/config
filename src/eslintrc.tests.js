module.exports = {
  extends: [
    "./eslint/jest",
    "./eslint/jest-extended",
    "./eslintrc.allow-global-access",
    "./eslintrc.allow-nodejs-modules",
    "./eslintrc.allow-require",
    "./eslintrc.allow-unsafe-require",
    "./eslintrc.skip-filename-check",
    "./eslintrc.skip-html-literal-check"
  ],
  rules: {
    "@skylib/disallow-import/no-at-sign": "off",
    "@skylib/require-jsdoc": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "eslint-comments/no-use": ["warn", { allow: ["eslint", "eslint-disable"] }],
    "max-classes-per-file": "off",
    "unicorn/no-null": "off"
  }
};
