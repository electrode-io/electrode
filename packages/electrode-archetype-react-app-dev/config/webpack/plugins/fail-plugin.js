"use strict";

module.exports = function () {
  let isWatch = true;

  this.plugin("run", (compiler, callback) => {
    isWatch = false;
    callback.call(compiler);
  });

  this.plugin("done", (stats) => {
    if (stats.compilation.errors && stats.compilation.errors.length && !isWatch) {
      process.on("beforeExit", function () {
        process.exit(1);
      });
    }
  });
};
