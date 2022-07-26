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
  }
};
