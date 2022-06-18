const {
  disallowIdentifier,
  readonlyTypes,
  requireJsdoc
} = require("./get-options");

module.exports = {
  extends: ["plugin:@skylib/eslint-plugin/all"],
  overrides: [
    {
      files: ["*.d.ts", "*.internal.ts", "**/__mocks__/**"],
      rules: { "@skylib/only-export-name": "off" }
    }
  ],
  rules: {
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
          { selector: "ArrayExpression > .elements" },
          { selector: "CallExpression > .arguments" },
          { selector: "FunctionDeclaration > .params" },
          { selector: "FunctionExpression > .params" },
          { selector: "ImportDeclaration" },
          { selector: "ObjectExpression > .properties" },
          { selector: "TSDeclareFunction > .params" },
          { selector: "TSFunctionType > .params" },
          { selector: "TSInterfaceBody > .body" },
          { selector: "TSTypeLiteral > .members" },
          {
            averageLinesGte: 3,
            everyLinesGte: 2,
            selector:
              ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExpressionStatement",
            someHasDocComment: true,
            someLinesGte: 6
          }
        ]
      }
    ],
    "@skylib/consistent-import": [
      "warn",
      {
        sources: [
          { sourcePattern: "@sinonjs/fake-timers", type: "wildcard" },
          {
            localName: "_",
            sourcePattern: "@skylib/lodash-commonjs-es",
            type: "wildcard"
          },
          {
            altLocalNames: ["vueTestUtils"],
            sourcePattern: "@vue/test-utils",
            type: "wildcard"
          },
          {
            altLocalNames: ["nodeFs"],
            sourcePattern: "fs",
            type: "default"
          },
          {
            altLocalNames: ["jestExtendedMatchers"],
            localName: "matchers",
            sourcePattern: "jest-extended/all",
            type: "default"
          },
          {
            localName: "$",
            sourcePattern: "jquery",
            type: "default"
          },
          {
            altLocalNames: ["nodePath"],
            sourcePattern: "path",
            type: "default"
          },
          {
            localName: "Vue",
            sourcePattern: "vue",
            type: "default"
          },
          {
            localName: "VueRouter",
            sourcePattern: "vue-router",
            type: "default"
          },
          { sourcePattern: "!@skylib/**", type: "default" }
        ]
      }
    ],
    "@skylib/disallow-by-regexp": "off",
    "@skylib/disallow-identifier": ["warn", { rules: disallowIdentifier }],
    "@skylib/disallow-import": [
      "warn",
      {
        rules: [
          {
            disallow: [
              ".",
              "../src/**",
              "../../src/**",
              "../../../src/**",
              "../../../../src/**",
              "../../../../../src/**"
            ]
          },
          { disallow: ["@", "@/**"], filesToSkip: ["./tests/**"] }
        ]
      }
    ],
    "@skylib/no-mutable-signature": [
      "warn",
      {
        ignoreClasses: true,
        ignoreIdentifiers: [/^mutable/u.source],
        ignoreInferredTypes: true,
        ignoreInterfaces: true,
        ignoreNumberSignature: true,
        ignoreTypes: readonlyTypes
      }
    ],
    "@skylib/no-restricted-syntax": [
      "warn",
      {
        rules: [
          {
            message: "Identifier contains disallowed character(s)",
            selector: "Identifier[name=/[^$\\w]/u]"
          },
          {
            message: "String literal contains disallowed character(s)",
            selector:
              "Literal[value=/[A-Za-z][\\d_]*[А-Яа-я]|[А-Яа-я][\\d_]*[A-Za-z]/u]"
          },
          {
            message: "Template literal contains disallowed character(s)",
            selector:
              "TemplateElement[value.raw=/[A-Za-z][\\d_]*[А-Яа-я]|[А-Яа-я][\\d_]*[A-Za-z]/u]"
          },
          {
            message: "Prefer kebab-case ID",
            selector:
              "CallExpression[callee.name=Symbol] > Literal.arguments:not([value=/^[\\d\\-a-z]+$/u])"
          },
          {
            message: 'Use "toStrictEqual" instead',
            selector:
              "CallExpression[callee.property.name=toBe] > :not(Literal, TemplateElement).arguments"
          },
          {
            message: 'Use "toBe" instead',
            selector:
              "CallExpression[callee.property.name=toStrictEqual] > :matches(Literal, TemplateElement).arguments"
          },
          {
            message: 'Prefer "Error" instead of "new Error()"',
            selector:
              "CallExpression[callee.property.name=toThrow] > NewExpression.arguments[arguments.length=0]"
          },
          {
            message: "Underscore export is not allowed",
            selector:
              "ExportNamedDeclaration > FunctionDeclaration.declaration > Identifier.id[name=/^_/u]"
          },
          {
            message: "Prefer arrow function",
            selector: "Property > FunctionExpression.value"
          },
          {
            message: "Prefer named export all declaration",
            selector: "ExportAllDeclaration[exported=null]"
          },
          {
            message: "Underscore export is not allowed",
            selector:
              "ExportNamedDeclaration > VariableDeclaration.declaration > VariableDeclarator.declarations > Identifier.id[name=/^_/u]"
          },
          {
            message: "Either re-export single item or use star re-export",
            selector: "ExportNamedDeclaration[source][specifiers.length>1]"
          },
          {
            message: "Use arrow function instead",
            selector:
              "Identifier[name=this][typeAnnotation.typeAnnotation.type=TSVoidKeyword]"
          },
          {
            message: "Prefer conditional expression",
            selector:
              "LogicalExpression[operator=??][left.type=ChainExpression]"
          },
          {
            message: "Unnecessary initialization",
            selector: "PropertyDefinition > Identifier.value[name=undefined]"
          },
          {
            message: 'Unnecessary "break" statement',
            selector: "SwitchCase:last-child > BreakStatement.consequent"
          },
          {
            message: 'Prefer "boolean" type',
            selector:
              "TSPropertySignature[optional=true] > TSTypeAnnotation.typeAnnotation > TSLiteralType.typeAnnotation > Literal.literal[value=true]"
          },
          {
            message: "Prefer readonly property",
            selector: "TSPropertySignature[readonly!=true]"
          },
          {
            message: "Unnecessary initialization",
            selector: "VariableDeclarator > Identifier.init[name=undefined]"
          }
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
        ignoreTypes: readonlyTypes
      }
    ],
    "@skylib/prefer-readonly-props": "off",
    "@skylib/require-jsdoc": [
      "warn",
      {
        excludeSelectors: ["ClassDeclaration", "FunctionDeclaration"],
        includeSelectors: requireJsdoc,
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
    ],
    "@skylib/statements-order": [
      "warn",
      {
        rootOrder: [
          "ImportDeclaration",
          "GlobalModuleDeclaration",
          "ExportAllDeclaration",
          "ExportDeclaration",
          "ExportDefaultDeclaration",
          "ExportUnknown",
          "ExportTypeDeclaration",
          "ExportFunctionDeclaration",
          "ExportModuleDeclaration",
          "Unknown",
          "TypeDeclaration",
          "FunctionDeclaration",
          "ModuleDeclaration",
          "JestTest"
        ]
      }
    ]
  }
};
