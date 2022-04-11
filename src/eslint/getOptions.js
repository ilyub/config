module.exports = (() => {
  const fs = require("fs");

  return loadDeep(fs.realpathSync(".eslintrc.options.js"));

  /**
   * Assigns options.
   *
   * @param dest - Dest.
   * @param source - Source.
   */
  function assign(dest, source) {
    const {
      consistentImport,
      disallowByRegexp,
      disallowIdentifier,
      disallowImport,
      noRestrictedSyntax,
      ...rest
    } = source;

    Object.assign(dest, rest);
    dest.consistentImport.push(...consistentImport);
    dest.disallowByRegexp.push(...disallowByRegexp);
    dest.disallowIdentifier.push(...disallowIdentifier);
    dest.disallowImport.push(...disallowImport);
    dest.noRestrictedSyntax.push(...noRestrictedSyntax);
  }

  /**
   * Loads options.
   *
   * @param source - Source file or options object.
   * @returns Options.
   */
  function load(source) {
    const result = (() => {
      switch (typeof source) {
        case "object":
          return source;

        case "string":
          return fs.existsSync(source) ? require(source) : {};

        default:
          throw new Error("Invalid source");
      }
    })();

    return {
      consistentImport: [],
      disallowByRegexp: [],
      disallowIdentifier: [],
      disallowImport: [],
      noRestrictedSyntax: [],
      ...result
    };
  }

  /**
   * Loads options.
   *
   * @param source - Source file or options object.
   * @returns Options.
   */
  function loadDeep(source) {
    const result = {
      consistentImport: [],
      disallowByRegexp: [],
      disallowIdentifier: [],
      disallowImport: [],
      es: false,
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

    const options = load(source);

    if (options.extends)
      for (const extend of options.extends) assign(result, loadDeep(extend));

    assign(result, options);

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
        sourcePattern: result.es ? "lodash-es" : "lodash",
        type: "wildcard"
      },
      {
        altLocalNames: ["nodePath"],
        sourcePattern: "path",
        type: "default"
      }
    );

    result.disallowByRegexp.push(
      // eslint-disable-next-line no-warning-comments -- https://github.com/gajus/eslint-plugin-jsdoc/issues/864
      // fixme
      {
        contexts: ["comment"],
        patterns: [/(?<!\\)[<>]/u.source],
        subOptionsId: "comment.escape"
      }
    );

    result.disallowImport.push(
      { disallow: ["../src/**"] },
      { disallow: ["@/**"], filesToSkip: ["./tests/**"] },
      {
        disallow: [
          result.es ? "lodash" : "lodash-es",
          result.es ? "@skylib/*/dist/**" : "@skylib/*/es/**"
        ]
      }
    );

    result.noRestrictedSyntax.push(
      {
        message: "Underscore export is disallowed",
        selector:
          "ExportNamedDeclaration > FunctionDeclaration > Identifier.id[name=/^_/u]"
      },
      {
        message: "Underscore export is disallowed",
        selector:
          "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
      },
      {
        message: 'Use "Extends" type from "ts-toolbelt" package instead',
        selector: "TSConditionalType"
      }
    );

    return result;
  }
})();
