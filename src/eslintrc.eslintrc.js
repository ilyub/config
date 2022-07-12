module.exports = {
  rules: {
    "@skylib/custom/eslintrc-no-unnecessary-array": [
      "warn",
      {
        message: "Unnecessary array",
        selector:
          "Property[key.name=/^(?:extends|files|selector|typeIsNoneOf|typeIsOneOf)$/u] > ArrayExpression[elements.length=1]"
      }
    ],
    "@skylib/sort-array/eslintrc": [
      "warn",
      {
        selector:
          "Property[key.name=/^(?:allow|disallow|files|filesToLint|filesToSkip)$/u] > ArrayExpression"
      }
    ],
    "@skylib/sort-keys": [
      "warn",
      {
        overrides: [
          {
            _id: "eslint",
            customOrder: [
              "files",
              "extends",
              "env",
              "parser",
              "parserOptions",
              "plugins",
              "settings",
              "rules",
              "overrides"
            ],
            selector: [
              "AssignmentExpression[left.object.name=module][left.property.name=exports] > ObjectExpression",
              "Property[key.name=overrides] > ArrayExpression > ObjectExpression"
            ]
          },
          {
            _id: "skylib",
            customOrder: ["_id", "filesToLint", "filesToSkip"],
            selector:
              "Property[key.value=/^@skylib\\u002F/u] > ArrayExpression > ObjectExpression"
          },
          {
            _id: "skylib/disallow-import",
            customOrder: ["disallow", "allow"],
            selector:
              "Property[key.value=/^@skylib\\u002Fdisallow-import\\u002F/u] > ArrayExpression > ObjectExpression"
          }
        ]
      }
    ]
  }
};
