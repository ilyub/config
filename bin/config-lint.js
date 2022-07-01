const {
  bindings,
  optionalFiles,
  optionalFilesByExtensions,
  optionalScripts,
  requiredFiles,
  requiredScripts,
  schemas
  // eslint-disable-next-line import/extensions, import/no-internal-modules -- Ok
} = require("./schemas/project.json");

const { Validator } = require("jsonschema");

const fs = require("node:fs");

const path = require("node:path");

const validator = new Validator();

const actualFiles = fs
  .readdirSync("./")
  .filter(file => fs.lstatSync(`./${file}`).isFile());

const actualScripts = Object.keys(
  JSON.parse(fs.readFileSync("./package.json")).scripts
);

for (const { files, scripts } of bindings)
  if (
    files.some(file => actualFiles.includes(file)) ||
    scripts.some(script => actualScripts.includes(script))
  ) {
    requiredFiles.push(...files);
    requiredScripts.push(...scripts);
  }

const errors = [];

for (const file of actualFiles)
  if (
    requiredFiles.includes(file) ||
    optionalFiles.includes(file) ||
    optionalFilesByExtensions.includes(path.extname(file))
  ) {
    // Valid
  } else errors.push(`Unknown "${file}" file`);

for (const file of requiredFiles)
  if (actualFiles.includes(file)) {
    // Valid
  } else errors.push(`Missing "${file}" file`);

for (const script of actualScripts)
  if (requiredScripts.includes(script) || optionalScripts.includes(script)) {
    // Valid
  } else errors.push(`Unknown "${script}" script`);

for (const script of requiredScripts)
  if (actualScripts.includes(script)) {
    // Valid
  } else errors.push(`Missing "${script}" script`);

for (const [name, schemaName] of Object.entries(schemas))
  if (fs.existsSync(`./${name}.json`)) {
    const json = JSON.parse(fs.readFileSync(`./${name}.json`));

    const schema = require(`./schemas/${schemaName}.json`);

    errors.push(
      ...validator
        .validate(json, schema)
        .errors.map(error => `Error at ${name}.json: ${error.stack}`)
    );
  }

// eslint-disable-next-line no-console -- Ok
for (const error of errors) console.error(error);

if (errors.length > 0) throw new Error("Invalid config");
