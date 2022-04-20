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
    utility: false
  };

  load(fs.realpathSync(".eslintrc.options.js"));
  addDefaults();

  return result;

  function addDefaults() {
    result.consistentImport.push(
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
        sourcePattern: "@skylib/lodash-commonjs-es",
        type: "wildcard"
      },
      {
        altLocalNames: ["nodePath"],
        sourcePattern: "path",
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
      { disallow: ["@/**"], filesToSkip: ["./tests/**"] }
    );

    result.noRestrictedSyntax.push(
      {
        message: "Underscore export is not allowed",
        selector:
          "ExportNamedDeclaration > FunctionDeclaration > Identifier.id[name=/^_/u]"
      },
      {
        message: "Underscore export is not allowed",
        selector:
          "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
      }
    );
  }

  function load(source) {
    const options = (() => {
      switch (typeof source) {
        case "object":
          return source;

        case "string":
          return require(source);

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
      ...rest
    } = options;

    Object.assign(result, rest);
    result.consistentImport.push(...(consistentImport ?? []));
    result.disallowByRegexp.push(...(disallowByRegexp ?? []));
    result.disallowIdentifier.push(...(disallowIdentifier ?? []));
    result.disallowImport.push(...(disallowImport ?? []));
    result.noRestrictedSyntax.push(...(noRestrictedSyntax ?? []));
  }
})();
