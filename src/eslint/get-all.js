module.exports = function (source) {
  const prefix = (() => {
    if (source.endsWith("/eslint-plugin")) return source.slice(0, -14);

    if (source.startsWith("eslint-plugin-")) return source.slice(14);

    throw new Error(`Unexpected source name: ${source}`);
  })();

  return Object.fromEntries(
    Object.keys(require(source).rules).map(rule => [
      `${prefix}/${rule}`,
      "warn"
    ])
  );
};
