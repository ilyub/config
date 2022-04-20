module.exports = configFiles => {
  const fs = require("fs");

  const path = require("path");

  const config = (() => {
    const result = { dirs: [], scopes: [] };

    for (const configFile of configFiles)
      if (fs.existsSync(configFile)) {
        const part = {
          dirs: [],
          scopes: [],
          ...require(fs.realpathSync(configFile))
        };

        result.scopes.push(...part.scopes);
        result.dirs.push(...part.dirs);
      }

    return result;
  })();

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
    "npm",
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
    ...config.scopes,
    ...scopesFromDirs(config.dirs)
  ]);

  return {
    extends: ["@commitlint/config-conventional"],
    ignores: [commit => ignore(commit)],
    rules: {
      "scope-enum": [2, "always", [...scopes]],
      "subject-case": [2, "always", ["sentence-case"]],
      "type-enum": [2, "always", types]
    }
  };

  function ignore(commit) {
    commit = commit.trimEnd();

    if (/^(?:initial commit|next|refactor|style)$/u.test(commit)) return true;

    if (/^(?:build|chore)\(deps-update\)$/u.test(commit)) return true;

    if (/^(?:chore|docs|test)\((?:refactor|style)\)$/u.test(commit))
      return true;

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
      const re =
        /^(?:chore|docs|test)\((?:refactor|style),([^),]+),([^),]+)\)$/u;

      const matches = commit.match(re);

      if (matches && scopes.includes(matches[1]) && scopes.includes(matches[2]))
        return true;
    }

    return false;
  }

  function scopesFromDirs(dirs) {
    const result = [];

    for (const dir of dirs) if (fs.existsSync(dir)) recurs(dir);

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

  function unique(arr) {
    return [...new Set(arr).values()];
  }
};
