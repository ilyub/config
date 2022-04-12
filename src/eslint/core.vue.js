const { noRestrictedSyntax } = require("./getOptions");

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
