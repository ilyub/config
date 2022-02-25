module.exports = function (package) {
  const prefix = (() => {
    if (package.endsWith("/eslint-plugin")) return package.slice(0, -14);

    if (package.startsWith("eslint-plugin-")) return package.slice(14);

    throw new Error(`Unexpected package name: ${package}`);
  })();

  return Object.fromEntries(
    Object.keys(require(package).rules).map(rule => [
      `${prefix}/${rule}`,
      "warn"
    ])
  );
};
