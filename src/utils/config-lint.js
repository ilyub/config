const fs = require("fs");

const { Validator } = require("jsonschema");

const validator = new Validator();

const errors = [
  ...validate("package", "pkg"),
  ...validate("tsconfig", "tsc"),
  ...validate("tsconfig-min", "tsc"),
  ...validate("tsconfig-build", "tsc-build"),
  ...validate("tsconfig-build-es", "tsc-build-es"),
  ...validate("tsconfig-typedoc", "tsc-typedoc")
];

// eslint-disable-next-line no-console -- Ok
for (const error of errors) console.error(error);

if (errors.length > 0) throw new Error("Invalid config");

/**
 * Validates JSON file.
 *
 * @param name - Name.
 * @param schemaName - Schema name.
 * @returns Errors.
 */
function validate(name, schemaName) {
  if (fs.existsSync(`./${name}.json`)) {
    const json = JSON.parse(fs.readFileSync(`./${name}.json`));

    const schema = require(`./schemas/${schemaName}.json`);

    return validator
      .validate(json, schema)
      .errors.map(error => `Invalid config at ${error.property} (${name})`);
  }

  return [];
}
