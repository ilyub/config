const fs = require("fs");

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

  const scopes = (() => {
    const result = [
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
      "typescript"
    ];

    if (fs.existsSync(scopesFile))
      result.push(...require(fs.realpathSync(scopesFile)));

    return result;
  })();

  const ignoreList = (() => {
    const result = [
      "build(deps-update)",
      "chore(deps-update)",
      "chore(refactor)",
      "chore(style)",
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
