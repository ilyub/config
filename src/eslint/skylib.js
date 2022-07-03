const { eslint } = require("../../api");

const ignoreTypes = eslint.skylib.readonliness.ignoreTypes;

module.exports = {
  extends: "plugin:@skylib/eslint-plugin/all",
  overrides: [
    {
      files: "*.js",
      rules: {
        "@skylib/array-callback-return-type": "off",
        "@skylib/no-mutable-signature": "off",
        "@skylib/no-unsafe-object-assignment": "off",
        "@skylib/prefer-readonly": "off"
      }
    },
    {
      files: "*.vue",
      rules: {
        "@skylib/require-jsdoc": "off",
        "@skylib/sort-keys": "off",
        "@skylib/statements-order": [
          "warn",
          {
            rootOrder: [
              "ImportDeclaration",
              "GlobalModuleDeclaration",
              "Unknown",
              "TypeDeclaration",
              "FunctionDeclaration",
              "ModuleDeclaration",
              "ExportAllDeclaration",
              "ExportDeclaration",
              "ExportDefaultDeclaration",
              "ExportTypeDeclaration",
              "ExportFunctionDeclaration",
              "ExportModuleDeclaration",
              "ExportUnknown",
              "JestTest"
            ]
          }
        ]
      }
    }
  ],
  rules: {
    "@skylib/consistent-empty-lines": [
      "warn",
      {
        rules: [
          {
            _id: "main",
            emptyLine: "always",
            next: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > :matches(:statement, TSDeclareFunction, TSExportAssignment)",
            prev: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > :matches(:statement, TSDeclareFunction, TSExportAssignment)"
          },
          {
            _id: "ExpressionStatement",
            emptyLine: "any",
            next: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExpressionStatement",
            prev: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExpressionStatement"
          },
          {
            _id: "ImportDeclaration",
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
          { _id: "ArrayExpression", selector: "ArrayExpression > .elements" },
          { _id: "CallExpression", selector: "CallExpression > .arguments" },
          {
            _id: "ExpressionStatement",
            averageLinesGte: 3,
            everyLinesGte: 2,
            selector:
              ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExpressionStatement",
            someHasDocComment: true,
            someLinesGte: 6
          },
          {
            _id: "FunctionDeclaration",
            selector: "FunctionDeclaration > .params"
          },
          {
            _id: "FunctionExpression",
            selector: "FunctionExpression > .params"
          },
          { _id: "ImportDeclaration", selector: "ImportDeclaration" },
          {
            _id: "ObjectExpression",
            selector: "ObjectExpression > .properties"
          },
          { _id: "TSDeclareFunction", selector: "TSDeclareFunction > .params" },
          { _id: "TSFunctionType", selector: "TSFunctionType > .params" },
          { _id: "TSInterfaceBody", selector: "TSInterfaceBody > .body" },
          { _id: "TSTypeLiteral", selector: "TSTypeLiteral > .members" }
        ]
      }
    ],
    "@skylib/consistent-import": [
      "warn",
      {
        sources: [
          {
            _id: "@sinonjs/fake-timers",
            autoImport: true,
            source: "@sinonjs/fake-timers",
            type: "wildcard"
          },
          {
            _id: "@skylib/lodash-commonjs-es",
            autoImport: true,
            localName: "_",
            source: "@skylib/lodash-commonjs-es",
            type: "wildcard"
          },
          {
            _id: "@vue/test-utils",
            altLocalNames: ["vueTestUtils"],
            autoImport: true,
            source: "@vue/test-utils",
            type: "wildcard"
          },
          {
            _id: "@vue/test-utils",
            autoImport: true,
            localName: "WrapperLike",
            source: "@vue/test-utils/dist/interfaces/wrapperLike",
            type: "default"
          },
          {
            _id: "fs",
            altLocalNames: ["nodeFs"],
            autoImport: true,
            source: "fs",
            type: "default"
          },
          {
            _id: "jest-extended/all",
            altLocalNames: ["jestExtendedMatchers"],
            localName: "matchers",
            source: "jest-extended/all",
            type: "default"
          },
          {
            _id: "jquery",
            autoImport: true,
            localName: "$",
            source: "jquery",
            type: "default"
          },
          {
            _id: "minisearch",
            autoImport: true,
            localName: "MiniSearch",
            source: "minisearch",
            type: "default"
          },
          {
            _id: "path",
            altLocalNames: ["nodePath"],
            autoImport: true,
            source: "path",
            type: "default"
          },
          {
            _id: "ts",
            autoImport: true,
            localName: "ts",
            source: "typescript",
            type: "wildcard"
          },
          {
            _id: "tsutils",
            autoImport: true,
            source: "tsutils",
            type: "wildcard"
          },
          {
            _id: "vscode",
            autoImport: true,
            source: "vscode",
            type: "wildcard"
          },
          {
            _id: "vue",
            autoImport: true,
            localName: "Vue",
            source: "vue",
            type: "default"
          },
          {
            _id: "vue-router",
            autoImport: true,
            localName: "VueRouter",
            source: "vue-router",
            type: "default"
          },
          {
            _id: "vuedraggable",
            autoImport: true,
            localName: "VueDraggable",
            source: "vuedraggable",
            type: "default"
          },
          {
            _id: "catch-all",
            source: "!@skylib/**",
            type: "default"
          }
        ]
      }
    ],
    "@skylib/disallow-import": [
      "warn",
      {
        rules: [
          {
            _id: "at-sign",
            disallow: ["@", "@/**"],
            filesToSkip: ["./tests/**"]
          },
          {
            _id: "dot",
            disallow: [
              ".",
              "../src/**",
              "../../src/**",
              "../../../src/**",
              "../../../../src/**",
              "../../../../../src/**"
            ]
          }
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
        ignoreTypes
      }
    ],
    "@skylib/no-restricted-syntax": [
      "warn",
      {
        rules: [
          {
            _id: "consistent-array-type-name",
            message: 'Array type name should end with "s"',
            selector: "TSTypeAliasDeclaration > Identifier[name=/(?<!s)$/u]",
            typeIs: "array"
          },
          {
            _id: "consistent-non-array-type-name",
            message: 'Non-array type name may not end with "s"',
            selector: "TSTypeAliasDeclaration > Identifier[name=/s$/u]",
            typeIsNot: "array"
          },
          {
            _id: "eslintrc-no-disable",
            filesToLint: ["./.eslintrc.rule-overrides.js"],
            message: "Disabling rule is unsafe",
            selector:
              "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]"
          },
          {
            _id: "eslintrc-no-overrides",
            filesToLint: ["./.eslintrc.js"],
            message:
              'Define overrides in ".eslintrc.overrides.js", ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
            selector: "Property > Identifier.key[name=overrides]"
          },
          {
            _id: "eslintrc-no-rules",
            filesToLint: ["./.eslintrc.js", "./.eslintrc.overrides.js"],
            message:
              'Define rules in ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
            selector: "Property > Identifier.key[name=rules]"
          },
          {
            _id: "eslintrc-no-temp",
            filesToLint: ["./.eslintrc.temp.js"],
            message: "Temporary configuration",
            selector:
              "AssignmentExpression > ObjectExpression[properties.length>0]"
          },
          {
            _id: "eslintrc-no-unnecessary-array",
            filesToLint: [
              ".eslintrc.js",
              ".eslintrc.fast.js",
              ".eslintrc.overrides.js",
              ".eslintrc.rule-overrides.js",
              ".eslintrc.temp.js",
              "./**/eslintrc.js",
              "./**/eslint/*.js"
            ],
            message: "Unnecessary array",
            selector:
              "Property[key.name=/^(extends|files)$/u] > ArrayExpression[elements.length=1]"
          },
          {
            _id: "no-invalid-identifier",
            message: "Identifier contains invalid character(s)",
            selector: "Identifier[name=/[^$\\w]/u]"
          },
          {
            _id: "no-language-mixing",
            message: "No language mixing",
            selector: [
              "Literal[value=/[A-Za-z][\\d_]*[А-Яа-я]|[А-Яа-я][\\d_]*[A-Za-z]/u]",
              "TemplateLiteral[value.raw=/[A-Za-z][\\d_]*[А-Яа-я]|[А-Яа-я][\\d_]*[A-Za-z]/u]"
            ]
          },
          {
            _id: "no-optional-true-type",
            message: 'Prefer "boolean" type',
            selector:
              "TSPropertySignature[optional=true] > .typeAnnotation > TSLiteralType.typeAnnotation > .literal[value=true]"
          },
          {
            _id: "no-this-void",
            message: 'Use arrow function instead of "this: void"',
            selector:
              "Identifier[name=this][typeAnnotation.typeAnnotation.type=TSVoidKeyword]"
          },
          {
            _id: "no-underscore-export",
            message: "Underscore export is not allowed",
            selector: [
              "ExportNamedDeclaration > FunctionDeclaration > Identifier.id[name=/^_/u]",
              "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
            ]
          },
          {
            _id: "no-unnecessary-break",
            message: 'Unnecessary "break" statement',
            selector: "SwitchCase:last-child > BreakStatement.consequent"
          },
          {
            _id: "no-unnecessary-initialization",
            message: "Unnecessary initialization",
            selector: [
              "PropertyDefinition > Identifier.value[name=undefined]",
              "VariableDeclarator > Identifier.init[name=undefined]"
            ]
          },
          {
            _id: "prefer-arrow-function-property",
            message: "Prefer arrow function",
            selector: "Property > FunctionExpression.value"
          },
          {
            _id: "prefer-call-signature-first",
            message: "Call signature should be first",
            selector:
              "TSInterfaceBody > TSCallSignatureDeclaration:not(:first-child)"
          },
          {
            _id: "prefer-const-object",
            message: 'Expecting "as const" object',
            selector:
              ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > ObjectExpression"
          },
          {
            _id: "prefer-construct-signature-first",
            message: "Construct signature should be first",
            selector:
              "TSInterfaceBody > TSConstructSignatureDeclaration:not(:first-child)"
          },
          {
            _id: "prefer-jest-toBe",
            message: 'Prefer "toBe" matcher',
            selector:
              "CallExpression[callee.property.name=toStrictEqual] > .arguments",
            typeIsOneOf: ["boolean", "number", "string"]
          },
          {
            _id: "prefer-jest-toStrictEqual",
            message: 'Prefer "toStrictEqual" matcher',
            selector: "CallExpression[callee.property.name=toBe] > .arguments",
            typeIsNoneOf: ["boolean", "number", "string"]
          },
          {
            _id: "prefer-jest-toThrow-shorthand",
            message:
              'Prefer error message or "Error" as an argument of "toThrow" matcher',
            selector:
              "CallExpression[callee.property.name=toThrow] > NewExpression.arguments[arguments.length=0]"
          },
          {
            _id: "prefer-kebab-case-symbol-description",
            message: "Prefer kebab-case symbol description",
            selector:
              "CallExpression[callee.name=Symbol] > Literal.arguments:not([value=/^[\\d\\-a-z]+$/u])"
          },
          {
            _id: "prefer-readonly-array",
            message: "Prefer readonly array",
            selector: ":not(TSTypeOperator[operator=readonly]) > TSArrayType"
          },
          {
            _id: "prefer-readonly-property",
            filesToSkip: ["*.js"],
            message: "Prefer readonly property",
            selector: [
              ":matches(PropertyDefinition, TSPropertySignature)[readonly!=true]"
            ]
          },
          {
            _id: "prefer-static-method-arrow",
            message: "Prefer arrow function",
            selector: "MethodDefinition[static=true]"
          },
          {
            _id: "prettier-options",
            filesToLint: ["./.prettierrc.js"],
            message: "Invalid option",
            selector: [
              "Property[key.name=arrowParens] > Literal.value[value!=avoid]",
              "Property[key.name=endOfLine] > Literal.value[value!=lf]",
              "Property[key.name=quoteProps] > Literal.value[value!=preserve]",
              "Property[key.name=trailingComma] > Literal.value[value!=none]"
            ]
          },
          {
            _id: "prettier-structure",
            filesToLint: ["./.prettierrc.js"],
            message: "Expecting 4 options",
            selector:
              "AssignmentExpression > ObjectExpression.right[properties.length!=4]"
          },
          {
            _id: "require-assign-to-var",
            message: 'Assign "require" to variable',
            selector:
              ":not(ReturnStatement, VariableDeclarator) > CallExpression > Identifier.callee[name=require]"
          },
          {
            _id: "restrict-chain-expression",
            message: "Prefer conditional expression",
            selector:
              "LogicalExpression[operator=??][left.type=ChainExpression]"
          },
          {
            _id: "vue-no-empty-lines",
            message: "Unexpected empty line",
            selector: "VElement[name=template] VText[value=/^\n\n/u]"
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
        ignoreTypes
      }
    ],
    "@skylib/prefer-readonly-props": "off",
    "@skylib/require-jsdoc": [
      "warn",
      {
        excludeSelectors: ["ClassDeclaration", "FunctionDeclaration"],
        includeSelectors: [
          ...[
            "FunctionDeclaration",
            "VariableDeclaration > .declarations > .id > .typeAnnotation > TSFunctionType",
            "VariableDeclaration > .declarations[id.typeAnnotation=undefined] > ObjectExpression > .properties > :matches(ArrowFunctionExpression, FunctionExpression)",
            "VariableDeclaration > .declarations[id.typeAnnotation=undefined] > TSAsExpression > ObjectExpression > .properties > :matches(ArrowFunctionExpression, FunctionExpression)"
          ].map(
            selector =>
              `:matches(ExportNamedDeclaration, Program, TSModuleBlock) >  ${selector}`
          ),
          "PropertyDefinition > :matches(ArrowFunctionExpression, FunctionExpression)"
        ],
        interfaces: ["callSignatures", "constructSignatures"],
        properties: ["function"]
      }
    ],
    "@skylib/sort-array": [
      "warn",
      {
        rules: [
          {
            _id: "skylib-eslint-plugin",
            key: "_id",
            selector:
              "Property[key.value=/^@skylib/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:overrides|rules|sources)$/u] > ArrayExpression",
            sendToBottom: /^catch-all(?::|$)/u.source,
            sendToTop: /^main(?::|$)/u.source
          }
        ]
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
