module.exports = {
  rules: {
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/eslint-plugin update
    // fixme
    "no-restricted-syntax": [
      "error",
      {
        message: "No named export in .vue files",
        selector: "ExportNamedDeclaration"
      }
    ]
  }
};
