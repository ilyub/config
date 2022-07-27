const { getAllRules, selectors } = require("./api");

const fs = require("node:fs");

const pkg = require(fs.realpathSync("./package.json"));

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
            next: `:matches(${selectors.block}) > :matches(${selectors.statement})`,
            prev: `:matches(${selectors.block}) > :matches(${selectors.statement})`
          },
          {
            _id: "ExportNamedDeclaration",
            emptyLine: "never",
            next: `:matches(${selectors.block}) > ExportNamedDeclaration[source]`,
            prev: `:matches(${selectors.block}) > ExportNamedDeclaration[source]`
          },
          {
            _id: "ExpressionStatement",
            emptyLine: "any",
            next: `:matches(${selectors.block}) > ExpressionStatement`,
            prev: `:matches(${selectors.block}) > ExpressionStatement`
          },
          {
            _id: "ImportDeclaration",
            emptyLine: "any",
            next: `:matches(${selectors.block}) > ImportDeclaration`,
            prev: `:matches(${selectors.block}) > ImportDeclaration`
          }
        ]
      }
    ],
    "@skylib/consistent-filename": [
      "warn",
      {
        overrides: [
          {
            _id: "classes",
            format: "pascalCase",
            match: true,
            selector: "ClassDeclaration > Identifier.id"
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
            selector: `:matches(${selectors.block}) > ExpressionStatement`,
            someHasDocComment: true,
            someLinesGte: 6
          },
          { _id: "ImportDeclaration", selector: "ImportDeclaration" },
          {
            _id: "ObjectExpression",
            selector: "ObjectExpression > .properties"
          },
          { _id: "ObjectPattern", selector: "ObjectPattern > .properties" },
          { _id: "TSInterfaceBody", selector: "TSInterfaceBody > .body" },
          { _id: "TSTypeLiteral", selector: "TSTypeLiteral > .members" },
          {
            _id: "params",
            selector: `:matches(${selectors.function}) > .params`
          }
        ]
      }
    ],
    "@skylib/consistent-import": [
      "warn",
      {
        sources: [
          {
            _id: "./src/test-utils",
            source: `${pkg.name}/src/test-utils`,
            type: "wildcard"
          },
          {
            _id: "@sinonjs/fake-timers",
            autoImport: true,
            source: "@sinonjs/fake-timers",
            type: "wildcard"
          },
          {
            _id: "@skylib/facades/test-utils",
            altLocalNames: ["facadesTestUtils"],
            source: "@skylib/facades/src/test-utils",
            sourcePattern: "@skylib/facades/{dist,es}/test-utils",
            type: "wildcard"
          },
          {
            _id: "@skylib/framework/test-utils",
            altLocalNames: ["frameworkTestUtils"],
            source: "@skylib/framework/src/test-utils",
            sourcePattern: "@skylib/framework/{dist,es}/test-utils",
            type: "wildcard"
          },
          {
            _id: "@skylib/functions/test-utils",
            altLocalNames: ["functionsTestUtils"],
            source: "@skylib/functions/src/test-utils",
            sourcePattern: "@skylib/functions/{dist,es}/test-utils",
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
            _id: "@skylib/quasar-extension/test-utils",
            altLocalNames: ["quasarTestUtils"],
            source: "@skylib/quasar-extension/src/test-utils",
            sourcePattern: "@skylib/quasar-extension/{dist,es}/test-utils",
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
          { _id: "catch-all", source: "**", type: "default" }
        ]
      }
    ],
    "@skylib/consistent-optional-props": [
      "warn",
      { classes: "undefined", interfaces: "optional" }
    ],
    "@skylib/no-internal-modules": [
      "off",
      {
        allow: [
          "./configs/eslintrc.synonyms",
          "./src/eslintrc.synonyms",
          "./src/test-utils",
          "@skylib/*/dist/test-utils",
          "@skylib/config/api",
          "@typescript-eslint/utils/dist/ts-eslint",
          "@vue/test-utils/dist/interfaces/wrapperLike",
          "@vue/test-utils/dist/types",
          "date-fns/locale/*",
          "flag-icon-css/flags/*/*.svg",
          "jest-extended/all",
          "quasar/wrappers",
          "ts-toolbelt/**",
          "typeface-roboto-multilang/*.css"
        ],
        disallow: ["./*/**", "@*/*/**", "[^@]*/**"]
      }
    ],
    "@skylib/object-format": ["warn", { maxLineLength: 80, maxObjectSize: 3 }],
    "@skylib/require-jsdoc": [
      "warn",
      {
        excludeSelectors: ["ClassDeclaration", "FunctionDeclaration"],
        includeSelectors: [
          `:matches(${selectors.documentedBlock}) >  FunctionDeclaration`,
          `:matches(${selectors.documentedBlock}) >  VariableDeclaration > .declarations > .id > .typeAnnotation > TSFunctionType`,
          `:matches(${selectors.documentedBlock}) >  VariableDeclaration > .declarations[id.typeAnnotation=undefined] > ObjectExpression > .properties > :matches(${selectors.functionExpression})`,
          `:matches(${selectors.documentedBlock}) >  VariableDeclaration > .declarations[id.typeAnnotation=undefined] > TSAsExpression > ObjectExpression > .properties > :matches(${selectors.functionExpression})`,
          `PropertyDefinition > :matches(${selectors.functionExpression})`
        ],
        interfaces: ["callSignatures", "constructSignatures"],
        properties: ["function"]
      }
    ],
    "@skylib/sort-array/consistent-import": [
      "warn",
      {
        key: "_id",
        selector:
          "Property[key.value=@skylib/consistent-import] > ArrayExpression > ObjectExpression > Property[key.name=sources] > ArrayExpression",
        sendToBottom: /^catch-all$/u.source
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
      files: "*.js",
      rules: {
        "@skylib/array-callback-return-type": "off",
        "@skylib/no-unsafe-object-assignment": "off"
      }
    },
    {
      files: "*.vue",
      rules: {
        "@skylib/consistent-filename": ["warn", { format: "pascalCase" }],
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
    }
  ]
};
