const fs = require("fs");

const options = fs.existsSync("./.eslintrc.options.js")
  ? require(fs.realpathSync("./.eslintrc.options.js"))
  : {};

const packageName = fs.existsSync("./package.json")
  ? JSON.parse(fs.readFileSync("./package.json")).name
  : undefined;

const distOrEs = options.es ? "es" : "dist";

const frameworkPrefix =
  packageName === "@skylib/framework" ? "@" : `@skylib/framework/${distOrEs}`;

const functionsPrefix =
  packageName === "@skylib/functions" ? "@" : `@skylib/functions/${distOrEs}`;

const lodash = options.es ? "lodash-es" : "lodash";

const lodashDisallow = options.es ? "lodash" : "lodash-es";

const quasarFrameworkPrefix =
  packageName === "@skylib/quasar-extension"
    ? "@"
    : "@skylib/quasar-extension/src";

const readonlyIgnoreIdentifiers = [
  /^result$/u.source,
  /^_?(?:cache|dynamic|mutable|pool|queue|stack|state|writable)/u.source,
  /(?:Cache|Dynamic|Mutable|Pool|Queue|Stack|State|Writable)$/u.source
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

const skylibDisallow = options.es ? "@skylib/*/dist/**" : "@skylib/*/es/**";

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
            localName: "mdi",
            sourcePattern: "@mdi/js-dynamic",
            type: "wildcard"
          },
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
            localName: "VueDraggable",
            sourcePattern: "vuedraggable",
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
            sourcePattern: "@skylib/eslint-plugin/src/rules/utils",
            type: "wildcard"
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
            autoImportSource: `${functionsPrefix}/map`,
            sourcePattern: "@skylib/functions/*/map",
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
            autoImportSource: `${functionsPrefix}/set`,
            sourcePattern: "@skylib/functions/*/set",
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
            autoImportSource: `${frameworkPrefix}/facade-implementations/compare/natural-compare-wrapper`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/compare/natural-compare-wrapper",
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
            autoImportSource: `${frameworkPrefix}/facade-implementations/inlineSearch/lunr-wrapper`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/inlineSearch/lunr-wrapper",
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
            autoImportSource: `${frameworkPrefix}/facade-implementations/reactiveStorage/reflectStorage`,
            sourcePattern:
              "@skylib/framework/*/facade-implementations/reactiveStorage/reflectStorage",
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
          },
          {
            altLocalNames: ["quasarFrameworkTestUtils"],
            autoImportSource: `${quasarFrameworkPrefix}/testUtils`,
            sourcePattern: "@skylib/quasar-extension/*/testUtils",
            type: "wildcard"
          },
          {
            autoImportSource: `${quasarFrameworkPrefix}/facade-implementations/reactiveStorage/vueStorage`,
            sourcePattern:
              "@skylib/quasar-extension/*/facade-implementations/reactiveStorage/vueStorage",
            type: "wildcard"
          }
        ]
      }
    ],
    "@skylib/disallow-by-regexp": [
      "warn",
      {
        contexts: ["code"],
        rules: [
          {
            contexts: ["comment"],
            patterns: [/\/\* webpackChunkName:(?!\s*"dynamic\/)/u.source]
          },
          {
            filesToSkip: ["*.js"],
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
              /(?<!function\s+)\bpluralReduceRu\(/u.source,
              /(?<!function\s+)\bpropOptionsBoolean\(/u.source,
              /(?<!function\s+)\bpropOptionsDefault\(/u.source,
              /(?<!function\s+)\bpropOptionsRequired\(/u.source,
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
            filesToSkip: ["*.js"],
            patterns: [
              /\.fromPairs\(/u.source,
              /\.not\s*\.toThrow\((?!\))/u.source,
              /\.toThrow\(\s*["'A-Z`]/u.source,
              /\bValidationObject<\s*\w+\s*>\s*=\s*createValidationObject\b/u
                .source,
              /\bcomputed\(/u.source,
              /\bcreateValidationObject\(/u.source,
              /\bfn\s*.run\(\s*\(\):/u.source,
              /\bpropOptions\([^()]+(?<!U)\)/u.source,
              /\bref\(\s*undefined\s*\)/u.source,
              `\bReadonly<\\s*(?:${readonlyIgnoreTypes.join("|")})\\s*[<>]`
            ]
          },
          {
            filesToSkip: ["*.js"],
            patterns: [
              /\.classes\(\)\s*\.includes\(\s*("[^"]*")\s*\)\s*\)\s*\.toBeFalse\(\);/u
                .source
            ],
            replacement: ").not.toHaveClass($1);"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [
              /\.classes\(\)\s*\.includes\(\s*("[^"]*")\s*\)\s*\)\s*\.toBeTrue\(\);/u
                .source
            ],
            replacement: ").toHaveClass($1);"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/\.exists\(\)\s*\)\s*\.toBeFalse\(\);/u.source],
            replacement: ").not.toExist();"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/\.exists\(\)\s*\)\s*\.toBeTrue\(\);/u.source],
            replacement: ").toExist();"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [
              /\.html\(\)\s*\)\s*.(?:toBe|toStrictEqual)\(\s*(?=["'`])/u.source
            ],
            replacement: ").htmlToEqual("
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/\.isVisible\(\)\s*\)\s*\.toBeFalse\(\);/u.source],
            replacement: ").not.toBeVisible();"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/\.isVisible\(\)\s*\)\s*\.toBeTrue\(\);/u.source],
            replacement: ").toBeVisible();"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [
              /\.text\(\)\s*\)\s*.(?:toBe|toStrictEqual)\(\s*(?=["'`])/u.source
            ],
            replacement: ").textToEqual("
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/\.toBeCalledTimes\(\s*0\s*\);/u.source],
            replacement: ".not.toBeCalled();"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/\.(?:toBe|toStrictEqual)\(\s*false\s*\);/u.source],
            replacement: ".toBeFalse();"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/\.(?:toBe|toStrictEqual)\(\s*true\s*\);/u.source],
            replacement: ".toBeTrue();"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/catch\s*\(e:\s*unknown\)/u.source],
            replacement: "catch (e)"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-btn[\s>]/u.source],
            subOptionsId: "BaseButton"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-card[\s>]/u.source],
            subOptionsId: "Card"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-card-actions[\s>]/u.source],
            subOptionsId: "CardActions"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-card-section[\s>]/u.source],
            subOptionsId: "CardSection"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-input[\s>]/u.source],
            subOptionsId: "Input"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-knob[\s>]/u.source],
            subOptionsId: "Knob"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-item[\s>]/u.source],
            subOptionsId: "ListItem"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-menu[\s>]/u.source],
            subOptionsId: "Menu"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-option-group[\s>]/u.source],
            subOptionsId: "OptionGroup"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-toggle[\s>]/u.source],
            subOptionsId: "Toggle"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [/<q-tooltip[\s>]/u.source],
            subOptionsId: "Tooltip"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [
              /\[\s*\.\.\.\w+\s*\]/u.source,
              /\[\s*\.\.\.\w+\s*\.\w+\s*\]/u.source,
              /\[\s*\.\.\.\w+\s*\.\w+\s*\.\w+\s*\]/u.source
            ],
            subOptionsId: "array"
          },
          {
            filesToSkip: ["*.js"],
            patterns: [
              /[=]== null/u.source,
              /[=]== undefined/u.source,
              /!== null/u.source,
              /!== undefined/u.source
            ],
            subOptionsId: "guards"
          },
          {
            filesToSkip: ["*.js"],
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
            filesToSkip: ["*.js"],
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
              /\breadonly\s+(?:NumStr|boolean|number|object|string|unknown)\[\]/u
                .source,
              /\bundefined\s*\|\s*null\b/u.source,
              /\b(?:NumStr|boolean|number|object|string)\s*\|\s*empty\b/u
                .source,
              /\b(?:NumStr|boolean|number|object|string)\s*\|\s*undefined\b/u
                .source
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
            disallow: [lodashDisallow, skylibDisallow]
          }
        ]
      }
    ],
    // eslint-disable-next-line no-warning-comments
    // fixme
    "@skylib/no-mutable-signature": [
      "off",
      {
        ignoreClasses: true,
        ignoreIdentifiers: readonlyIgnoreIdentifiers,
        ignoreInterfaces: true,
        ignoreNumberSignature: true,
        ignoreTypes: readonlyIgnoreTypes
      }
    ],
    "@skylib/no-unsafe-object-assignment": ["warn", { filesToSkip: ["*.js"] }],
    "@skylib/prefer-readonly": [
      "off",
      {
        excludeSelectors: ["ArrowFunctionExpression"],
        filesToSkip: ["*.js", "./tests/**"],
        ignoreClasses: true,
        ignoreIdentifiers: readonlyIgnoreIdentifiers,
        ignoreInferredTypes: true,
        ignoreInterfaces: true,
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
    ]
  }
};
