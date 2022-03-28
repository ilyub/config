const fs = require("fs");

const options = loadOptions(fs.realpathSync("./.eslintrc.options.js"));

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
            next: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > :matches(:statement, TSExportAssignment, TSDeclareFunction)",
            prev: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > :matches(:statement, TSExportAssignment, TSDeclareFunction)"
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
            sourcePattern: options.es ? "lodash-es" : "lodash",
            type: "wildcard"
          },
          {
            altLocalNames: ["nodePath"],
            sourcePattern: "path",
            type: "default"
          },
          ...options.consistentImport
        ]
      }
    ],
    "@skylib/disallow-by-regexp": [
      "warn",
      {
        rules: [
          {
            contexts: ["comment"],
            patterns: [/\/\* webpackChunkName:(?! "dynamic\/)/u.source]
          },
          ...options.disallowByRegexp
        ],
        subOptionsId: "webpackChunkName"
      }
    ],
    "@skylib/disallow-identifier": [
      "warn",
      { rules: options.disallowIdentifier }
    ],
    "@skylib/disallow-import": [
      "warn",
      {
        rules: [
          { disallow: ["../src/**"] },
          { disallow: ["@/**"], filesToSkip: ["./tests/**"] },
          {
            disallow: [
              options.es ? "lodash" : "lodash-es",
              options.es ? "@skylib/*/dist/**" : "@skylib/*/es/**"
            ]
          },
          ...options.disallowImport
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

/**
 * Assigns raw options.
 *
 * @param dest - Options.
 * @param source - Raw options.
 */
function assignRawOptions(dest, source) {
  if ("consistentImport" in source)
    dest.consistentImport.push(...source.consistentImport);

  if ("disallowByRegexp" in source)
    dest.disallowByRegexp.push(...source.disallowByRegexp);

  if ("disallowIdentifier" in source)
    dest.disallowIdentifier.push(...source.disallowIdentifier);

  if ("disallowImport" in source)
    dest.disallowImport.push(...source.disallowImport);

  if ("es" in source) dest.es = source.es;
}

/**
 * Loads options.
 *
 * @param source - Source.
 * @returns Options.
 */
function loadOptions(source) {
  const result = {
    consistentImport: [],
    disallowByRegexp: [],
    disallowIdentifier: [],
    disallowImport: [],
    es: false
  };

  const rawOptions = loadRawOptions(source);

  for (const extend of rawOptions.extends ?? [])
    assignRawOptions(result, loadRawOptions(extend));

  assignRawOptions(result, rawOptions);

  return result;
}

/**
 * Loads raw options.
 *
 * @param source - Source.
 * @returns Raw options.
 */
function loadRawOptions(source) {
  switch (typeof source) {
    case "object":
      return source;

    case "string":
      return fs.existsSync(source) ? require(source) : {};

    default:
      throw new Error("Invalid source");
  }
}
