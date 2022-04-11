const fs = require("fs");

module.exports = {
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
  quasar: false,
  quasarGlobalComponents: [],
  utility: false,
  ...loadDeep(fs.realpathSync(".eslintrc.options.js"))
};

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
    ...rest
  } = source;

  Object.assign(dest, rest);
  dest.consistentImport.push(...consistentImport);
  dest.disallowByRegexp.push(...disallowByRegexp);
  dest.disallowIdentifier.push(...disallowIdentifier);
  dest.disallowImport.push(...disallowImport);
}

/**
 * Create defaults object.
 *
 * @returns Defaults objec.
 */
function createDefaults() {
  return {
    consistentImport: [],
    disallowByRegexp: [],
    disallowIdentifier: [],
    disallowImport: []
  };
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

  return { ...createDefaults(), ...result };
}

/**
 * Loads options.
 *
 * @param source - Source file or options object.
 * @returns Options.
 */
function loadDeep(source) {
  const result = createDefaults();

  const options = load(source);

  if (options.extends)
    for (const extend of options.extends) assign(result, loadDeep(extend));

  assign(result, options);

  return result;
}
