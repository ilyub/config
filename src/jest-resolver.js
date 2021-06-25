const fs = require("fs");

const path = require("path");

module.exports = function (request, options) {
  const resolved = options.defaultResolver(request, options);

  if (options.basedir && !options.basedir.includes("__mocks__")) {
    const mock = path.join(
      path.dirname(resolved),
      "__mocks__",
      path.basename(resolved)
    );

    if (fs.existsSync(mock)) return mock;
  }

  return resolved;
};
