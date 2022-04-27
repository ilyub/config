const { noRestrictedSyntax } = require("./get-options");

module.exports = {
  rules: {
    "no-restricted-syntax": [
      "error",
      ...noRestrictedSyntax,
      {
        message: "Named export in .vue files is disallowed",
        selector: "ExportNamedDeclaration"
      }
    ]
  }
};
