module.exports = environment => {
  const jestEnvironment = require(`jest-environment-${environment}`);

  const BaseEnvironment = jestEnvironment.TestEnvironment ?? jestEnvironment;

  return class Environment extends BaseEnvironment {
    /**
     * Creates class instance.
     *
     * @param config - Configuration.
     * @param context - Context.
     */
    constructor(config, context) {
      super(config, context);
      this.testPath = context.testPath;
    }

    /**
     * Setup.
     */
    async setup() {
      await super.setup();
      this.global.JEST_ENV = environment;
      this.global.JEST_PATH = this.testPath;
      this.global.clearImmediate =
        this.global.clearImmediate ?? _clearImmediate;
      this.global.fetch = this.global.fetch ?? _fetch;
      this.global.setImmediate = this.global.setImmediate ?? _setImmediate;
    }
  };
};

/**
 * Implements "clearTimeout" function.
 *
 * @param id - Id.
 */
function _clearImmediate(id) {
  global.clearTimeout(id);
}

/**
 * Implements "fetch" function.
 */
function _fetch() {
  throw new Error("Not implemented");
}

/**
 * Implements "setImmediate" function.
 *
 * @param callback - Callback.
 * @returns Id.
 */
function _setImmediate(callback) {
  return global.setTimeout(callback, 0);
}
