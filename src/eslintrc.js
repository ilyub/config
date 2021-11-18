const fs = require("fs");

const options = fs.existsSync("./.eslintrc.options.js")
  ? require(fs.realpathSync("./.eslintrc.options.js"))
  : {};

const [distOrEs, typelibDisallow] = options.es
  ? ["es", /^@skylib\/[^/]+\/dist\//u.source]
  : ["dist", /^@skylib\/[^/]+\/es\//u.source];

const [lodash, lodashDisallow] = options.es
  ? ["lodash-es", /^lodash$/u.source]
  : ["lodash", /^lodash-es$/u.source];

const packageName = fs.existsSync("./package.json")
  ? JSON.parse(fs.readFileSync("./package.json")).name
  : undefined;

const frameworkPrefix =
  packageName === "@skylib/framework" ? "@" : `@skylib/framework/${distOrEs}`;

const functionsPrefix =
  packageName === "@skylib/functions" ? "@" : `@skylib/functions/${distOrEs}`;

const jsdocContexts = [
  "ArrowFunctionExpression",
  "FunctionDeclaration",
  "FunctionExpression",
  "TSCallSignatureDeclaration",
  "TSConstructSignatureDeclaration",
  "TSDeclareFunction",
  "TSFunctionType",
  "TSMethodSignature"
];

const readonlyIgnoreTypes = [
  ...(options.readonlyIgnoreTypes ?? []),
  "BigInt",
  "Boolean",
  "Function",
  "Number",
  "Object",
  "ReadonlyArray",
  "ReadonlyMap",
  "ReadonlySet",
  "Promise",
  "RegExp",
  "RegExpExecArray",
  "String",
  "Symbol"
];

const readonlyIgnoreIdentifiers = [
  /^result$/u.source,
  /^_?(?:cache|dynamic|mutable|pool|queue|stack|state|writable)/u.source,
  /(?:Cache|Dynamic|Mutable|Pool|Queue|Stack|State|Writable)$/u.source
];

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2017: true,
    es2020: true,
    es2021: true,
    es6: true,
    jest: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2017,
    extraFileExtensions: [".vue"],
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    sourceType: "module"
  },
  plugins: [
    "@skylib/eslint-plugin",
    "@typescript-eslint",
    "es",
    "filenames",
    "import",
    "jsdoc",
    "prettier",
    "regexp",
    "simple-import-sort",
    "sort-destructure-keys",
    "switch-case",
    "typescript-sort-keys",
    "unicorn",
    "vue"
  ],
  root: true,
  settings: {
    "import/resolver": {
      typescript: { project: "tsconfig.json" }
    }
  },
  // @skylib/sort-keys break
  rules: {
    "accessor-pairs": "warn",
    "array-bracket-newline": "off",
    "array-bracket-spacing": "off",
    "array-callback-return": "warn",
    "array-element-newline": "off",
    "arrow-body-style": [
      "warn",
      "as-needed",
      { requireReturnForObjectLiteral: true }
    ],
    "arrow-parens": "off",
    "arrow-spacing": "off",
    "block-scoped-var": "warn",
    "block-spacing": "off",
    "brace-style": "off",
    "camelcase": "off",
    "capitalized-comments": "off",
    "class-methods-use-this": "off",
    "comma-dangle": "off",
    "comma-spacing": "off",
    "comma-style": "off",
    "complexity": ["warn", 25],
    "computed-property-spacing": "off",
    "consistent-return": "warn",
    "consistent-this": "warn",
    "constructor-super": "warn",
    "curly": ["warn", "multi"],
    "default-case": "warn",
    "default-case-last": "warn",
    "default-param-last": "warn",
    "dot-location": "off",
    "dot-notation": "warn",
    "eol-last": "off",
    "eqeqeq": "warn",
    "for-direction": "warn",
    "func-call-spacing": "off",
    "func-name-matching": "warn",
    "func-names": ["warn", "never"],
    "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
    "function-call-argument-newline": "off",
    "function-paren-newline": "off",
    "generator-star-spacing": "off",
    "getter-return": "warn",
    "grouped-accessor-pairs": "warn",
    "guard-for-in": "warn",
    "id-denylist": "warn",
    "id-length": "off",
    "id-match": "warn",
    "implicit-arrow-linebreak": "off",
    "indent": "off",
    "init-declarations": "warn",
    "jsx-quotes": "off",
    "key-spacing": "off",
    "keyword-spacing": "off",
    "line-comment-position": ["warn", { ignorePattern: "NOSONAR" }],
    "linebreak-style": "off",
    "lines-around-comment": "off",
    "lines-between-class-members": "warn",
    "max-classes-per-file": "off",
    "max-depth": ["warn", 10],
    "max-len": "off",
    "max-lines": ["warn", 5000],
    "max-lines-per-function": ["warn", 500],
    "max-nested-callbacks": "warn",
    "max-params": ["warn", 10],
    "max-statements": ["warn", 500],
    "max-statements-per-line": "warn",
    "multiline-comment-style": "off",
    "multiline-ternary": "off",
    "new-cap": "off",
    "new-parens": "off",
    "newline-per-chained-call": "off",
    "no-alert": "warn",
    "no-array-constructor": "warn",
    "no-async-promise-executor": "warn",
    "no-await-in-loop": "warn",
    "no-bitwise": "warn",
    "no-caller": "warn",
    "no-case-declarations": "warn",
    "no-class-assign": "warn",
    "no-compare-neg-zero": "warn",
    "no-cond-assign": "warn",
    "no-confusing-arrow": "off",
    "no-console": "warn",
    "no-const-assign": "warn",
    "no-constant-condition": "warn",
    "no-constructor-return": "warn",
    "no-continue": "warn",
    "no-control-regex": "warn",
    "no-debugger": "warn",
    "no-delete-var": "warn",
    "no-div-regex": "warn",
    "no-dupe-args": "warn",
    "no-dupe-class-members": "warn",
    "no-dupe-else-if": "warn",
    "no-dupe-keys": "warn",
    "no-duplicate-case": "warn",
    "no-duplicate-imports": "warn",
    "no-else-return": "warn",
    "no-empty": "warn",
    "no-empty-character-class": "warn",
    "no-empty-function": "warn",
    "no-empty-pattern": "warn",
    "no-eq-null": "warn",
    "no-eval": "warn",
    "no-ex-assign": "warn",
    "no-extend-native": "warn",
    "no-extra-bind": "warn",
    "no-extra-boolean-cast": "warn",
    "no-extra-label": "warn",
    "no-extra-parens": "off",
    "no-extra-semi": "off",
    "no-fallthrough": "warn",
    "no-floating-decimal": "off",
    "no-func-assign": "warn",
    "no-global-assign": "warn",
    "no-implicit-coercion": "warn",
    "no-implicit-globals": "warn",
    "no-implied-eval": "warn",
    "no-import-assign": "warn",
    "no-inline-comments": ["warn", { ignorePattern: "NOSONAR" }],
    "no-inner-declarations": "warn",
    "no-invalid-regexp": "warn",
    "no-invalid-this": "off",
    "no-irregular-whitespace": "warn",
    "no-iterator": "warn",
    "no-label-var": "warn",
    "no-labels": "warn",
    "no-lone-blocks": "off",
    "no-lonely-if": "warn",
    "no-loop-func": "warn",
    "no-loss-of-precision": "warn",
    "no-magic-numbers": "off",
    "no-misleading-character-class": "warn",
    "no-mixed-operators": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-multi-assign": "warn",
    "no-multi-spaces": "off",
    "no-multi-str": "warn",
    "no-multiple-empty-lines": "off",
    "no-negated-condition": "warn",
    "no-nested-ternary": "warn",
    "no-new": "warn",
    "no-new-func": "warn",
    "no-new-object": "warn",
    "no-new-symbol": "warn",
    "no-new-wrappers": "warn",
    "no-nonoctal-decimal-escape": "warn",
    "no-obj-calls": "warn",
    "no-octal": "warn",
    "no-octal-escape": "warn",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-promise-executor-return": "warn",
    "no-proto": "warn",
    "no-prototype-builtins": "warn",
    "no-redeclare": "warn",
    "no-regex-spaces": "warn",
    "no-restricted-exports": "warn",
    "no-restricted-globals": "warn",
    "no-restricted-imports": "warn",
    "no-restricted-properties": "warn",
    "no-restricted-syntax": "warn",
    "no-return-assign": "warn",
    "no-return-await": "warn",
    "no-script-url": "warn",
    "no-self-assign": "warn",
    "no-self-compare": "warn",
    "no-sequences": "warn",
    "no-setter-return": "warn",
    "no-shadow": [
      "warn",
      {
        allow: ["event", "name"],
        builtinGlobals: true,
        hoist: "all"
      }
    ],
    "no-shadow-restricted-names": "warn",
    "no-sparse-arrays": "warn",
    "no-tabs": "off",
    "no-template-curly-in-string": "warn",
    "no-ternary": "off",
    "no-this-before-super": "warn",
    "no-throw-literal": "warn",
    "no-trailing-spaces": "off",
    "no-undef": ["warn", { typeof: true }],
    "no-undef-init": "off",
    "no-undefined": "off",
    "no-underscore-dangle": "warn",
    "no-unexpected-multiline": "off",
    "no-unmodified-loop-condition": "warn",
    "no-unneeded-ternary": "warn",
    "no-unreachable": "warn",
    "no-unreachable-loop": "warn",
    "no-unsafe-finally": "warn",
    "no-unsafe-negation": "warn",
    "no-unsafe-optional-chaining": "warn",
    "no-unused-expressions": "warn",
    "no-unused-labels": "warn",
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: /^(?:_|omit)/u.source,
        varsIgnorePattern: /^(?:_|omit)/u.source
      }
    ],
    "no-use-before-define": "warn",
    "no-useless-backreference": "warn",
    "no-useless-call": "warn",
    "no-useless-catch": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-constructor": "warn",
    "no-useless-escape": "warn",
    "no-useless-rename": "warn",
    "no-useless-return": "warn",
    "no-var": "warn",
    "no-void": "warn",
    "no-warning-comments": "warn",
    "no-whitespace-before-property": "off",
    "no-with": "warn",
    "nonblock-statement-body-position": "off",
    "object-curly-newline": "off",
    "object-curly-spacing": "off",
    "object-property-newline": "off",
    "object-shorthand": ["warn", "always", { avoidExplicitReturnArrows: true }],
    "one-var": ["warn", "never"],
    "one-var-declaration-per-line": "off",
    "operator-assignment": "warn",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        next: "*",
        prev: "*"
      },
      {
        blankLine: "any",
        next: "case",
        prev: "case"
      },
      {
        blankLine: "any",
        next: "expression",
        prev: "expression"
      },
      {
        blankLine: "any",
        next: "import",
        prev: "import"
      }
    ],
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
    "prefer-destructuring": "off",
    "prefer-exponentiation-operator": "warn",
    "prefer-named-capture-group": "off",
    "prefer-numeric-literals": "warn",
    "prefer-object-spread": "warn",
    "prefer-promise-reject-errors": "warn",
    "prefer-regex-literals": "warn",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
    "prefer-template": "warn",
    "quote-props": ["warn", "consistent-as-needed"],
    "quotes": "off",
    "radix": "warn",
    "require-atomic-updates": "warn",
    "require-await": "warn",
    "require-unicode-regexp": "warn",
    "require-yield": "warn",
    "rest-spread-spacing": "off",
    "semi": "off",
    "semi-spacing": "off",
    "semi-style": "off",
    "sort-imports": "off",
    "sort-keys": "off",
    "sort-vars": "warn",
    "space-before-blocks": "off",
    "space-before-function-paren": "off",
    "space-in-parens": "off",
    "space-infix-ops": "off",
    "space-unary-ops": "off",
    "spaced-comment": "warn",
    "strict": "warn",
    "switch-colon-spacing": "off",
    "symbol-description": "warn",
    "template-curly-spacing": "off",
    "template-tag-spacing": "off",
    "typescript-sort-keys/interface": "warn",
    "typescript-sort-keys/string-enum": "warn",
    "unicode-bom": "off",
    "use-isnan": "warn",
    "valid-typeof": "warn",
    "vars-on-top": "warn",
    "wrap-iife": "off",
    "wrap-regex": "off",
    "yield-star-spacing": "off",
    "yoda": "warn",
    // @skylib/sort-keys break
    "@skylib/class-member-typedef": "warn",
    "@skylib/consistent-empty-lines": [
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
            selector: ":matches(BlockStatement, Program) > ExpressionStatement",
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
            sourcePattern: "@sinonjs/fake-timers",
            type: "wildcard"
          },
          {
            altLocalNames: ["vueTestUtils"],
            sourcePattern: "@vue/test-utils",
            type: "wildcard"
          },
          {
            sourcePattern: "eslint",
            type: "wildcard"
          },
          {
            sourcePattern: "estree",
            type: "wildcard"
          },
          {
            sourcePattern: "fs",
            type: "default"
          },
          {
            localName: "matchers",
            sourcePattern: "jest-extended/all",
            type: "wildcard"
          },
          {
            localName: "$",
            sourcePattern: "jquery",
            type: "default"
          },
          {
            localName: "_",
            sourcePattern: lodash,
            type: "wildcard"
          },
          {
            localName: "MiniSearch",
            sourcePattern: "minisearch",
            type: "default"
          },
          {
            altLocalNames: ["nodePath"],
            sourcePattern: "path",
            type: "default"
          },
          {
            sourcePattern: "ts-morph",
            type: "wildcard"
          },
          {
            sourcePattern: "tsutils",
            type: "wildcard"
          },
          {
            localName: "ts",
            sourcePattern: "typescript",
            type: "wildcard"
          },
          {
            sourcePattern: "vscode",
            type: "wildcard"
          },
          {
            localName: "Vue",
            sourcePattern: "vue",
            type: "default"
          },
          {
            altLocalNames: ["VueComponent"],
            localName: "Component",
            sourcePattern: "vue-class-component",
            type: "default"
          },
          {
            localName: "VueRouter",
            sourcePattern: "vue-router",
            type: "default"
          },
          {
            localName: "Vuelidate",
            sourcePattern: "vuelidate",
            type: "default"
          },
          {
            localName: "Vuetify",
            sourcePattern: "vuetify",
            type: "default"
          },
          {
            autoImportSource: `${functionsPrefix}/array`,
            localName: "a",
            sourcePattern: "@skylib/functions/*/array",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/arrayMap`,
            sourcePattern: "@skylib/functions/*/arrayMap",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/assertions`,
            localName: "assert",
            sourcePattern: "@skylib/functions/*/assertions",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/converters`,
            localName: "cast",
            sourcePattern: "@skylib/functions/*/converters",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/function`,
            localName: "fn",
            sourcePattern: "@skylib/functions/*/function",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/guards`,
            localName: "is",
            sourcePattern: "@skylib/functions/*/guards",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/json`,
            sourcePattern: "@skylib/functions/*/json",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/number`,
            localName: "num",
            sourcePattern: "@skylib/functions/*/number",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/object`,
            localName: "o",
            sourcePattern: "@skylib/functions/*/object",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/reflect`,
            sourcePattern: "@skylib/functions/*/reflect",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/regexp`,
            sourcePattern: "@skylib/functions/*/regexp",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/string`,
            localName: "s",
            sourcePattern: "@skylib/functions/*/string",
            type: "wildcard"
          },
          {
            altLocalNames: ["functionsTestUtils"],
            autoImportSource: `${functionsPrefix}/testUtils`,
            sourcePattern: "@skylib/functions/*/testUtils",
            type: "wildcard"
          },
          {
            autoImportSource: `${functionsPrefix}/timer`,
            sourcePattern: "@skylib/functions/*/timer",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/datetime/date-fns-wrapper`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/datetime/date-fns-wrapper",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/handlePromise/promiseHandler`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/handlePromise/promiseHandler",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/httpRequest/axios-wrapper`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/httpRequest/axios-wrapper",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/inlineSearch/minisearch-wrapper`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/inlineSearch/minisearch-wrapper",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/progressReporter/progressBar`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/progressReporter/progressBar",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/reactiveStorage/dummyStorage`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/reactiveStorage/dummyStorage",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/reactiveStorage/vueStorage`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/reactiveStorage/vueStorage",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/showAlert/jsAlert`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/showAlert/jsAlert",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/showConfirm/jsConfirm`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/showConfirm/jsConfirm",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/testDelay/configurableTestDelay`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/testDelay/configurableTestDelay",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/facade-implementations/uniqueId/uuidWrapper`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/uniqueId/uuidWrapper",
            type: "wildcard"
          },
          {
            altLocalNames: ["shortcutsPlugin"],
            autoImportSource: `${frameworkPrefix}/plugins/shortcuts`,
            sourcePattern: "@skylib/framework/*/plugins/shortcuts",
            type: "wildcard"
          },
          {
            altLocalNames: ["frameworkTestUtils"],
            autoImportSource: `${frameworkPrefix}/testUtils`,
            sourcePattern: "@skylib/framework/*/testUtils",
            type: "wildcard"
          },
          {
            autoImportSource: `${frameworkPrefix}/vue-decorators/Prop`,
            sourcePattern: "@skylib/framework/*/vue-decorators/Prop",
            type: "wildcard"
          },
          {
            altLocalNames: ["tooltipsPlugin"],
            autoImportSource: `${frameworkPrefix}/vue-plugins/tooltips`,
            sourcePattern: "@skylib/framework/*/vue-plugins/tooltips",
            type: "wildcard"
          }
        ]
      }
    ],
    "@skylib/disallow-by-regexp": [
      "warn",
      {
        contexts: ["code"],
        filesToSkip: ["*.js"],
        rules: [
          {
            patterns: [
              /(?<!function\s+)\bDelayedConfigure\(/u.source,
              /(?<!function\s+)\bDelayedGetConfiguration\(/u.source,
              /(?<!function\s+)\bEmitUpdatesImmediate\(/u.source,
              /(?<!function\s+)\bOwnPropertyClassDecorator\(/u.source,
              /(?<!function\s+)\bOwnPropertyResetValidators\(/u.source,
              /(?<!function\s+)\bOwnPropertyValidate\(/u.source,
              /(?<!function\s+)\bWatchAppliedTo\(/u.source,
              /(?<!function\s+)\bWatchImmediate\(/u.source,
              /(?<!function\s+)\bWatchPath\(/u.source,
              /(?<!function\s+)\bWatchPath1\(/u.source,
              /(?<!function\s+)\bWatchPath2\(/u.source,
              /(?<!function\s+)\bjestResetDictionary\(/u.source,
              /(?<!function\s+)\bjestResetDom\(/u.source,
              /(?<!function\s+)\bjestSetupDictionary\(/u.source,
              /(?<!function\s+)\bjestSetupDom\(/u.source,
              /(?<!function\s+)\bmountAsync\(/u.source,
              /\bProp\s*\.arrayFactory\(/u.source,
              /\bProp\s*\.arrayOf\(/u.source,
              /\bProp\s*\.arrayOfFiltered\(/u.source,
              /\bProp\s*\.arrayOfOrFail\(/u.source,
              /\bProp\s*\.arrayOfUndef\(/u.source,
              /\bProp\s*\.baseFactory\(/u.source,
              /\bProp\s*\.booleanFactory\(/u.source,
              /\bProp\s*\.byGuardOrFail\(/u.source,
              /\bProp\s*\.callableOrFail\(/u.source,
              /\bProp\s*\.enumerationOrFail\(/u.source,
              /\bProp\s*\.indexedObjectFactory\(/u.source,
              /\bProp\s*\.indexedObjectOf\(/u.source,
              /\bProp\s*\.instanceOrFail\(/u.source,
              /\bProp\s*\.instancesFiltered\(/u.source,
              /\bProp\s*\.instancesOrFail\(/u.source,
              /\bProp\s*\.numStrFactory\(/u.source,
              /\bProp\s*\.numberFactory\(/u.source,
              /\bProp\s*\.numberOrFail\(/u.source,
              /\bProp\s*\.numberOrFailFactory\(/u.source,
              /\bProp\s*\.numberUFactory\(/u.source,
              /\bProp\s*\.objectFactory\(/u.source,
              /\bProp\s*\.stringFactory\(/u.source,
              /\bProp\s*\.stringOrFail\(/u.source,
              /\bProp\s*\.stringOrFailFactory\(/u.source,
              /\bProp\s*\.stringUFactory\(/u.source,
              /\bassert\s*\.arrayOf\(/u.source,
              /\bassert\s*\.notEmpty\(/u.source,
              /\bassert\s*\.indexedObjectOf\(/u.source,
              /\bassert\s*\.notNull\(/u.source,
              /\bassert\s*\.objectOf\(/u.source,
              /\bassert\s*\.notUndefined\(/u.source,
              /\bcast\s*\.arrayOf\(/u.source,
              /\bcast\s*\.arrayOfFiltered\(/u.source,
              /\bcast\s*\.arrayOfOrFail\(/u.source,
              /\bcast\s*\.arrayOfUndef\(/u.source,
              /\bcast\s*\.callableOrFail\(/u.source,
              /\bcast\s*\.notEmpty\(/u.source,
              /\bcast\s*\.indexedObjectOf\(/u.source,
              /\bcast\s*\.instanceOrFail\(/u.source,
              /\bcast\s*\.instancesFiltered\(/u.source,
              /\bcast\s*\.instancesOrFail\(/u.source,
              /\bcast\s*\.numberOrFail\(/u.source,
              /\bcast\s*\.stringOrFail\(/u.source,
              /\bis\s*\.andFactory\(/u.source,
              /\bis\s*\.notFactory\(/u.source,
              /\bis\s*\.orFactory\(/u.source,
              /\bis\s*\.arrayOf\(/u.source,
              /\bis\s*\.notBoolean\(/u.source,
              /\bis\s*\.notBooleanU\(/u.source,
              /\bis\s*\.notCallable\(/u.source,
              /\bis\s*\.notCallableU\(/u.source,
              /\bis\s*\.notEmpty\(/u.source,
              /\bis\s*\.indexedObjectOf\(/u.source,
              /\bis\s*\.notNull\(/u.source,
              /\bis\s*\.notNumStr\(/u.source,
              /\bis\s*\.notNumber\(/u.source,
              /\bis\s*\.notNumberU\(/u.source,
              /\bis\s*\.notObject\(/u.source,
              /\bis\s*\.objectOf\(/u.source,
              /\bis\s*\.notString\(/u.source,
              /\bis\s*\.notStringU\(/u.source,
              /\bis\s*\.notUndefined\(/u.source,
              /\bo\s*\.freezeDeep\(/u.source,
              /\bo\s*\.fromEntriesExhaustive\(/u.source,
              /\bo\s*\.unfreezeDeep\(/u.source,
              /\bregexp\s*\.sliceOrFail\(/u.source,
              /\bs\s*\.pathUtilsAddLeadingSlash\(/u.source,
              /\bs\s*\.pathUtilsAddTrailingSlash\(/u.source,
              /\bs\s*\.pathUtilsCanonicalize\(/u.source,
              /\bs\s*\.pathUtilsJoin\(/u.source,
              /\bs\s*\.pathUtilsRemoveLeadingSlash\(/u.source,
              /\bs\s*\.pathUtilsRemoveTrailingSlash\(/u.source
            ]
          },
          {
            patterns: [
              /\.fromPairs\(/u.source,
              /\.not\s*\.toThrow\((?!\))/u.source,
              /\.toThrow\(\s*["'A-Z`]/u.source,
              /\bValidationObject<\s*\w+\s*>\s*=\s*createValidationObject\b/u
                .source,
              /\bcreateValidationObject\(/u.source,
              `\bReadonly<\\s*(?:${readonlyIgnoreTypes.join("|")})\\s*[<>]`
            ]
          },
          {
            patterns: [/\.exists\(\)\s*\)\s*\.toBeFalse\(\);/u.source],
            replacement: ").not.toExist();"
          },
          {
            patterns: [/\.exists\(\)\s*\)\s*\.toBeTrue\(\);/u.source],
            replacement: ").toExist();"
          },
          {
            patterns: [
              /\.html\(\)\s*\)\s*.toStrictEqual\(\s*(?=["'`])/u.source
            ],
            replacement: ").htmlToEqual("
          },
          {
            patterns: [
              /\.text\(\)\s*\)\s*.toStrictEqual\(\s*(?=["'`])/u.source
            ],
            replacement: ").textToEqual("
          },
          {
            patterns: [/\.toBeCalledTimes\(\s*0\s*\);/u.source],
            replacement: ".not.toBeCalled();"
          },
          {
            patterns: [/\.toStrictEqual\(\s*false\s*\);/u.source],
            replacement: ".toBeFalse();"
          },
          {
            patterns: [/\.toStrictEqual\(\s*null\s*\);/u.source],
            replacement: ".toBeNull();"
          },
          {
            patterns: [/\.toStrictEqual\(\s*true\s*\);/u.source],
            replacement: ".toBeTrue();"
          },
          {
            patterns: [/\.toStrictEqual\(\s*undefined\s*\);/u.source],
            replacement: ".toBeUndefined();"
          },
          {
            patterns: [/catch\s*\(e:\s*unknown\)/u.source],
            replacement: "catch (e)"
          },
          {
            patterns: [
              /\[\s*\.\.\.\w+\s*\]/u.source,
              /\[\s*\.\.\.\w+\s*\.\w+\s*\]/u.source,
              /\[\s*\.\.\.\w+\s*\.\w+\s*\.\w+\s*\]/u.source
            ],
            subOptionsId: "array"
          },
          {
            patterns: [
              /[=]== null/u.source,
              /[=]== undefined/u.source,
              /!== null/u.source,
              /!== undefined/u.source
            ],
            subOptionsId: "guards"
          },
          {
            patterns: [
              /\{\s*\.\.\.\w+\s*\}/u.source,
              /\{\s*\.\.\.\w+\s*\.\w+\s*\}/u.source,
              /\{\s*\.\.\.\w+\s*\.\w+\s*\.\w+\s*\}/u.source,
              /\bObject\s*\.assign\(/u.source,
              /\bObject\s*\.getPrototypeOf\(/u.source
            ],
            subOptionsId: "object"
          },
          {
            patterns: [
              /\bPartial<Record\b/u.source,
              /\bReadonly<\s*Array\b/u.source,
              /\bReadonly<\s*Entry\b/u.source,
              /\bReadonly<\s*IndexedObject\b/u.source,
              /\bReadonly<\s*Map\b/u.source,
              /\bReadonly<\s*PartialRecord\b/u.source,
              /\bReadonly<\s*Record\b/u.source,
              /\bReadonly<\s*Set\b/u.source,
              /\bnull\s*\|\s*undefined\b/u.source,
              /\bundefined\s*\|\s*null\b/u.source,
              /\b(?:boolean|number|object|string)\s*\|\s*empty\b/u.source,
              /\b(?:boolean|number|object|string)\s*\|\s*undefined\b/u.source
            ],
            subOptionsId: "types.core"
          }
        ]
      }
    ],
    "@skylib/disallow-identifier": [
      "warn",
      {
        filesToSkip: ["*.js"],
        rules: [
          {
            ids: ["describe", "toThrowError"]
          },
          {
            filesToSkip: ["./tests/**"],
            ids: ["JQuery"]
          },
          {
            ids: ["JSON"],
            subOptionsId: "json"
          },
          {
            ids: ["Reflect"],
            subOptionsId: "reflect"
          },
          {
            ids: ["clearInterval", "clearTimeout", "setInterval", "setTimeout"],
            subOptionsId: "timer"
          }
        ]
      }
    ],
    "@skylib/disallow-import": [
      "warn",
      {
        rules: [
          {
            disallow: ["../src/**"]
          },
          {
            disallow: ["@/**"],
            filesToSkip: ["./tests/**"]
          },
          {
            disallow: [lodashDisallow, typelibDisallow]
          }
        ]
      }
    ],
    "@skylib/empty-lines-around-comment": "warn",
    "@skylib/exhaustive-switch": "warn",
    "@skylib/no-inferrable-types": "warn",
    "@skylib/no-mutable-signature": [
      "warn",
      {
        ignoreClasses: true,
        ignoreIdentifiers: readonlyIgnoreIdentifiers,
        ignoreTypes: readonlyIgnoreTypes
      }
    ],
    "@skylib/no-unnecessary-readonly": "warn",
    "@skylib/no-unnecessary-writable": "warn",
    "@skylib/no-unsafe-object-assignment": ["warn", { filesToSkip: ["*.js"] }],
    "@skylib/no-unused-import": "warn",
    "@skylib/prefer-readonly": [
      "warn",
      {
        excludeSelectors: ["ArrowFunctionExpression"],
        filesToSkip: ["*.js", "./tests/**"],
        ignoreClasses: true,
        ignoreIdentifiers: readonlyIgnoreIdentifiers,
        ignoreTypes: readonlyIgnoreTypes,
        includeSelectors: [
          ":matches(AssignmentExpression, VariableDeclarator) > ArrowFunctionExpression",
          "ClassProperty > Identifier",
          ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > Identifier"
        ]
      }
    ],
    "@skylib/require-jsdoc": [
      "warn",
      {
        excludeSelectors: ["ClassDeclaration", "FunctionDeclaration"],
        filesToSkip: ["*.js", "./tests/**"],
        includeSelectors: [
          ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > ExpressionStatement > AssignmentExpression > ArrowFunctionExpression",
          ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > FunctionDeclaration"
        ],
        interfaceOptions: ["callSignatures", "constructSignatures"],
        propertyOptions: ["function"]
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
    "@skylib/sort-keys": "warn",
    "@skylib/template-literal-format": "warn",
    "import/first": "warn",
    "import/group-exports": "off",
    "import/max-dependencies": "off",
    "import/named": "warn",
    "import/namespace": "warn",
    "import/newline-after-import": "off",
    "import/no-absolute-path": "warn",
    "import/no-amd": "warn",
    "import/no-anonymous-default-export": "off",
    "import/no-commonjs": "off",
    "import/no-cycle": "warn",
    "import/no-default-export": "off",
    "import/no-deprecated": "warn",
    "import/no-duplicates": "warn",
    "import/no-dynamic-require": "warn",
    "import/no-extraneous-dependencies": [
      "warn",
      {
        bundledDependencies: false,
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: true
      }
    ],
    "import/no-import-module-exports": "warn",
    "import/no-internal-modules": "off",
    "import/no-mutable-exports": "warn",
    "import/no-named-as-default": "warn",
    "import/no-named-as-default-member": "warn",
    "import/no-named-default": "warn",
    "import/no-named-export": "off",
    "import/no-namespace": "off",
    "import/no-nodejs-modules": "warn",
    "import/no-relative-packages": "warn",
    "import/no-relative-parent-imports": "warn",
    "import/no-restricted-paths": "warn",
    "import/no-self-import": "warn",
    "import/no-unassigned-import": [
      "warn",
      {
        allow: ["**/*.css", "**/*.scss", "@skylib/config/src/jest-globals"]
      }
    ],
    "import/no-unresolved": "off",
    "import/no-unused-modules": "warn",
    "import/no-useless-path-segments": "warn",
    "import/no-webpack-loader-syntax": "warn",
    "import/order": "off",
    "import/prefer-default-export": "off",
    "import/unambiguous": "off",
    "jsdoc/check-access": ["warn", { contexts: jsdocContexts }],
    "jsdoc/check-alignment": ["warn", { contexts: jsdocContexts }],
    "jsdoc/check-examples": "off",
    "jsdoc/check-indentation": "warn",
    "jsdoc/check-line-alignment": "warn",
    "jsdoc/check-param-names": "warn",
    "jsdoc/check-property-names": "warn",
    "jsdoc/check-syntax": ["warn", { contexts: jsdocContexts }],
    "jsdoc/check-tag-names": ["warn", { definedTags: ["jest-environment"] }],
    "jsdoc/check-types": "warn",
    "jsdoc/check-values": "warn",
    "jsdoc/empty-tags": "warn",
    "jsdoc/implements-on-classes": ["warn", { contexts: jsdocContexts }],
    "jsdoc/match-description": ["warn", { contexts: jsdocContexts }],
    "jsdoc/multiline-blocks": ["warn", { contexts: jsdocContexts }],
    "jsdoc/newline-after-description": "warn",
    "jsdoc/no-bad-blocks": "warn",
    "jsdoc/no-defaults": ["warn", { contexts: jsdocContexts }],
    "jsdoc/no-missing-syntax": "off",
    "jsdoc/no-multi-asterisks": ["warn", { contexts: jsdocContexts }],
    "jsdoc/no-restricted-syntax": "off",
    "jsdoc/no-types": ["warn", { contexts: jsdocContexts }],
    "jsdoc/no-undefined-types": "warn",
    "jsdoc/require-asterisk-prefix": "warn",
    "jsdoc/require-description": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-description-complete-sentence": "warn",
    "jsdoc/require-example": "off",
    "jsdoc/require-file-overview": "off",
    "jsdoc/require-hyphen-before-param-description": "warn",
    "jsdoc/require-jsdoc": "off",
    "jsdoc/require-param": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-param-description": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-param-name": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-param-type": "off",
    "jsdoc/require-property": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-property-description": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-property-name": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-property-type": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-returns": [
      "warn",
      {
        checkGetters: false,
        contexts: jsdocContexts
      }
    ],
    "jsdoc/require-returns-check": "warn",
    "jsdoc/require-returns-description": ["warn", { contexts: jsdocContexts }],
    "jsdoc/require-returns-type": "off",
    "jsdoc/require-throws": "off",
    "jsdoc/require-yields": "off",
    "jsdoc/require-yields-check": ["warn", { contexts: jsdocContexts }],
    "jsdoc/tag-lines": "warn",
    "jsdoc/valid-types": ["warn", { contexts: jsdocContexts }],
    "prettier/prettier": "warn",
    "regexp/confusing-quantifier": "warn",
    "regexp/control-character-escape": "warn",
    "regexp/hexadecimal-escape": "warn",
    "regexp/letter-case": "warn",
    "regexp/match-any": "warn",
    "regexp/negation": "warn",
    "regexp/no-assertion-capturing-group": "warn",
    "regexp/no-dupe-characters-character-class": "warn",
    "regexp/no-dupe-disjunctions": "warn",
    "regexp/no-empty-alternative": "warn",
    "regexp/no-empty-capturing-group": "warn",
    "regexp/no-empty-group": "warn",
    "regexp/no-empty-lookarounds-assertion": "warn",
    "regexp/no-escape-backspace": "warn",
    "regexp/no-invisible-character": "warn",
    "regexp/no-lazy-ends": "warn",
    "regexp/no-legacy-features": "warn",
    "regexp/no-non-standard-flag": "warn",
    "regexp/no-obscure-range": "warn",
    "regexp/no-octal": "warn",
    "regexp/no-optional-assertion": "warn",
    "regexp/no-potentially-useless-backreference": "warn",
    "regexp/no-standalone-backslash": "warn",
    "regexp/no-super-linear-backtracking": "warn",
    "regexp/no-super-linear-move": "warn",
    "regexp/no-trivially-nested-assertion": "warn",
    "regexp/no-trivially-nested-quantifier": "warn",
    "regexp/no-unused-capturing-group": "warn",
    "regexp/no-useless-assertions": "warn",
    "regexp/no-useless-backreference": "warn",
    "regexp/no-useless-character-class": "warn",
    "regexp/no-useless-dollar-replacements": "warn",
    "regexp/no-useless-escape": "warn",
    "regexp/no-useless-exactly-quantifier": "warn",
    "regexp/no-useless-flag": "warn",
    "regexp/no-useless-lazy": "warn",
    "regexp/no-useless-non-capturing-group": "warn",
    "regexp/no-useless-non-greedy": "warn",
    "regexp/no-useless-quantifier": "warn",
    "regexp/no-useless-range": "warn",
    "regexp/no-useless-two-nums-quantifier": "warn",
    "regexp/no-zero-quantifier": "warn",
    "regexp/optimal-lookaround-quantifier": "warn",
    "regexp/optimal-quantifier-concatenation": "warn",
    "regexp/order-in-character-class": "warn",
    "regexp/prefer-character-class": "warn",
    "regexp/prefer-d": "warn",
    "regexp/prefer-escape-replacement-dollar-char": "warn",
    "regexp/prefer-named-backreference": "warn",
    "regexp/prefer-plus-quantifier": "warn",
    "regexp/prefer-predefined-assertion": "warn",
    "regexp/prefer-quantifier": "warn",
    "regexp/prefer-question-quantifier": "warn",
    "regexp/prefer-range": "warn",
    "regexp/prefer-regexp-exec": "warn",
    "regexp/prefer-regexp-test": "warn",
    "regexp/prefer-star-quantifier": "warn",
    "regexp/prefer-t": "warn",
    "regexp/prefer-unicode-codepoint-escapes": "warn",
    "regexp/prefer-w": "warn",
    "regexp/sort-alternatives": "warn",
    "regexp/sort-character-class-elements": "warn",
    "regexp/sort-flags": "warn",
    "regexp/strict": "warn",
    "regexp/unicode-escape": "warn",
    "simple-import-sort/exports": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          [/^\0?[\dA-Za-z]/u.source, /^\0?(?!@skylib\/)@[\dA-Za-z]/u.source],
          [/^\0?@skylib\//u.source],
          [/^\0?@\//u.source],
          [/^\0?\.\./u.source],
          [/^\0?\.(?!\.)/u.source]
        ]
      }
    ],
    "sort-destructure-keys/sort-destructure-keys": [
      "warn",
      { caseSensitive: true }
    ],
    "switch-case/newline-between-switch-case": [
      "warn",
      "always",
      { fallthrough: "never" }
    ],
    "switch-case/no-case-curly": "off",
    "unicorn/better-regex": "warn",
    "unicorn/catch-error-name": ["warn", { name: "e" }],
    "unicorn/consistent-destructuring": "warn",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/custom-error-definition": "warn",
    "unicorn/empty-brace-spaces": "off",
    "unicorn/error-message": "off",
    "unicorn/escape-case": "warn",
    "unicorn/expiring-todo-comments": "warn",
    "unicorn/explicit-length-check": "off",
    "unicorn/filename-case": "off",
    "unicorn/import-index": "warn",
    "unicorn/import-style": "warn",
    "unicorn/new-for-builtins": "warn",
    "unicorn/no-abusive-eslint-disable": "warn",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-for-each": "warn",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/no-array-push-push": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-console-spaces": "warn",
    "unicorn/no-document-cookie": "warn",
    "unicorn/no-for-loop": "warn",
    "unicorn/no-hex-escape": "warn",
    "unicorn/no-instanceof-array": "warn",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/no-lonely-if": "warn",
    "unicorn/no-nested-ternary": "warn",
    "unicorn/no-new-array": "warn",
    "unicorn/no-new-buffer": "warn",
    "unicorn/no-null": "warn",
    "unicorn/no-object-as-default-parameter": "warn",
    "unicorn/no-process-exit": "warn",
    "unicorn/no-static-only-class": "warn",
    "unicorn/no-this-assignment": "warn",
    "unicorn/no-unreadable-array-destructuring": "warn",
    "unicorn/no-unsafe-regex": "warn",
    "unicorn/no-unused-properties": "warn",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-zero-fractions": "warn",
    "unicorn/number-literal-case": "off",
    "unicorn/numeric-separators-style": "warn",
    "unicorn/prefer-add-event-listener": "warn",
    "unicorn/prefer-array-find": "warn",
    "unicorn/prefer-array-flat": "off",
    "unicorn/prefer-array-flat-map": "off",
    "unicorn/prefer-array-index-of": "warn",
    "unicorn/prefer-array-some": "warn",
    "unicorn/prefer-at": "warn",
    "unicorn/prefer-date-now": "warn",
    "unicorn/prefer-default-parameters": "warn",
    "unicorn/prefer-dom-node-append": "warn",
    "unicorn/prefer-dom-node-dataset": "warn",
    "unicorn/prefer-dom-node-remove": "warn",
    "unicorn/prefer-dom-node-text-content": "warn",
    "unicorn/prefer-includes": "warn",
    "unicorn/prefer-keyboard-event-key": "warn",
    "unicorn/prefer-math-trunc": "warn",
    "unicorn/prefer-modern-dom-apis": "warn",
    "unicorn/prefer-module": "off",
    "unicorn/prefer-negative-index": "warn",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prefer-number-properties": "warn",
    "unicorn/prefer-object-has-own": "off",
    "unicorn/prefer-optional-catch-binding": "warn",
    "unicorn/prefer-prototype-methods": "warn",
    "unicorn/prefer-query-selector": "warn",
    "unicorn/prefer-reflect-apply": "warn",
    "unicorn/prefer-regexp-test": "warn",
    "unicorn/prefer-set-has": "warn",
    "unicorn/prefer-spread": "warn",
    "unicorn/prefer-string-replace-all": "off",
    "unicorn/prefer-string-slice": "warn",
    "unicorn/prefer-string-starts-ends-with": "warn",
    "unicorn/prefer-string-trim-start-end": "warn",
    "unicorn/prefer-switch": "warn",
    "unicorn/prefer-ternary": "warn",
    "unicorn/prefer-top-level-await": "warn",
    "unicorn/prefer-type-error": "warn",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/require-array-join-separator": "warn",
    "unicorn/require-number-to-fixed-digits-argument": "warn",
    "unicorn/require-post-message-target-origin": "warn",
    "unicorn/string-content": "warn",
    "unicorn/throw-new-error": "warn"
  },
  // @skylib/sort-keys break
  overrides: [
    {
      files: ["*.ts", "*.vue"],
      rules: {
        "@typescript-eslint/adjacent-overload-signatures": "warn",
        "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
        "@typescript-eslint/await-thenable": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/ban-tslint-comment": "warn",
        "@typescript-eslint/ban-types": [
          "warn",
          {
            extendDefaults: false,
            types: {
              "Object": "Not allowed",
              "{}": "Not allowed"
            }
          }
        ],
        "@typescript-eslint/brace-style": "off",
        "@typescript-eslint/class-literal-property-style": "warn",
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/comma-spacing": "off",
        "@typescript-eslint/consistent-indexed-object-style": "warn",
        "@typescript-eslint/consistent-type-assertions": "warn",
        "@typescript-eslint/consistent-type-definitions": "warn",
        "@typescript-eslint/consistent-type-imports": [
          "warn",
          {
            disallowTypeAnnotations: true,
            prefer: "type-imports"
          }
        ],
        "@typescript-eslint/default-param-last": "warn",
        "@typescript-eslint/dot-notation": "warn",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-member-accessibility": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/func-call-spacing": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/init-declarations": "warn",
        "@typescript-eslint/keyword-spacing": "off",
        "@typescript-eslint/lines-between-class-members": "warn",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/method-signature-style": ["warn", "property"],
        "@typescript-eslint/naming-convention": [
          "warn",
          {
            format: ["camelCase"],
            selector: ["default"]
          },
          {
            format: ["camelCase"],
            leadingUnderscore: "allow",
            selector: ["method", "parameter", "property"]
          },
          {
            format: ["camelCase", "PascalCase"],
            selector: ["function", "typeLike"]
          },
          {
            format: ["camelCase", "PascalCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
            selector: ["variable"]
          },
          {
            format: ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"],
            leadingUnderscore: "allow",
            selector: ["typeProperty"]
          },
          {
            // eslint-disable-next-line unicorn/no-null
            format: null,
            selector: ["objectLiteralMethod", "objectLiteralProperty"]
          }
        ],
        "@typescript-eslint/no-array-constructor": "warn",
        "@typescript-eslint/no-base-to-string": "warn",
        "@typescript-eslint/no-confusing-non-null-assertion": "warn",
        "@typescript-eslint/no-confusing-void-expression": "warn",
        "@typescript-eslint/no-dupe-class-members": "warn",
        "@typescript-eslint/no-duplicate-imports": "warn",
        "@typescript-eslint/no-dynamic-delete": "warn",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-extra-non-null-assertion": "warn",
        "@typescript-eslint/no-extra-parens": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "@typescript-eslint/no-extraneous-class": "warn",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-for-in-array": "warn",
        "@typescript-eslint/no-implicit-any-catch": "off",
        "@typescript-eslint/no-implied-eval": "warn",
        "@typescript-eslint/no-inferrable-types": "warn",
        "@typescript-eslint/no-invalid-this": "off",
        "@typescript-eslint/no-invalid-void-type": [
          "warn",
          { allowAsThisParameter: true }
        ],
        "@typescript-eslint/no-loop-func": "warn",
        "@typescript-eslint/no-loss-of-precision": "warn",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-misused-new": "warn",
        "@typescript-eslint/no-misused-promises": "warn",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/no-parameter-properties": "warn",
        "@typescript-eslint/no-redeclare": "warn",
        "@typescript-eslint/no-require-imports": "warn",
        "@typescript-eslint/no-shadow": [
          "warn",
          {
            allow: ["event", "name"],
            builtinGlobals: true,
            hoist: "all",
            ignoreFunctionTypeParameterNameValueShadow: false,
            ignoreTypeValueShadow: false
          }
        ],
        "@typescript-eslint/no-this-alias": "warn",
        "@typescript-eslint/no-throw-literal": "warn",
        "@typescript-eslint/no-type-alias": "off",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
        "@typescript-eslint/no-unnecessary-condition": "warn",
        "@typescript-eslint/no-unnecessary-qualifier": "warn",
        "@typescript-eslint/no-unnecessary-type-arguments": "warn",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-unnecessary-type-constraint": "warn",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-unsafe-call": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/no-unsafe-return": "warn",
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: /^(?:_|omit)/u.source,
            varsIgnorePattern: /^(?:_|omit)/u.source
          }
        ],
        "@typescript-eslint/no-unused-vars-experimental": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-useless-constructor": "warn",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@typescript-eslint/object-curly-spacing": "off",
        "@typescript-eslint/prefer-as-const": "warn",
        "@typescript-eslint/prefer-enum-initializers": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-function-type": "warn",
        "@typescript-eslint/prefer-includes": "warn",
        "@typescript-eslint/prefer-literal-enum-member": "warn",
        "@typescript-eslint/prefer-namespace-keyword": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/prefer-optional-chain": "off",
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/prefer-reduce-type-parameter": "warn",
        "@typescript-eslint/prefer-regexp-exec": "warn",
        "@typescript-eslint/prefer-string-starts-ends-with": "warn",
        "@typescript-eslint/prefer-ts-expect-error": "warn",
        "@typescript-eslint/promise-function-async": "warn",
        "@typescript-eslint/quotes": ["warn", "double", { avoidEscape: true }],
        "@typescript-eslint/require-array-sort-compare": "warn",
        "@typescript-eslint/require-await": "warn",
        "@typescript-eslint/restrict-plus-operands": "warn",
        "@typescript-eslint/restrict-template-expressions": [
          "warn",
          { allowNumber: true }
        ],
        "@typescript-eslint/return-await": "warn",
        "@typescript-eslint/semi": "off",
        "@typescript-eslint/sort-type-union-intersection-members": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/space-infix-ops": "off",
        "@typescript-eslint/strict-boolean-expressions": "warn",
        "@typescript-eslint/switch-exhaustiveness-check": "off",
        "@typescript-eslint/triple-slash-reference": "warn",
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/typedef": "off",
        "@typescript-eslint/unbound-method": "warn",
        "@typescript-eslint/unified-signatures": "off",
        "adjacent-overload-signatures": "off",
        "array-callback-return": "off",
        "brace-style": "off",
        "comma-dangle": "off",
        "comma-spacing": "off",
        "consistent-return": "off",
        "default-case": "off",
        "default-param-last": "off",
        "dot-notation": "off",
        "func-call-spacing": "off",
        "getter-return": "off",
        "indent": "off",
        "init-declarations": "off",
        "keyword-spacing": "off",
        "lines-between-class-members": "off",
        "no-array-constructor": "off",
        "no-dupe-class-members": "off",
        "no-duplicate-imports": "off",
        "no-empty-function": "off",
        "no-extra-parens": "off",
        "no-extra-semi": "off",
        "no-implied-eval": "off",
        "no-invalid-this": "off",
        "no-loop-func": "off",
        "no-loss-of-precision": "off",
        "no-magic-numbers": "off",
        "no-redeclare": "off",
        "no-shadow": "off",
        "no-throw-literal": "off",
        "no-undef": "off",
        "no-underscore-dangle": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
        "no-useless-constructor": "off",
        "object-curly-spacing": "off",
        "quotes": "off",
        "require-await": "off",
        "return-await": "off",
        "semi": "off",
        "space-before-function-paren": "off",
        "space-infix-ops": "off"
      }
    },
    {
      files: ["*.vue"],
      rules: {
        "vue/array-bracket-newline": "off",
        "vue/array-bracket-spacing": "off",
        "vue/arrow-spacing": "off",
        "vue/attribute-hyphenation": "warn",
        "vue/attributes-order": [
          "warn",
          {
            alphabetical: true,
            order: [
              "DEFINITION",
              "LIST_RENDERING",
              "CONDITIONALS",
              "RENDER_MODIFIERS",
              "GLOBAL",
              "UNIQUE",
              "SLOT",
              "TWO_WAY_BINDING",
              "OTHER_DIRECTIVES",
              "OTHER_ATTR",
              "EVENTS",
              "CONTENT"
            ]
          }
        ],
        "vue/block-spacing": "off",
        "vue/block-tag-newline": "off",
        "vue/brace-style": "off",
        "vue/camelcase": "warn",
        "vue/comma-dangle": "off",
        "vue/comma-spacing": "off",
        "vue/comma-style": "off",
        "vue/comment-directive": "warn",
        "vue/component-definition-name-casing": ["warn", "kebab-case"],
        "vue/component-name-in-template-casing": "warn",
        "vue/component-tags-order": "warn",
        "vue/custom-event-name-casing": "warn",
        "vue/dot-location": "off",
        "vue/dot-notation": "warn",
        "vue/eqeqeq": "warn",
        "vue/experimental-script-setup-vars": "warn",
        "vue/func-call-spacing": "off",
        "vue/html-button-has-type": "warn",
        "vue/html-closing-bracket-newline": "off",
        "vue/html-closing-bracket-spacing": "off",
        "vue/html-comment-content-newline": "off",
        "vue/html-comment-content-spacing": "off",
        "vue/html-comment-indent": "off",
        "vue/html-end-tags": "off",
        "vue/html-indent": "off",
        "vue/html-quotes": "off",
        "vue/html-self-closing": [
          "warn",
          {
            html: {
              component: "always",
              normal: "never",
              void: "always"
            },
            math: "always",
            svg: "always"
          }
        ],
        "vue/jsx-uses-vars": "warn",
        "vue/key-spacing": "off",
        "vue/keyword-spacing": "off",
        "vue/match-component-file-name": "warn",
        "vue/max-attributes-per-line": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/mustache-interpolation-spacing": "off",
        "vue/name-property-casing": ["warn", "kebab-case"],
        "vue/new-line-between-multi-line-property": "off",
        "vue/next-tick-style": "warn",
        "vue/no-arrow-functions-in-watch": "warn",
        "vue/no-async-in-computed-properties": "warn",
        "vue/no-bare-strings-in-template": "warn",
        "vue/no-boolean-default": "warn",
        "vue/no-confusing-v-for-v-if": "warn",
        "vue/no-constant-condition": "warn",
        "vue/no-custom-modifiers-on-v-model": "warn",
        "vue/no-deprecated-data-object-declaration": "warn",
        "vue/no-deprecated-destroyed-lifecycle": "warn",
        "vue/no-deprecated-dollar-listeners-api": "off",
        "vue/no-deprecated-dollar-scopedslots-api": "off",
        "vue/no-deprecated-events-api": "off",
        "vue/no-deprecated-filter": "off",
        "vue/no-deprecated-functional-template": "off",
        "vue/no-deprecated-html-element-is": "off",
        "vue/no-deprecated-inline-template": "off",
        "vue/no-deprecated-props-default-this": "off",
        "vue/no-deprecated-scope-attribute": "warn",
        "vue/no-deprecated-slot-attribute": "warn",
        "vue/no-deprecated-slot-scope-attribute": "warn",
        "vue/no-deprecated-v-bind-sync": "off",
        "vue/no-deprecated-v-on-native-modifier": "off",
        "vue/no-deprecated-v-on-number-modifiers": "off",
        "vue/no-deprecated-vue-config-keycodes": "off",
        "vue/no-dupe-keys": "warn",
        "vue/no-dupe-v-else-if": "warn",
        "vue/no-duplicate-attr-inheritance": "off",
        "vue/no-duplicate-attributes": "warn",
        "vue/no-empty-component-block": "warn",
        "vue/no-empty-pattern": "warn",
        "vue/no-extra-parens": "off",
        "vue/no-invalid-model-keys": "warn",
        "vue/no-irregular-whitespace": "warn",
        "vue/no-lifecycle-after-await": "warn",
        "vue/no-lone-template": "warn",
        "vue/no-multi-spaces": "off",
        "vue/no-multiple-objects-in-class": "warn",
        "vue/no-multiple-slot-args": "warn",
        "vue/no-multiple-template-root": "warn",
        "vue/no-mutating-props": "warn",
        "vue/no-parsing-error": "warn",
        "vue/no-potential-component-option-typo": "warn",
        "vue/no-ref-as-operand": "warn",
        "vue/no-reserved-component-names": "warn",
        "vue/no-reserved-keys": "warn",
        "vue/no-restricted-block": "warn",
        "vue/no-restricted-call-after-await": "warn",
        "vue/no-restricted-component-options": "warn",
        "vue/no-restricted-custom-event": "warn",
        "vue/no-restricted-props": "warn",
        "vue/no-restricted-static-attribute": "warn",
        "vue/no-restricted-syntax": "warn",
        "vue/no-restricted-v-bind": "warn",
        "vue/no-setup-props-destructure": "warn",
        "vue/no-shared-component-data": "warn",
        "vue/no-side-effects-in-computed-properties": "warn",
        "vue/no-spaces-around-equal-signs-in-attribute": "off",
        "vue/no-sparse-arrays": "warn",
        "vue/no-static-inline-styles": "warn",
        "vue/no-template-key": "warn",
        "vue/no-template-shadow": "warn",
        "vue/no-template-target-blank": "warn",
        "vue/no-textarea-mustache": "warn",
        "vue/no-unregistered-components": [
          "warn",
          {
            ignorePatterns: [
              /^router-link$/u.source,
              /^router-view$/u.source,
              /^q-/u.source
            ]
          }
        ],
        "vue/no-unsupported-features": "warn",
        "vue/no-unused-components": "warn",
        "vue/no-unused-properties": "warn",
        "vue/no-unused-refs": "off",
        "vue/no-unused-vars": [
          "warn",
          { ignorePattern: /^(?:_|omit)/u.source }
        ],
        "vue/no-use-v-if-with-v-for": "warn",
        "vue/no-useless-concat": "warn",
        "vue/no-useless-mustaches": "warn",
        "vue/no-useless-v-bind": "warn",
        "vue/no-v-for-template-key": "warn",
        "vue/no-v-for-template-key-on-child": "warn",
        "vue/no-v-html": "warn",
        "vue/no-v-model-argument": "warn",
        "vue/no-watch-after-await": "warn",
        "vue/object-curly-newline": "off",
        "vue/object-curly-spacing": "off",
        "vue/object-property-newline": "off",
        "vue/one-component-per-file": "warn",
        "vue/operator-linebreak": "off",
        "vue/order-in-components": "warn",
        "vue/padding-line-between-blocks": "warn",
        "vue/prefer-template": "warn",
        "vue/prop-name-casing": "warn",
        "vue/require-component-is": "warn",
        "vue/require-default-prop": "warn",
        "vue/require-direct-export": "off",
        "vue/require-explicit-emits": "warn",
        "vue/require-name-property": "warn",
        "vue/require-prop-type-constructor": "warn",
        "vue/require-prop-types": "warn",
        "vue/require-render-return": "warn",
        "vue/require-slots-as-functions": "warn",
        "vue/require-toggle-inside-transition": "warn",
        "vue/require-v-for-key": "warn",
        "vue/require-valid-default-prop": "warn",
        "vue/return-in-computed-property": "warn",
        "vue/return-in-emits-validator": "warn",
        "vue/script-indent": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/sort-keys": "off",
        "vue/space-in-parens": "off",
        "vue/space-infix-ops": "off",
        "vue/space-unary-ops": "off",
        "vue/static-class-names-order": "warn",
        "vue/template-curly-spacing": "off",
        "vue/this-in-template": "warn",
        "vue/use-v-on-exact": "warn",
        "vue/v-bind-style": "warn",
        "vue/v-for-delimiter-style": "warn",
        "vue/v-on-event-hyphenation": "warn",
        "vue/v-on-function-call": "off",
        "vue/v-on-style": "warn",
        "vue/v-slot-style": "warn",
        "vue/valid-next-tick": "warn",
        "vue/valid-template-root": "warn",
        "vue/valid-v-bind": "warn",
        "vue/valid-v-bind-sync": "warn",
        "vue/valid-v-cloak": "warn",
        "vue/valid-v-else": "warn",
        "vue/valid-v-else-if": "warn",
        "vue/valid-v-for": "warn",
        "vue/valid-v-html": "warn",
        "vue/valid-v-if": "warn",
        "vue/valid-v-is": "warn",
        "vue/valid-v-model": "warn",
        "vue/valid-v-on": "warn",
        "vue/valid-v-once": "warn",
        "vue/valid-v-pre": "warn",
        "vue/valid-v-show": "warn",
        "vue/valid-v-slot": "warn",
        "vue/valid-v-text": "warn"
      }
    },
    {
      files: ["*.ts", "*.vue"],
      rules: {
        "import/no-commonjs": "warn",
        "unicorn/prefer-module": "warn"
      }
    },
    {
      files: ["*.ts"],
      rules: {
        "import/no-default-export": "warn"
      }
    },
    {
      files: ["*.vue"],
      rules: {
        "@skylib/sort-keys": ["warn", { ignoreDefaultExport: true }],
        "import/prefer-default-export": "warn"
      }
    },
    {
      files: ["*.js"],
      rules: {
        "import/no-unresolved": "warn"
      }
    },
    {
      files: options.utility
        ? ["./**"]
        : [
            "./*",
            "./__mocks__/**",
            "./tests/**",
            "./src/**/__mocks__/**",
            "./src/testUtils/**"
          ],
      rules: {
        "import/no-dynamic-require": "off",
        "import/no-nodejs-modules": "off",
        "unicorn/prefer-module": "off"
      }
    },
    {
      files: [
        "./*",
        "./__mocks__/**",
        "./tests/**",
        "./src/**/__mocks__/**",
        "./src/testUtils/**"
      ],
      rules: {
        "import/no-relative-parent-imports": "off"
      }
    },
    {
      files: ["./*", "./__mocks__/**", "./tests/**"],
      rules: {
        "import/no-extraneous-dependencies": [
          "warn",
          {
            bundledDependencies: false,
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: true
          }
        ]
      }
    },
    {
      files: ["./tests/**"],
      rules: {
        "jsdoc/require-jsdoc": "off",
        "no-await-in-loop": "off",
        "unicorn/no-null": "off"
      }
    }
  ]
};
