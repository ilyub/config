module.exports = {
  rules: {
    "@skylib/consistent-filename": "off",
    "@skylib/require-jsdoc": "off",
    "@skylib/sort-keys": "off",
    "@skylib/statements-order": [
      "warn",
      {
        rootOrder: [
          "ImportDeclaration",
          "GlobalModuleDeclaration",
          "Unknown",
          "TypeDeclaration",
          "FunctionDeclaration",
          "ModuleDeclaration",
          "ExportAllDeclaration",
          "ExportDeclaration",
          "ExportDefaultDeclaration",
          "ExportTypeDeclaration",
          "ExportFunctionDeclaration",
          "ExportModuleDeclaration",
          "ExportUnknown",
          "JestTest"
        ]
      }
    ]
  }
};
