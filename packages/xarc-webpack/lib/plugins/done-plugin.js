"use strict";

class DonePlugin {
  constructor(func) {
    this._func = func;
  }

  apply(compiler) {
    compiler.hooks.done.tap("DonePlugin", () => {
      this._func();
    });
  }
}

module.exports = DonePlugin;
