module.exports = (() => {
  const fs = require("fs");

  const result = {
    disallowIdentifier: [],
    extraChoreLocations: [],
    extraDefaultExportLocations: [],
    extraTestsLocations: [],
    extraUnassignedImportLocations: [],
    extraUtilsLocations: [],
    quasarGlobalComponents: [],
    readonlyTypes: [],
    requireJsdoc: [],
    utility: false
  };

  if (fs.existsSync(".eslintrc.options.js"))
    load(fs.realpathSync(".eslintrc.options.js"));

  addDefaults();

  return result;

  function addDefaults() {
    result.readonlyTypes.push(
      "^Promise$",
      "^ReadonlyMap$",
      "^ReadonlySet$",
      "^Writable"
    );

    result.requireJsdoc.push(
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > FunctionDeclaration",
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration>  VariableDeclarator.declarations > Identifier.id > TSTypeAnnotation.typeAnnotation > TSFunctionType.typeAnnotation",
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator.declarations[id.typeAnnotation=undefined] > ObjectExpression.init > Property.properties > :matches(ArrowFunctionExpression, FunctionExpression)",
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator.declarations[id.typeAnnotation=undefined] > TSAsExpression.init > ObjectExpression.expression > Property.properties > :matches(ArrowFunctionExpression, FunctionExpression)",
      "PropertyDefinition > :matches(ArrowFunctionExpression, FunctionExpression).value"
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

    for (const [index, option] of Object.entries(options))
      if (Array.isArray(result[index])) result[index].push(...option);
      else result[index] = option;
  }
})();
