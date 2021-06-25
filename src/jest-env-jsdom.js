const Environment = require("jest-environment-jsdom");

module.exports = class extends Environment {
  /**
   * Creates class instance.
   *
   * @param config - Configuration.
   * @param context - Context.
   */
  constructor(config, context) {
    super(config);
    this.testPath = context.testPath;
  }

  /**
   * Setup.
   */
  async setup() {
    await super.setup();
    this.global.TEST_ENV = "jsdom";
    this.global.TEST_PATH = this.testPath;
    this.global.clearImmediate =
      this.global.clearImmediate ?? (id => global.clearTimeout(id));
    this.global.fetch = () => {
      throw new Error("Not implemented");
    };
    this.global.setImmediate =
      this.global.setImmediate ?? (callback => global.setTimeout(callback, 0));
  }
};
