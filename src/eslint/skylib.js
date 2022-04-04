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
          // eslint-disable-next-line no-warning-comments -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/4779
          // fixme
          {
            contexts: ["code"],
            patterns: [
              /\b(?!extraChoreLocations)(?!extraDefaultExportLocations)(?!extraTestsLocations)(?!extraUnassignedImportLocations)(?!extraUtilsLocations)(?!ignoreFunctionTypeParameterNameValueShadow)(?!requireReturnForObjectLiteral)(?!onlyFunctionsWithExpectInCallback)(?!onlyFunctionsWithExpectInLoop)\w{26,}/u
                .source
            ],
            subOptionsId: "id-length"
          },
          // eslint-disable-next-line no-warning-comments -- Wait for @skylib/eslint-plugin update
          // fixme
          {
            contexts: ["code"],
            patterns: [
              /\bexport (async function|const|function|var) _\w+/u.source
            ],
            subOptionsId: "no-underscore-export"
          },
          {
            contexts: ["comment"],
            patterns: [/(?<!\\)[<>]/u.source],
            subOptionsId: "comment.escape"
          },
          {
            contexts: ["comment"],
            patterns: [/\/\* webpackChunkName:(?! "dynamic\/)/u.source],
            subOptionsId: "comment.webpackChunkName"
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
          ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > ExpressionStatement > AssignmentExpression > ArrowFunctionExpression",
          ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > FunctionDeclaration"
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
