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
    "@skylib/no-at-sign-import": "off",
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
