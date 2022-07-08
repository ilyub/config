const { eslint } = require("../../api");

const fs = require("node:fs");

const rules = fs.existsSync("./.eslintrc.synonyms.js")
  ? require(fs.realpathSync("./.eslintrc.synonyms.js"))
  : [];

module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    ...eslint.getAllRules("@skylib/eslint-plugin", rule =>
      /^[^/]+\/[^/]+$/u.test(rule)
    ),
    ...Object.fromEntries(rules.map(rule => [rule, "warn"])),
    "@skylib/array-callback-return-type": ["warn", { filesToSkip: ["*.js"] }],
    "@skylib/consistent-empty-lines": [
      "warn",
      {
        rules: [
          {
            _id: "statement",
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
          { _id: "ObjectPattern", selector: "ObjectPattern > .properties" },
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
    "@skylib/custom": "off",
    "@skylib/custom/consistent-array-type-name": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: 'Array type name should end with "s"',
        selector:
          "TSTypeAliasDeclaration > Identifier[name=/(?<!Array|[^s]s)$/u]",
        typeIs: "array"
      }
    ],
    "@skylib/custom/eslintrc-no-disable": [
      "warn",
      {
        filesToLint: ["./.eslintrc.rule-overrides.js"],
        message: "Disabling rule is unsafe",
        selector:
          "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]"
      }
    ],
    "@skylib/custom/eslintrc-no-disable-no-disable": [
      "warn",
      {
        filesToLint: ["./.eslintrc.rule-overrides.js"],
        message: "Disabling rule is unsafe",
        selector:
          "Property[key.name=rules] > ObjectExpression > Property[key.value=@skylib/custom/eslintrc-no-disable][value.value=off]"
      }
    ],
    "@skylib/custom/eslintrc-no-overrides": [
      "warn",
      {
        filesToLint: ["./.eslintrc.js"],
        message:
          'Define overrides in ".eslintrc.overrides.js", ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
        selector: "Property > Identifier.key[name=overrides]"
      }
    ],
    "@skylib/custom/eslintrc-no-rules": [
      "warn",
      {
        filesToLint: ["./.eslintrc.js", "./.eslintrc.overrides.js"],
        message:
          'Define rules in ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
        selector: "Property > Identifier.key[name=rules]"
      }
    ],
    "@skylib/custom/eslintrc-no-temp": [
      "warn",
      {
        filesToLint: ["./.eslintrc.temp.js"],
        message: "Temporary configuration",
        selector: "AssignmentExpression > ObjectExpression[properties.length>0]"
      }
    ],
    "@skylib/custom/eslintrc-no-unnecessary-array": "off",
    "@skylib/custom/no-Object-assign-readonly": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: "Do not assign to readonly object",
        selector:
          "CallExpression[callee.object.name=Object][callee.property.name=assign] > Identifier.arguments",
        typeIs: "readonly"
      }
    ],
    "@skylib/custom/no-complex-type-in-function-return": [
      "warn",
      {
        filesToSkip: ["*.js", "*.vue"],
        checkReturnType: true,
        message: "Avoid complex inline types",
        selector: ":function",
        typeIs: "complex"
      }
    ],
    "@skylib/custom/no-complex-type-in-function-return-vue": [
      "warn",
      {
        filesToLint: ["*.vue"],
        checkReturnType: true,
        message: "Avoid complex inline types",
        selector: ":not(Property[key.name=setup]) > :function",
        typeIs: "complex"
      }
    ],
    "@skylib/custom/no-complex-type-in-variable-declaration": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: "Avoid complex inline types",
        selector: [
          "ArrayPattern > Identifier",
          "Identifier.id[typeAnnotation=undefined]",
          "ObjectPattern > Property > Identifier.value"
        ].map(
          selector =>
            `VariableDeclarator:not([init.type=TSAsExpression][init.typeAnnotation.typeName.name=const]) > ${selector}`
        ),
        typeIs: "complex"
      }
    ],
    "@skylib/custom/no-distributed-function-properties": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: "Avoid distributed function properties definition",
        selector:
          "AssignmentExpression > MemberExpression.left > Identifier.object",
        typeIs: "function"
      }
    ],
    "@skylib/custom/no-empty-interface": [
      "warn",
      {
        message: "Empty interface is not allowed",
        selector:
          "TSInterfaceDeclaration[body.body.length=0][extends=undefined] > .id"
      }
    ],
    "@skylib/custom/no-invalid-identifier": [
      "warn",
      {
        message: "Identifier contains invalid character(s)",
        selector: "Identifier[name=/[^$\\w]/u]"
      }
    ],
    "@skylib/custom/no-language-mixing": [
      "warn",
      {
        message: "No language mixing",
        selector: [
          "Literal[value=/[A-Za-z][\\d_]*[А-Яа-я]|[А-Яа-я][\\d_]*[A-Za-z]/u]",
          "TemplateLiteral[value.raw=/[A-Za-z][\\d_]*[А-Яа-я]|[А-Яа-я][\\d_]*[A-Za-z]/u]"
        ]
      }
    ],
    "@skylib/custom/no-optional-true-type": [
      "warn",
      {
        message: 'Prefer "boolean" type',
        selector:
          "TSPropertySignature[optional=true] > .typeAnnotation > TSLiteralType.typeAnnotation > .literal[value=true]"
      }
    ],
    "@skylib/custom/no-this-void": [
      "warn",
      {
        message: 'Use arrow function instead of "this: void"',
        selector:
          "Identifier[name=this][typeAnnotation.typeAnnotation.type=TSVoidKeyword]"
      }
    ],
    "@skylib/custom/no-underscore-export": [
      "warn",
      {
        message: "Underscore export is not allowed",
        selector: [
          "ExportNamedDeclaration > FunctionDeclaration > Identifier.id[name=/^_/u]",
          "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
        ]
      }
    ],
    "@skylib/custom/no-unnecessary-as-const": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: 'Unnecessary "as const"',
        selector:
          "VariableDeclarator[id.typeAnnotation] > TSAsExpression > TSTypeReference > Identifier[name=const]"
      }
    ],
    "@skylib/custom/no-unnecessary-break": [
      "warn",
      {
        message: 'Unnecessary "break" statement',
        selector: "SwitchCase:last-child > BreakStatement.consequent"
      }
    ],
    "@skylib/custom/no-unnecessary-initialization": [
      "warn",
      {
        message: "Unnecessary initialization",
        selector: [
          "PropertyDefinition > Identifier.value[name=undefined]",
          "VariableDeclarator > Identifier.init[name=undefined]"
        ]
      }
    ],
    "@skylib/custom/prefer-arrow-function-property": [
      "warn",
      {
        message: "Prefer arrow function",
        selector: "Property > FunctionExpression.value"
      }
    ],
    "@skylib/custom/prefer-call-signature-first": [
      "warn",
      {
        message: "Call signature should be first",
        selector:
          "TSInterfaceBody > TSCallSignatureDeclaration:not(:first-child)"
      }
    ],
    "@skylib/custom/prefer-const-object": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: 'Expecting "as const" object',
        selector: [
          "ArrayPattern > Identifier",
          "Identifier.id[typeAnnotation=undefined]",
          "ObjectPattern > Property > Identifier.value"
        ].map(
          selector =>
            `VariableDeclarator[init.type=/^(?:ArrayExpression|ObjectExpression)$/u] > ${selector}`
        ),
        typeIsOneOf: ["array", "object"]
      }
    ],
    "@skylib/custom/prefer-construct-signature-first": [
      "warn",
      {
        message: "Construct signature should be first",
        selector:
          "TSInterfaceBody > TSConstructSignatureDeclaration:not(:first-child)"
      }
    ],
    "@skylib/custom/prefer-jest-toBe": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: 'Prefer "toBe" matcher',
        selector:
          "CallExpression[callee.property.name=toStrictEqual] > .arguments",
        typeIsOneOf: ["boolean", "number", "string"]
      }
    ],
    "@skylib/custom/prefer-jest-toStrictEqual": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: 'Prefer "toStrictEqual" matcher',
        selector: "CallExpression[callee.property.name=toBe] > .arguments",
        typeIsNoneOf: ["boolean", "number", "string"]
      }
    ],
    "@skylib/custom/prefer-jest-toThrow-shorthand": [
      "warn",
      {
        message:
          'Prefer error message or "Error" as an argument of "toThrow" matcher',
        selector:
          "CallExpression[callee.property.name=toThrow] > NewExpression.arguments[arguments.length=0]"
      }
    ],
    "@skylib/custom/prefer-kebab-case-symbol-description": [
      "warn",
      {
        message: "Prefer kebab-case symbol description",
        selector:
          "CallExpression[callee.name=Symbol] > Literal.arguments:not([value=/^[\\d\\-a-z]+$/u])"
      }
    ],
    "@skylib/custom/prefer-readonly-array": [
      "warn",
      {
        message: "Prefer readonly array",
        selector:
          ":not(TSTypeOperator[operator=readonly]) > :matches(TSArrayType, TSTupleType)"
      }
    ],
    "@skylib/custom/prefer-readonly-property": [
      "warn",
      {
        filesToSkip: ["*.js"],
        message: "Prefer readonly property",
        selector:
          ":matches(PropertyDefinition, TSPropertySignature)[readonly!=true]"
      }
    ],
    "@skylib/custom/prefer-static-method-arrow": [
      "warn",
      {
        message: "Prefer arrow function",
        selector: "MethodDefinition[static=true]"
      }
    ],
    "@skylib/custom/prettier-options": [
      "warn",
      {
        filesToLint: ["./.prettierrc.js"],
        message: "Invalid option",
        selector: [
          "Property[key.name=arrowParens] > Literal.value[value!=avoid]",
          "Property[key.name=endOfLine] > Literal.value[value!=lf]",
          "Property[key.name=quoteProps] > Literal.value[value!=preserve]",
          "Property[key.name=trailingComma] > Literal.value[value!=none]"
        ]
      }
    ],
    "@skylib/custom/prettier-structure": [
      "warn",
      {
        filesToLint: ["./.prettierrc.js"],
        message: "Expecting 4 options",
        selector:
          "AssignmentExpression > ObjectExpression.right[properties.length!=4]"
      }
    ],
    "@skylib/custom/require-assign-to-var": [
      "warn",
      {
        message: 'Assign "require" to variable',
        selector:
          ":not(ConditionalExpression, ReturnStatement, VariableDeclarator) > CallExpression > Identifier.callee[name=require]"
      }
    ],
    "@skylib/custom/restrict-chain-expression": [
      "warn",
      {
        message: "Prefer conditional expression",
        selector: "LogicalExpression[operator=??][left.type=ChainExpression]"
      }
    ],
    "@skylib/custom/vue-no-empty-lines": [
      "warn",
      {
        message: "Unexpected empty line",
        selector: "VElement[name=template] VText[value=/^\n\n/u]"
      }
    ],
    "@skylib/disallow-import": "off",
    "@skylib/disallow-import/no-at-sign": ["warn", { disallow: ["@", "@/**"] }],
    "@skylib/disallow-import/no-extension": [
      "warn",
      { filesToLint: ["*.js"], disallow: ["*.{js,json,ts}"] }
    ],
    "@skylib/disallow-import/no-index": ["warn", { disallow: ["."] }],
    "@skylib/disallow-import/no-internal-modules": [
      "warn",
      { disallow: ["./*/**"] }
    ],
    "@skylib/disallow-import/no-relative-parent-imports": [
      "warn",
      { disallow: ["../**"] }
    ],
    "@skylib/no-unsafe-object-assignment": ["warn", { filesToSkip: ["*.js"] }],
    "@skylib/optional-property-style": [
      "warn",
      { classes: "undefined", interfaces: "optional" }
    ],
    "@skylib/require-jsdoc": [
      "warn",
      {
        filesToSkip: ["*.vue"],
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
    "@skylib/sort-array": "off",
    "@skylib/sort-array/commitlint": [
      "warn",
      {
        filesToLint: ["commitlint.scopes.js", "commitlint-all.scopes.js"],
        selector: "ArrayExpression"
      }
    ],
    "@skylib/sort-array/consistent-group-empty-lines": [
      "warn",
      {
        key: "_id",
        selector:
          "Property[key.value=@skylib/consistent-group-empty-lines] > ArrayExpression > ObjectExpression > Property[key.name=rules] > ArrayExpression"
      }
    ],
    "@skylib/sort-array/consistent-import": [
      "warn",
      {
        key: "_id",
        selector:
          "Property[key.value=@skylib/consistent-import] > ArrayExpression > ObjectExpression > Property[key.name=sources] > ArrayExpression",
        sendToBottom: /^catch-all(?::|$)/u.source,
        // eslint-disable-next-line no-warning-comments -- Fix for @skylib/eslint-plugin update
        // fixme
        sendToTop: /^$/u.source
      }
    ],
    "@skylib/sort-array/eslintrc": "off",
    "@skylib/sort-array/optional-property-style": [
      "warn",
      {
        key: "_id",
        selector:
          "Property[key.value=@skylib/optional-property-style] > ArrayExpression > ObjectExpression > Property[key.name=overrides] > ArrayExpression"
      }
    ],
    "@skylib/sort-array/synonyms": [
      "warn",
      {
        filesToLint: [".eslintrc.synonyms.js", "eslintrc.synonyms.js"],
        selector: "ArrayExpression"
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
    "@skylib/sort-keys": [
      "warn",
      {
        overrides: [
          {
            _id: "defineComponent",
            customOrder: [
              "name",
              "functional",
              "components",
              "directives",
              "inheritAttrs",
              "props",
              "emits",
              "setup",
              "template"
            ],
            filesToLint: ["*.vue"],
            selector:
              "CallExpression[callee.name=defineComponent] > ObjectExpression"
          }
        ]
      }
    ],
    "@skylib/statements-order": [
      "warn",
      {
        filesToSkip: ["*.vue"],
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
    ],
    "@skylib/statements-order/vue": [
      "warn",
      {
        filesToLint: ["*.vue"],
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
};
