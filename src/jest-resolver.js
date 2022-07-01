const fs = require("node:fs");

const path = require("node:path");

module.exports = function (request, options) {
  const result = options.defaultResolver(request, options);

  if (options.basedir) {
    if (options.basedir.includes("__mocks__")) return result;

    const mock = path.join(
      path.dirname(result),
      "__mocks__",
      path.basename(result)
    );

    if (fs.existsSync(mock)) return mock;
  }

  return result;
};
