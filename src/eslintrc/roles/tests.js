module.exports = {
  extends: [
    "../plugins/jest",
    "../plugins/jest-extended",
    "../options/allow-global-access",
    "../options/allow-nodejs-modules",
    "../options/allow-require",
    "../options/allow-require-unsafe",
    "../options/skip-filename-check",
    "../options/skip-html-literal-check"
  ],
  env: { jest: true },
  rules: {
    "@skylib/custom/no-jest-toThrow-string": [
      "warn",
      {
        message: "String argument is not allowed",
        selector: "CallExpression[callee.property.name=toThrow] > .arguments",
        typeIs: "string"
      }
    ],
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
    "@skylib/disallow-import/no-at-sign": "off",
    "@skylib/require-jsdoc": "off",
    "@skylib/statements-order": [
      "warn",
      {
        rootOrder: [
          "ImportDeclaration",
          "GlobalModuleDeclaration",
          "ExportAllDeclaration",
          "ExportDeclaration",
          "ExportDefaultDeclaration",
          "ExportUnknown",
          "ExportTypeDeclaration",
          "ExportFunctionDeclaration",
          "ExportModuleDeclaration",
          "TypeDeclaration",
          "FunctionDeclaration",
          "ModuleDeclaration",
          "Unknown",
          "JestTest"
        ]
      }
    ],
    "@typescript-eslint/no-extraneous-class": "off",
    "eslint-comments/no-use": ["warn", { allow: ["eslint", "eslint-disable"] }],
    "max-classes-per-file": "off",
    "unicorn/no-null": "off"
  }
};
