module.exports = (() => {
  const fs = require("fs");

  const result = {
    consistentImport: [],
    disallowByRegexp: [],
    disallowIdentifier: [],
    disallowImport: [],
    extraChoreLocations: [],
    extraDefaultExportLocations: [],
    extraTestsLocations: [],
    extraUnassignedImportLocations: [],
    extraUtilsLocations: [],
    noRestrictedSyntax: [],
    quasar: false,
    quasarGlobalComponents: [],
    requireJsdoc: [],
    utility: false
  };

  load(fs.realpathSync(".eslintrc.options.js"));
  addDefaults();

  return result;

  function addDefaults() {
    result.consistentImport.push(
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
      }
    );

    // eslint-disable-next-line no-warning-comments -- https://github.com/gajus/eslint-plugin-jsdoc/issues/864
    // fixme
    result.disallowByRegexp.push({
      contexts: ["comment"],
      patterns: [/(?<!\\)[<>]/u.source],
      subOptionsId: "comment.escape"
    });

    result.disallowImport.push(
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
    );

    result.noRestrictedSyntax.push(
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
        message: "Underscore export is not allowed",
        selector:
          "ExportNamedDeclaration > VariableDeclaration.declaration > VariableDeclarator.declarations > Identifier.id[name=/^_/u]"
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
        message: "Unnecessary initialization",
        selector: "VariableDeclarator > Identifier.init[name=undefined]"
      }
    );

    result.requireJsdoc.push(
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > FunctionDeclaration",
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator.declarations > ObjectExpression.init > Property.properties > FunctionExpression",
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator.declarations > TSAsExpression.init > ObjectExpression.expression > Property.properties > FunctionExpression",
      "PropertyDefinition > ArrowFunctionExpression.value"
    );
  }

  function load(source) {
    const options = (() => {
      switch (typeof source) {
        case "object":
          return source;

        case "string":
          return require(source.startsWith("./")
            ? fs.realpathSync(source)
            : source);

        default:
          throw new Error("Invalid source");
      }
    })();

    if (options.extends) for (const extend of options.extends) load(extend);

    const {
      consistentImport,
      disallowByRegexp,
      disallowIdentifier,
      disallowImport,
      noRestrictedSyntax,
      requireJsdoc,
      ...rest
    } = options;

    Object.assign(result, rest);
    result.consistentImport.push(...(consistentImport ?? []));
    result.disallowByRegexp.push(...(disallowByRegexp ?? []));
    result.disallowIdentifier.push(...(disallowIdentifier ?? []));
    result.disallowImport.push(...(disallowImport ?? []));
    result.noRestrictedSyntax.push(...(noRestrictedSyntax ?? []));
    result.requireJsdoc.push(...(requireJsdoc ?? []));
  }
})();
