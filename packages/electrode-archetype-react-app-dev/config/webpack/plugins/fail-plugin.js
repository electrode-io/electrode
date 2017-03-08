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
    compiler.plugin("run", (runCompiler, callback) => {
      this.isWatch = false;
      callback.call(runCompiler);
    });

    compiler.plugin("fail", () => {
      this.fail();
    });

    compiler.plugin("done", (stats) => {
      const errors = stats.compilation.errors;
      if (errors && errors.length) {
        this.fail();
      }
    });
  }
};
