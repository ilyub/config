const { getAllRules, rules } = require("./api");

const consistentImport = rules["@skylib/consistent-import/project"];

module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    ...getAllRules("@skylib/eslint-plugin", rule =>
      /^[^/]+\/[^/]+$/u.test(rule)
    ),
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
            _id: "ExportNamedDeclaration",
            emptyLine: "never",
            next: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExportNamedDeclaration[source]",
            prev: ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExportNamedDeclaration[source]"
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
          { _id: "Enum", selector: "TSEnumMember" },
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
            _id: "estree",
            autoImport: true,
            source: "estree",
            type: "wildcard"
          },
          {
            _id: "fs",
            altLocalNames: ["nodeFs"],
            autoImport: true,
            localName: "fs",
            source: "node:fs",
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
            localName: "path",
            source: "node:path",
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
    "@skylib/consistent-import/project": ["warn", consistentImport],
    "@skylib/consistent-optional-props": [
      "warn",
      { classes: "undefined", interfaces: "optional" }
    ],
    "@skylib/custom": "off",
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
    "@skylib/custom/no-negated-condition": [
      "warn",
      {
        message: "No negated condition",
        selector: [
          'IfStatement > BinaryExpression[operator="!=="]',
          'IfStatement > LogicalExpression > BinaryExpression.left[operator="!=="]',
          'IfStatement > LogicalExpression > UnaryExpression.left[operator="!"]',
          'IfStatement > UnaryExpression[operator="!"]'
        ]
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
    "@skylib/custom/prefer-const-require": [
      "warn",
      {
        message: 'Assign "require" to variable',
        selector:
          ":not(ConditionalExpression, ReturnStatement, VariableDeclarator) > CallExpression > Identifier.callee[name=require]"
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
    "@skylib/custom/prefer-kebab-case-symbol-description": [
      "warn",
      {
        message: "Prefer kebab-case symbol description",
        selector:
          "CallExpression[callee.name=Symbol] > Literal.arguments:not([value=/^(?:[\\d\\-a-z]|__)+$/u])"
      }
    ],
    "@skylib/custom/prefer-static-method-arrow": [
      "warn",
      {
        message: "Prefer arrow function",
        selector: "MethodDefinition[static=true]"
      }
    ],
    "@skylib/custom/restrict-chain-expression": [
      "warn",
      {
        message: "Prefer conditional expression",
        selector: "LogicalExpression[operator=??][left.type=ChainExpression]"
      }
    ],
    "@skylib/disallow-import": "off",
    "@skylib/disallow-import/no-at-sign": ["warn", { disallow: ["@", "@/**"] }],
    "@skylib/disallow-import/no-extension": "off",
    "@skylib/disallow-import/no-index": ["warn", { disallow: ["."] }],
    "@skylib/disallow-import/no-internal-modules": [
      "warn",
      {
        disallow: ["./*/**", "@*/*/**", "[^@]*/**"],
        allow: [
          "./configs/eslintrc.synonyms",
          "./src/eslintrc.synonyms",
          "./src/test-utils",
          "@skylib/*/dist/test-utils",
          "@typescript-eslint/utils/dist/ts-eslint",
          "@vue/test-utils/dist/interfaces/wrapperLike",
          "@vue/test-utils/dist/types",
          "date-fns/locale/*",
          "flag-icon-css/flags/*/*.svg",
          "jest-extended/all",
          "quasar/wrappers",
          "ts-toolbelt/**",
          "typeface-roboto-multilang/*.css"
        ]
      }
    ],
    "@skylib/disallow-import/no-nodejs-modules": [
      "warn",
      { disallow: ["node:*"] }
    ],
    "@skylib/disallow-import/no-relative-parent-imports": [
      "warn",
      {
        disallow: [
          "../**",
          "../../**",
          "../../../**",
          "../../../../**",
          "../../../../../**"
        ]
      }
    ],
    "@skylib/match-filename": "off",
    "@skylib/no-negated-condition": "off",
    "@skylib/prefer-alias-for-array-types": "off",
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
    "@skylib/sort-array": "off",
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
    "@skylib/sort-array/consistent-optional-props": [
      "warn",
      {
        key: "_id",
        selector:
          "Property[key.value=@skylib/consistent-optional-props] > ArrayExpression > ObjectExpression > Property[key.name=overrides] > ArrayExpression"
      }
    ],
    "@skylib/sort-array/eslintrc": "off",
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
  },
  overrides: [
    {
      files: "!*.js",
      rules: {
        "@skylib/custom/consistent-array-type-name": [
          "warn",
          {
            message: 'Array type name should end with "s"',
            selector:
              "TSTypeAliasDeclaration > Identifier[name=/(?<!Array|[^s]s)$/u]",
            typeIs: "array"
          }
        ],
        "@skylib/custom/no-Object-assign-readonly": [
          "warn",
          {
            message: "Do not assign to readonly object",
            selector:
              "CallExpression[callee.object.name=Object][callee.property.name=assign] > Identifier.arguments",
            typeIs: "readonly"
          }
        ],
        "@skylib/custom/no-complex-type-in-function-return": [
          "warn",
          {
            checkReturnType: true,
            message: "Avoid complex anonymous types",
            selector: ":function",
            typeIs: "complex"
          }
        ],
        "@skylib/custom/no-complex-type-in-variable-declaration": [
          "warn",
          {
            message: "Avoid complex anonymous types",
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
        "@skylib/custom/no-literal-union-type": [
          "warn",
          {
            message: "Use enum instead",
            selector: "TSTypeAliasDeclaration > TSUnionType > TSLiteralType",
            typeIs: "string"
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
        "@skylib/custom/no-unnecessary-as-const": [
          "warn",
          {
            message: 'Unnecessary "as const"',
            selector:
              "VariableDeclarator[id.typeAnnotation] > TSAsExpression > TSTypeReference > Identifier[name=const]"
          }
        ],
        // eslint-disable-next-line no-warning-comments -- Wait for @skylib/eslint-plugin update
        // fixme - Avoid type parameter
        "@skylib/custom/prefer-alias-for-array-type": [
          "off",
          {
            message: "Prefer alias for array type",
            selector: [
              "TSArrayType > .elementType[type!=TSAnyKeyword]",
              "TSTypeReference[typeName.name=Array]",
              "TSTypeReference[typeName.name=ReadonlyArray]"
            ]
          }
        ],
        "@skylib/custom/prefer-const-object": [
          "warn",
          {
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
        "@skylib/custom/prefer-readonly-array": [
          "warn",
          {
            message: "Prefer readonly array",
            selector: [
              ":not(TSTypeOperator[operator=readonly]) > :matches(TSArrayType, TSTupleType)",
              "TSTypeReference > Identifier[name=Array]"
            ]
          }
        ],
        "@skylib/custom/prefer-readonly-map": [
          "warn",
          {
            message: "Prefer readonly map",
            selector: "TSTypeReference > Identifier[name=Map]"
          }
        ],
        "@skylib/custom/prefer-readonly-property": [
          "warn",
          {
            message: "Prefer readonly property",
            selector:
              ":matches(PropertyDefinition, TSPropertySignature)[readonly!=true]"
          }
        ],
        "@skylib/custom/prefer-readonly-set": [
          "warn",
          {
            message: "Prefer readonly set",
            selector: "TSTypeReference > Identifier[name=Set]"
          }
        ],
        "@skylib/custom/require-class-member-typedef": [
          "warn",
          {
            message: "Expecting type annotation",
            selector:
              "PropertyDefinition[typeAnnotation=undefined][value=undefined]"
          }
        ]
      }
    },
    {
      files: "*.js",
      rules: {
        "@skylib/array-callback-return-type": "off",
        "@skylib/disallow-import/no-extension": [
          "warn",
          { disallow: ["*.{js,json,ts}"] }
        ],
        "@skylib/no-unsafe-object-assignment": "off"
      }
    },
    {
      files: "*.vue",
      rules: {
        "@skylib/consistent-filename": ["warn", { format: "pascalCase" }],
        "@skylib/custom/no-complex-type-in-function-return": [
          "warn",
          {
            checkReturnType: true,
            message: "Avoid complex anonymous types",
            selector: ":not(Property[key.name=setup]) > :function",
            typeIs: "complex"
          }
        ],
        "@skylib/custom/vue-no-empty-lines": [
          "warn",
          {
            message: "Unexpected empty line",
            selector: "VElement[name=template] VText[value=/^\n\n/u]"
          }
        ],
        "@skylib/require-jsdoc": "off",
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
                selector:
                  "CallExpression[callee.name=defineComponent] > ObjectExpression"
              }
            ]
          }
        ],
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
    },
    {
      files: "*.*.ts",
      rules: {
        "@skylib/consistent-filename": "off",
        "@skylib/only-export-name": "off",
        "@skylib/primary-export-only": "off"
      }
    },
    {
      files: "index.ts",
      rules: {
        "@skylib/only-export-name": "off",
        "@skylib/primary-export-only": "off"
      }
    },
    {
      files: "./.eslintrc.js",
      rules: {
        "@skylib/custom/eslintrc-no-overrides": [
          "warn",
          {
            message:
              'Define overrides in ".eslintrc.overrides.js", ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
            selector: "Property > Identifier.key[name=overrides]"
          }
        ],
        "@skylib/custom/eslintrc-no-rules": [
          "warn",
          {
            message:
              'Define rules in ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
            selector: "Property > Identifier.key[name=rules]"
          }
        ]
      }
    },
    {
      files: "./.eslintrc.overrides.js",
      rules: {
        "@skylib/custom/eslintrc-no-rules": [
          "warn",
          {
            message:
              'Define rules in ".eslintrc.rule-overrides.js" or ".eslintrc.temp.js" file',
            selector: "Property > Identifier.key[name=rules]"
          }
        ]
      }
    },
    {
      files: "./.eslintrc.rule-overrides.js",
      rules: {
        "@skylib/custom/eslintrc-no-disable": [
          "warn",
          {
            message: "Disabling rule is unsafe",
            selector:
              "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]"
          }
        ],
        "@skylib/custom/eslintrc-no-disable-no-disable": [
          "warn",
          {
            message: "Disabling rule is unsafe",
            selector:
              "Property[key.name=rules] > ObjectExpression > Property[key.value=@skylib/custom/eslintrc-no-disable][value.value=off]"
          }
        ]
      }
    },
    {
      files: [".eslintrc.synonyms.js", "eslintrc.synonyms.js"],
      rules: {
        "@skylib/sort-array/synonyms": ["warn", { selector: "ArrayExpression" }]
      }
    },
    {
      files: "./.eslintrc.temp.js",
      rules: {
        "@skylib/custom/eslintrc-no-temp": [
          "warn",
          {
            message: "Temporary configuration",
            selector:
              "AssignmentExpression > ObjectExpression[properties.length>0]"
          }
        ]
      }
    },
    {
      files: "./.prettierrc.js",
      rules: {
        "@skylib/custom/prettier-options": [
          "warn",
          {
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
            message: "Expecting 4 options",
            selector:
              "AssignmentExpression > ObjectExpression.right[properties.length!=4]"
          }
        ]
      }
    },
    {
      files: ["commitlint.scopes.js", "commitlint-all.scopes.js"],
      rules: {
        "@skylib/sort-array/commitlint": [
          "warn",
          { selector: "ArrayExpression" }
        ]
      }
    }
  ]
};
