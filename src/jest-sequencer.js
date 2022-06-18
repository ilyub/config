const { default: Sequencer } = require("@jest/test-sequencer");

const fs = require("fs");

const path = require("path");

const slow = (() => {
  if (fs.existsSync("./jest.slow.js"))
    return require(fs.realpathSync("./jest.slow.js"));

  return [];
})();

module.exports = class extends Sequencer {
  /**
   * Sorts tests according to their execution order.
   *
   * @param tests - Tests.
   * @returns Comparison result.
   */
  sort = tests =>
    [...tests].sort((test1, test2) => {
      const slow1 = slow.includes(path.basename(test1.path));

      const slow2 = slow.includes(path.basename(test2.path));

      if (slow2 && !slow1) return 1;

      if (slow1 && !slow2) return -1;

      return test1.path.localeCompare(test2.path);
    });
};
