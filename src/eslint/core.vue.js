const { noRestrictedSyntax } = require("./getOptions");

noRestrictedSyntax.push({
  message: "Named export in .vue files is disallowed",
  selector: "ExportNamedDeclaration"
});

module.exports = {
  rules: { "no-restricted-syntax": ["error", ...noRestrictedSyntax] }
};
