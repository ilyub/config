const {
  consistentImport,
  disallowByRegexp,
  disallowIdentifier,
  disallowImport
} = require("./getOptions");

module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    ...require("./getAll")("@skylib/eslint-plugin"),
    "@skylib/consistent-empty-lines": [
      "warn",
      {
        rules: [
          {
            emptyLine: "always",
            next: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > :matches(:statement, TSDeclareFunction, TSExportAssignment)",
            prev: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > :matches(:statement, TSDeclareFunction, TSExportAssignment)"
          },
          {
            emptyLine: "any",
            next: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExpressionStatement",
            prev: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExpressionStatement"
          },
          {
            emptyLine: "any",
            next: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ImportDeclaration",
            prev: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ImportDeclaration"
          }
        ]
      }
    ],
    "@skylib/consistent-group-empty-lines": [
      "warn",
      {
        rules: [
          { selector: "ArrayExpression > *" },
          { selector: "CallExpression > *.arguments" },
          { selector: "FunctionDeclaration > *.params" },
          { selector: "ImportDeclaration" },
          { selector: "ObjectExpression > *" },
          { selector: "TSDeclareFunction > *.params" },
          { selector: "TSFunctionType > *.params" },
          { selector: "TSInterfaceBody > *" },
          {
            averageLinesGte: 3,
            everyLinesGte: 2,
            selector:
              ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExpressionStatement",
            someHasDocComment: true,
            someLinesGte: 5
          }
        ]
      }
    ],
    "@skylib/consistent-import": ["warn", { sources: consistentImport }],
    "@skylib/disallow-by-regexp": ["warn", { rules: disallowByRegexp }],
    "@skylib/disallow-identifier": ["warn", { rules: disallowIdentifier }],
    "@skylib/disallow-import": ["warn", { rules: disallowImport }],
    "@skylib/no-mutable-signature": [
      "warn",
      {
        ignoreClasses: true,
        ignoreIdentifiers: [/^mutable/u.source],
        ignoreInferredTypes: true,
        ignoreInterfaces: true,
        ignoreNumberSignature: true,
        ignoreTypes: [
          "^Promise$",
          "^ReadonlyMap$",
          "^ReadonlySet$",
          "^Writable"
        ]
      }
    ],
    "@skylib/optional-property-style": [
      "warn",
      { classes: "undefined", interfaces: "optional" }
    ],
    "@skylib/prefer-readonly": [
      "warn",
      {
        ignoreClasses: true,
        ignoreIdentifiers: [/^mutable/u.source],
        ignoreInferredTypes: true,
        ignoreInterfaces: true,
        ignoreTypes: [
          "^Promise$",
          "^ReadonlyMap$",
          "^ReadonlySet$",
          "^Writable"
        ]
      }
    ],
    "@skylib/require-jsdoc": [
      "warn",
      {
        excludeSelectors: ["ClassDeclaration", "FunctionDeclaration"],
        includeSelectors: [
          ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > FunctionDeclaration",
          ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > :matches(CallExpression[callee.name='assign'], CallExpression[callee.property.name='assign']) > :matches(ArrowFunctionExpression,FunctionExpression)",
          ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > :matches(CallExpression[callee.name='assign'], CallExpression[callee.property.name='assign']) > ObjectExpression > Property > :matches(ArrowFunctionExpression,FunctionExpression)"
        ],
        interfaces: ["callSignatures", "constructSignatures"],
        properties: ["function"]
      }
    ],
    "@skylib/sort-class-members": [
      "warn",
      {
        sortingOrder: [
          "public-static-field",
          "public-static-accessor",
          "public-static-constructor",
          "public-static-method",
          "signature",
          "public-dynamic-field",
          "public-dynamic-accessor",
          "public-dynamic-constructor",
          "public-dynamic-method",
          "protected-static-field",
          "protected-static-accessor",
          "protected-static-constructor",
          "protected-static-method",
          "protected-dynamic-field",
          "protected-dynamic-accessor",
          "protected-dynamic-constructor",
          "protected-dynamic-method",
          "private-static-field",
          "private-static-accessor",
          "private-static-constructor",
          "private-static-method",
          "private-dynamic-field",
          "private-dynamic-accessor",
          "private-dynamic-constructor",
          "private-dynamic-method"
        ]
      }
    ]
  }
};
