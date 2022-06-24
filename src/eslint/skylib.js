const ignoreTypes = ["^Promise$", "^Readonly", "^Writable"];

module.exports = {
  extends: "plugin:@skylib/eslint-plugin/all",
  overrides: [
    {
      files: "*.js",
      rules: {
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
          {
            autoImportSource: "@sinonjs/fake-timers",
            sourcePattern: "@sinonjs/fake-timers",
            type: "wildcard"
          },
          {
            autoImportSource: "@skylib/lodash-commonjs-es",
            localName: "_",
            sourcePattern: "@skylib/lodash-commonjs-es",
            type: "wildcard"
          },
          {
            altLocalNames: ["vueTestUtils"],
            autoImportSource: "@vue/test-utils",
            sourcePattern: "@vue/test-utils",
            type: "wildcard"
          },
          {
            autoImportSource: "minisearch",
            localName: "MiniSearch",
            sourcePattern: "minisearch",
            type: "default"
          },
          {
            altLocalNames: ["nodeFs"],
            autoImportSource: "fs",
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
            autoImportSource: "jquery",
            localName: "$",
            sourcePattern: "jquery",
            type: "default"
          },
          {
            altLocalNames: ["nodePath"],
            autoImportSource: "path",
            sourcePattern: "path",
            type: "default"
          },
          {
            autoImportSource: "vscode",
            sourcePattern: "vscode",
            type: "wildcard"
          },
          {
            autoImportSource: "vue",
            localName: "Vue",
            sourcePattern: "vue",
            type: "default"
          },
          {
            autoImportSource: "vuedraggable",
            localName: "VueDraggable",
            sourcePattern: "vuedraggable",
            type: "default"
          },
          {
            autoImportSource: "vue-router",
            localName: "VueRouter",
            sourcePattern: "vue-router",
            type: "default"
          },
          { sourcePattern: "!@skylib/**", type: "default" }
        ]
      }
    ],
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
        ignoreTypes
      }
    ],
    "@skylib/no-restricted-syntax": [
      "warn",
      {
        rules: [
          {
            filesToLint: ["./.eslintrc.rule-overrides.js"],
            message: "Disabling rule is unsafe",
            selector:
              "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]",
            subOptionsId: "eslintrc-no-disable"
          },
          {
            filesToLint: ["./.eslintrc.js"],
            message:
              'Define extends in ".eslintrc.overrides.js", ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
            selector: "Property > Identifier.key[name=extends]",
            subOptionsId: "eslintrc-no-extends"
          },
          {
            filesToLint: ["./.eslintrc.js"],
            message:
              'Define overrides in ".eslintrc.overrides.js", ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
            selector: "Property > Identifier.key[name=overrides]",
            subOptionsId: "eslintrc-no-overrides"
          },
          {
            filesToLint: ["./.eslintrc.js", "./.eslintrc.overrides.js"],
            message:
              'Define rules in ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
            selector: "Property > Identifier.key[name=rules]",
            subOptionsId: "eslintrc-no-rules"
          },
          {
            filesToLint: ["./.eslintrc.temp.js"],
            message: "Temporary configuration",
            selector:
              "AssignmentExpression > ObjectExpression[properties.length>0]",
            subOptionsId: "eslintrc-no-temp"
          },
          {
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
              "Property[key.name=/^(extends|files)$/u] > ArrayExpression[elements.length=1]",
            subOptionsId: "eslintrc-no-unnecessary-array"
          },
          {
            message: "Identifier contains invalid character(s)",
            selector: "Identifier[name=/[^$\\w]/u]",
            subOptionsId: "no-invalid-identifier"
          },
          {
            message: "Avoid mixing characters from multiple languages",
            selector: [
              "Literal[value=/[A-Za-z][\\d_]*[А-Яа-я]|[А-Яа-я][\\d_]*[A-Za-z]/u]",
              "TemplateLiteral[value.raw=/[A-Za-z][\\d_]*[А-Яа-я]|[А-Яа-я][\\d_]*[A-Za-z]/u]"
            ],
            subOptionsId: "no-language-mixing"
          },
          {
            message: 'Use arrow function instead of "this: void"',
            selector:
              "Identifier[name=this][typeAnnotation.typeAnnotation.type=TSVoidKeyword]",
            subOptionsId: "no-this-void"
          },
          {
            message: 'Prefer "boolean" type',
            selector:
              "TSPropertySignature[optional=true] > .typeAnnotation > TSLiteralType.typeAnnotation > .literal[value=true]",
            subOptionsId: "no-optional-true-type"
          },
          {
            message: "Underscore export is not allowed",
            selector: [
              "ExportNamedDeclaration > FunctionDeclaration.declaration > Identifier.id[name=/^_/u]",
              "ExportNamedDeclaration > VariableDeclaration.declaration > VariableDeclarator.declarations > Identifier.id[name=/^_/u]"
            ],
            subOptionsId: "no-underscore-export"
          },
          {
            message: 'Unnecessary "break" statement',
            selector: "SwitchCase:last-child > BreakStatement.consequent",
            subOptionsId: "no-unnecessary-break"
          },
          {
            message: "Unnecessary initialization",
            selector: [
              "PropertyDefinition > Identifier.value[name=undefined]",
              "VariableDeclarator > Identifier.init[name=undefined]"
            ],
            subOptionsId: "no-unnecessary-initialization"
          },
          {
            message: "Prefer arrow function",
            selector: "Property > FunctionExpression.value",
            subOptionsId: "prefer-arrow-function-property"
          },
          {
            message: 'Prefer "toBe" matcher',
            selector:
              "CallExpression[callee.property.name=toStrictEqual] > :matches(Literal, TemplateLiteral).arguments",
            subOptionsId: "prefer-jest-toBe"
          },
          {
            message:
              'Prefer error message or "Error" as an argument of "toThrow" matcher',
            selector:
              "CallExpression[callee.property.name=toThrow] > NewExpression.arguments[arguments.length=0]",
            subOptionsId: "prefer-jest-toThrow-shorthand"
          },
          {
            message: 'Prefer "toStrictEqual" matcher',
            selector:
              "CallExpression[callee.property.name=toBe] > :not(Literal, TemplateLiteral).arguments",
            subOptionsId: "prefer-jest-toStrictEqual"
          },
          {
            message: "Prefer kebab-case symbol description",
            selector:
              "CallExpression[callee.name=Symbol] > Literal.arguments:not([value=/^[\\d\\-a-z]+$/u])",
            subOptionsId: "prefer-kebab-case-symbol-description"
          },
          {
            filesToSkip: ["*.js"],
            message: "Prefer readonly property",
            selector: [
              ":matches(PropertyDefinition, TSPropertySignature)[readonly!=true]"
            ],
            subOptionsId: "prefer-readonly-property"
          },
          {
            message: "Prefer arrow function",
            selector: "MethodDefinition[static=true]",
            subOptionsId: "prefer-static-method-arrow"
          },
          {
            filesToLint: ["./.prettierrc.js"],
            message: "Expecting 4 options",
            selector:
              "AssignmentExpression > ObjectExpression.right[properties.length!=4]",
            subOptionsId: "prettier-structure"
          },
          {
            filesToLint: ["./.prettierrc.js"],
            message: "Invalid option",
            selector: [
              "Property[key.name=arrowParens] > Literal.value[value!=avoid]",
              "Property[key.name=endOfLine] > Literal.value[value!=lf]",
              "Property[key.name=quoteProps] > Literal.value[value!=preserve]",
              "Property[key.name=trailingComma] > Literal.value[value!=none]"
            ],
            subOptionsId: "prettier-options"
          },
          {
            message: 'Assign "require" to variable',
            selector:
              ":not(ReturnStatement, VariableDeclarator) > CallExpression > Identifier.callee[name=require]",
            subOptionsId: "require-assign-to-var"
          },
          {
            message: "Prefer conditional expression",
            selector:
              "LogicalExpression[operator=??][left.type=ChainExpression]",
            subOptionsId: "restrict-chain-expression"
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
