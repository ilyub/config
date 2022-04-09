const {
  consistentImport,
  disallowByRegexp,
  disallowIdentifier,
  disallowImport,
  es
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
          { selector: "CallExpression > *" },
          {
            selector:
              ":matches(ArrayExpression, ObjectExpression, TSInterfaceBody) > *"
          },
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
    "@skylib/consistent-import": [
      "warn",
      {
        sources: [
          {
            altLocalNames: ["nodeFs"],
            sourcePattern: "fs",
            type: "default"
          },
          {
            localName: "$",
            sourcePattern: "jquery",
            type: "default"
          },
          {
            localName: "_",
            sourcePattern: es ? "lodash-es" : "lodash",
            type: "wildcard"
          },
          {
            altLocalNames: ["nodePath"],
            sourcePattern: "path",
            type: "default"
          },
          ...consistentImport
        ]
      }
    ],
    "@skylib/disallow-by-regexp": [
      "warn",
      {
        rules: [
          // eslint-disable-next-line no-warning-comments -- https://github.com/gajus/eslint-plugin-jsdoc/issues/864
          // fixme
          {
            contexts: ["comment"],
            patterns: [/(?<!\\)[<>]/u.source],
            subOptionsId: "comment.escape"
          },
          ...disallowByRegexp
        ]
      }
    ],
    "@skylib/disallow-identifier": ["warn", { rules: disallowIdentifier }],
    "@skylib/disallow-import": [
      "warn",
      {
        rules: [
          { disallow: ["../src/**"] },
          { disallow: ["@/**"], filesToSkip: ["./tests/**"] },
          {
            disallow: [
              es ? "lodash" : "lodash-es",
              es ? "@skylib/*/dist/**" : "@skylib/*/es/**"
            ]
          },
          ...disallowImport
        ]
      }
    ],
    "@skylib/no-mutable-signature": "off",
    "@skylib/prefer-readonly": "off",
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
