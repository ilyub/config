module.exports = {
  rules: {
    "@skylib/require-jsdoc": "off",
    "@skylib/sort-keys": "off",
    "@skylib/statements-order": [
      "warn",
      {
        rootOrder: [
          "ImportDeclaration",
          "GlobalModuleDeclaration",
          "ExportDeclaration",
          "ExportTypeDeclaration",
          "ExportFunctionDeclaration",
          "ExportModuleDeclaration",
          "ExportUnknown",
          "TypeDeclaration",
          "FunctionDeclaration",
          "ModuleDeclaration",
          "Unknown",
          "ExportDefaultDeclaration",
          "JestTest"
        ]
      }
    ]
  }
};
