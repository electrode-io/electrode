"use strict";

module.exports = function() {
  var isWatch = true;

  this.plugin("run", function(compiler, callback) {
    isWatch = false;
    callback.call(compiler);
  });

  this.plugin("done", function(stats) {
    if (stats.compilation.errors && stats.compilation.errors.length && !isWatch) {
      process.on('beforeExit', function() {
        process.exit(1);
      });
    }
  });
};
