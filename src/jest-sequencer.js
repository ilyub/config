const Sequencer = require("@jest/test-sequencer").default;

const fs = require("fs");

const path = require("path");

const slow = fs.existsSync("./jest.slow.js")
  ? require(fs.realpathSync("./jest.slow.js"))
  : [];

module.exports = class extends Sequencer {
  /**
   * Sorts tests according to their execution order.
   *
   * @param tests - Tests.
   * @returns Comparison result.
   */
  sort(tests) {
    return [...tests].sort((test1, test2) => {
      const slow1 = slow.includes(path.basename(test1.path));

      const slow2 = slow.includes(path.basename(test2.path));

      if (slow2 && !slow1) return 1;

      if (slow1 && !slow2) return -1;

      return test1.path.localeCompare(test2.path);
    });
  }
};
