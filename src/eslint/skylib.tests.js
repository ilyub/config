module.exports = {
  rules: {
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
