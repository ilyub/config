const fs = require("fs");

const { Validator } = require("jsonschema");

const path = require("path");

const validator = new Validator();

const errors = [
  ...requireItems(),
  ...validateJsonFile("package", "pkg"),
  ...validateJsonFile("tsconfig", "tsc"),
  ...validateJsonFile("tsconfig-min", "tsc"),
  ...validateJsonFile("tsconfig-compile", "tsc-compile"),
  ...validateJsonFile("tsconfig-build", "tsc-build"),
  ...validateJsonFile("tsconfig-build-es", "tsc-build-es"),
  ...validateJsonFile("tsconfig-typedoc", "tsc-typedoc")
];

// eslint-disable-next-line no-console -- Ok
for (const error of errors) console.error(error);

if (errors.length > 0) throw new Error("Invalid config");

/**
 * Requires files.
 *
 * @returns Errors.
 */
function requireItems() {
  const ignoreExtensions = new Set([
    ".bat",
    ".cache",
    ".info",
    ".ts",
    ".txt",
    ".vsix"
  ]);

  const ignoreFiles = new Set([
    ".postcssrc.js",
    "babel.config.js",
    "composer.json",
    "quasar.conf.js",
    "quasar.extensions.json",
    "quasar.testing.json",
    "tsconfig-compile.json"
  ]);

  const requiredFiles = [
    ".browserslistrc",
    ".editorconfig",
    ".gitignore",
    ".npmpackagejsonlintrc.json",
    "README.md",
    "commitlint-all.config.js",
    "commitlint-all.scopes.js",
    "commitlint.config.js",
    "commitlint.scopes.js",
    "package.json",
    "package-lock.json"
  ];

  const requiredFilesByScript = [
    {
      files: [
        ".eslintignore",
        ".eslintrc.js",
        ".eslintrc.fast.js",
        ".eslintrc.overrides.js",
        ".eslintrc.rule-overrides.js",
        ".eslintrc.temp.js",
        ".prettierrc.js",
        "tsconfig.json",
        "tsconfig-min.json"
      ],
      scripts: [
        "lint",
        "lint-fast",
        "lint-no-fix",
        "lint-no-fix-profile",
        "tsc"
      ]
    },
    { files: [".php-cs-fixer.php"], scripts: ["php-cs-fixer"] },
    {
      files: [".stylelintrc.js", ".stylelintrc-html.js"],
      scripts: [
        "stylelint",
        "stylelint-html",
        "stylelint-html-no-fix",
        "stylelint-no-fix"
      ]
    },
    { files: ["tsconfig-build.json"], scripts: ["build"] },
    { files: ["tsconfig-build-es.json"], scripts: ["build-es"] },
    {
      files: ["jest.config.js", "jest.config.fast.js"],
      scripts: ["test", "test-fast"]
    },
    { files: ["sonar-project.properties"], scripts: ["sonar"] },
    { files: ["tsconfig-typedoc.json", "typedoc.json"], scripts: ["build-doc"] }
  ];

  const json = JSON.parse(fs.readFileSync("./package.json"));

  const files1 = fs
    .readdirSync("./")
    .filter(file => fs.lstatSync(`./${file}`).isFile());

  const files2 = [];

  files2.push(...requiredFiles);

  for (const { files, scripts } of requiredFilesByScript)
    if (scripts.some(script => json.scripts[script])) files2.push(...files);

  for (const file of files1)
    if (ignoreFiles.has(file) || ignoreExtensions.has(path.extname(file)))
      files2.push(file);

  files1.sort((x, y) => x > y);
  files2.sort((x, y) => x > y);

  const result = [];

  for (const { files, scripts } of requiredFilesByScript)
    if (files.some(file => files1.includes(file)))
      for (const script of scripts)
        if (json.scripts[script]) {
          // Valid
        } else result.push(`Missing "${script}" script`);

  for (const file of files1)
    if (files2.includes(file)) {
      // Valid
    } else result.push(`Unknown "${file}" file`);

  for (const file of files2)
    if (files1.includes(file)) {
      // Valid
    } else result.push(`Missing "${file}" file`);

  return result;
}

/**
 * Validates JSON file.
 *
 * @param name - Name.
 * @param schemaName - Schema name.
 * @returns Errors.
 */
function validateJsonFile(name, schemaName) {
  if (fs.existsSync(`./${name}.json`)) {
    const json = JSON.parse(fs.readFileSync(`./${name}.json`));

    const schema = require(`./schemas/${schemaName}.json`);

    return validator
      .validate(json, schema)
      .errors.map(error => `Error at ${name}.json: ${error.stack}`);
  }

  return [];
}
