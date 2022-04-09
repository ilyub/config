module.exports = {
  rules: {
    "@skylib/no-mutable-signature": "off",
    "@skylib/no-unsafe-object-assignment": "off",
    "@skylib/prefer-readonly": "off",
    "@skylib/statements-order": [
      "warn",
      {
        rootOrder: [
          "ImportDeclaration",
          "ModuleDeclaration",
          "ExportDefaultDeclaration",
          "ExportDeclaration",
          "ExportTypeDeclaration",
          "ExportFunctionDeclaration",
          "ExportUnknown",
          "TypeDeclaration",
          "FunctionDeclaration",
          "Unknown"
        ]
      }
    ]
  }
};
