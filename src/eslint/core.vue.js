// eslint-disable-next-line no-warning-comments -- Postponed
// fixme
module.exports = {
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        message: "Named export in .vue files is disallowed",
        selector: "ExportNamedDeclaration"
      }
    ]
  }
};
