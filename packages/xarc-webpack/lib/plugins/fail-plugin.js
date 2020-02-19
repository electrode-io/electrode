"use strict";

module.exports = class FailPlugin {
  constructor() {
    this.isWatch = true;
  }

  fail() {
    if (!this.isWatch) {
      process.on("beforeExit", () => process.exit(1));
    }
  }

  apply(compiler) {
    compiler.hooks.run.tapAsync("FailPlugin", (runCompiler, callback) => {
      this.isWatch = false;
      callback.call(runCompiler);
    });

    compiler.hooks.failed.tap("FailPlugin", () => {
      this.fail();
    });

    compiler.hooks.done.tap("FailPlugin", stats => {
      const errors = stats.compilation.errors;
      if (errors && errors.length) {
        this.fail();
      }
    });
  }
};
