const fs = require("fs");

const path = require("path");

module.exports = function (scopesFile) {
  const types = [
    "build",
    "chore",
    "docs",
    "feat",
    "fix",
    "perf",
    "refactor",
    "revert",
    "style",
    "test"
  ];

  const scopes = [
    "auto-eslint",
    "auto-json",
    "auto-linebreaks",
    "auto-php-cs",
    "auto-stylelint",
    "babel",
    "browserlist",
    "commitlint",
    "composer",
    "deps-major-update",
    "deps-update",
    "env",
    "eslint",
    "fix",
    "git",
    "jest",
    "package",
    "perf",
    "php-cs",
    "readme",
    "recommended-eslint",
    "recommended-stylelint",
    "recommended-sonar",
    "refactor",
    "revert",
    "sonar",
    "style",
    "stylelint",
    "typedoc",
    "typescript",
    ...scopesFromDir("./src"),
    ...scopesFromFilename(scopesFile)
  ];

  const ignoreList = (() => {
    const result = [
      "build(deps-update)",
      "chore(deps-update)",
      "chore(refactor)",
      "chore(style)",
      "docs(refactor)",
      "docs(style)",
      "initial commit",
      "next",
      "refactor",
      "style",
      "test(refactor)",
      "test(style)"
    ];

    for (const scope of scopes)
      result.push(
        `chore(refactor,${scope})`,
        `chore(style,${scope})`,
        `docs(refactor,${scope})`,
        `docs(style,${scope})`,
        `refactor(${scope})`,
        `style(${scope})`,
        `test(refactor,${scope})`,
        `test(style,${scope})`
      );

    for (const scope1 of scopes)
      for (const scope2 of scopes)
        if (scope1 !== scope2)
          result.push(
            `chore(refactor,${scope1},${scope2})`,
            `chore(style,${scope1},${scope2})`,
            `docs(refactor,${scope1},${scope2})`,
            `docs(style,${scope1},${scope2})`,
            `refactor(${scope1},${scope2})`,
            `style(${scope1},${scope2})`,
            `test(refactor,${scope1},${scope2})`,
            `test(style,${scope1},${scope2})`
          );

    result.push(...result.map(message => `${message}!`));

    return result;
  })();

  return {
    extends: ["@commitlint/config-conventional"],
    ignores: [commit => ignoreList.includes(commit.trimEnd())],
    rules: {
      "scope-enum": [2, "always", scopes],
      "subject-case": [2, "always", ["sentence-case"]],
      "type-enum": [2, "always", types]
    }
  };
};

/**
 * Generates scopes from scopes file.
 *
 * @param scopesFile - Scopes file.
 * @returns Scopes.
 */
function scopesFromFilename(scopesFile) {
  return fs.existsSync(scopesFile) ? require(fs.realpathSync(scopesFile)) : [];
}

/**
 * Generates scopes from directory.
 *
 * @param dir - Directory.
 * @returns Scopes.
 */
function scopesFromDir(dir) {
  const result = [];

  recurs(dir);

  return result;

  function recurs(subdir) {
    for (const base of fs.readdirSync(subdir)) {
      const name = path.parse(base).name;

      const filename = path.join(subdir, base);

      result.push(name);

      if (fs.lstatSync(filename).isDirectory()) recurs(filename);
    }
  }
}
