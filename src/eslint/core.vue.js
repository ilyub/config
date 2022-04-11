module.exports = {
  rules: {
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/eslint-plugin update
    // fixme
    "no-restricted-syntax": [
      "error",
      {
        message: "Named export in .vue files is disallowed",
        selector: "ExportNamedDeclaration"
      },
      {
        message: "Underscore export is disallowed",
        selector:
          "ExportNamedDeclaration > FunctionDeclaration > Identifier.id[name=/^_/u]"
      },
      {
        message: "Underscore export is disallowed",
        selector:
          "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
      },
      {
        message: 'Use "Extends" type from "ts-toolbelt" package instead',
        selector: "TSConditionalType"
      }
    ]
  }
};
