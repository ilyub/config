const fs = require("fs");

const path = require("path");

module.exports = function (config) {
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

  const scopes = unique([
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
    ...scopesFromConfig(config),
    ...scopesFromDir("./src")
  ]);

  return {
    extends: ["@commitlint/config-conventional"],
    ignores: [commit => ignore(commit, scopes)],
    rules: {
      "scope-enum": [2, "always", [...scopes]],
      "subject-case": [2, "always", ["sentence-case"]],
      "type-enum": [2, "always", types]
    }
  };
};

/**
 * Ignores commit.
 *
 * @param commit - Commit.
 * @param scopes - Scopes.
 * @returns _True_ to ignore, _false_ otherwise.
 */
function ignore(commit, scopes) {
  commit = commit.trimEnd();

  if (/^(?:initial commit|next|refactor|style)$/u.test(commit)) return true;

  if (/^(?:build|chore)\(deps-update\)$/u.test(commit)) return true;

  if (/^(?:chore|docs|test)\((?:refactor|style)\)$/u.test(commit)) return true;

  {
    const re = /^(?:refactor|style)\(([^),]+)\)$/u;

    const matches = commit.match(re);

    if (matches && scopes.includes(matches[1])) return true;
  }

  {
    const re = /^(?:chore|docs|test)\((?:refactor|style),([^),]+)\)$/u;

    const matches = commit.match(re);

    if (matches && scopes.includes(matches[1])) return true;
  }

  {
    const re = /^(?:refactor|style)\(([^),]+),([^),]+)\)$/u;

    const matches = commit.match(re);

    if (matches && scopes.includes(matches[1]) && scopes.includes(matches[2]))
      return true;
  }

  {
    const re = /^(?:chore|docs|test)\((?:refactor|style),([^),]+),([^),]+)\)$/u;

    const matches = commit.match(re);

    if (matches && scopes.includes(matches[1]) && scopes.includes(matches[2]))
      return true;
  }

  return false;
}

/**
 * Generates scopes from config.
 *
 * @param config - Config.
 * @returns Scopes.
 */
function scopesFromConfig(config) {
  return fs.existsSync(config) ? require(fs.realpathSync(config)) : [];
}

/**
 * Generates scopes from directory.
 *
 * @param dir - Directory.
 * @returns Scopes.
 */
function scopesFromDir(dir) {
  const result = [];

  if (fs.existsSync(dir)) recurs(dir);

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

/**
 * Creates unique array.
 *
 * @param arr - Array.
 * @returns Unique array.
 */
function unique(arr) {
  return [...new Set(arr).values()];
}
