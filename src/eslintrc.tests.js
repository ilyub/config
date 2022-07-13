module.exports = {
  extends: [
    "./eslint/jest",
    "./eslint/jest-extended",
    "./eslintrc.allow-global-access",
    "./eslintrc.allow-nodejs-modules",
    "./eslintrc.allow-require",
    "./eslintrc.allow-require-unsafe",
    "./eslintrc.skip-filename-check",
    "./eslintrc.skip-html-literal-check"
  ],
  env: { jest: true },
  rules: {
    "@skylib/custom/prefer-jest-toBe": [
      "warn",
      {
        message: 'Prefer "toBe" matcher',
        selector:
          "CallExpression[callee.property.name=toStrictEqual] > .arguments",
        typeIsOneOf: ["boolean", "number", "string"]
      }
    ],
    "@skylib/custom/prefer-jest-toStrictEqual": [
      "warn",
      {
        message: 'Prefer "toStrictEqual" matcher',
        selector: "CallExpression[callee.property.name=toBe] > .arguments",
        typeIsNoneOf: ["boolean", "number", "string"]
      }
    ],
    "@skylib/custom/prefer-jest-toThrow-shorthand": [
      "warn",
      {
        message:
          'Prefer error message or "Error" as an argument of "toThrow" matcher',
        selector:
          "CallExpression[callee.property.name=toThrow] > NewExpression.arguments[arguments.length=0]"
      }
    ],
    "@skylib/disallow-import/no-at-sign": "off",
    "@skylib/require-jsdoc": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "eslint-comments/no-use": ["warn", { allow: ["eslint", "eslint-disable"] }],
    "max-classes-per-file": "off",
    "unicorn/no-null": "off"
  }
};
