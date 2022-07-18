const fs = require("node:fs");

const pkg = require(fs.realpathSync("./package.json"));

module.exports = {
  getAllRules: (source, filter = () => true) => {
    const prefix = (() => {
      if (source.endsWith("/eslint-plugin")) return source.slice(0, -14);

      if (source.startsWith("eslint-plugin-")) return source.slice(14);

      throw new Error(`Unexpected source name: ${source}`);
    })();

    const { rules } = require(source);

    return Object.fromEntries(
      Object.keys(rules)
        .map(rule => `${prefix}/${rule}`)
        .filter(filter)
        .map(rule => [rule, "warn"])
    );
  },
  rules: {
    "@skylib/consistent-import/project": {
      sources: [
        {
          _id: "test-utils",
          source: `${pkg.name}/src/test-utils`,
          type: "wildcard"
        },
        {
          _id: "catch-all",
          source: `${pkg.name}/**`,
          type: "default"
        }
      ]
    },
    "@typescript-eslint/no-shadow": {
      allow: ["Plugin", "ReadonlyMap", "ReadonlySet", "event", "name"],
      builtinGlobals: true,
      hoist: "all",
      ignoreFunctionTypeParameterNameValueShadow: false,
      ignoreTypeValueShadow: true
    }
  }
};
