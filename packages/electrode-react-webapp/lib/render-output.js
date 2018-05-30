"use strict";

const assert = require("assert");
const Promise = require("bluebird");

class Output {
  constructor() {
    this.length = 0;
    this._items = {};
  }

  add(data) {
    const x = this.length;
    this._items[x] = data;
    this.length++;
    return x;
  }

  stringify() {
    let i;
    let out = "";
    for (i = 0; i < this.length; ++i) {
      const x = this._items[i];
      if (typeof x === "string") {
        out += x;
      } else {
        out += x.stringify();
      }
    }
    return out;
  }
}

class SpotOutput extends Output {
  constructor() {
    super();
    this._open = true;
    this._pos = -1;
    this._closeCb = null;
  }

  add(data) {
    assert(this._open, "SpotOutput closed");
    assert(typeof data === "string", "Must add only string to SpotOutput");
    return super.add(data);
  }

  close() {
    assert(this._open, "closing already closed SpotOutput");
    this._open = false;
    this._closeCb();
  }

  _onClose(cb) {
    this._closeCb = cb;
  }

  _spotPos() {
    return this._pos;
  }

  _setPos(x) {
    this._pos = x;
  }
}

class MainOutput extends Output {
  constructor() {
    super();
    this._pending = 0;
  }

  _addSpot(data) {
    const x = this.length;
    this.add(data);
    this._pending++;
    return x;
  }

  _closeSpot(x) {
    assert(this._items[x._spotPos()] === x, "closing unknown pending");
    this._pending--;
  }

  _hasPending() {
    return this._pending > 0;
  }
}

class RenderOutput {
  constructor(context) {
    this._output = new MainOutput();
    this._flushQ = [];
    this._context = context || { transform: x => x };
    this._result = ""; // will hold final result if context doesn't have send
  }

  // add data to the end of the output
  add(data) {
    this._output.add(data);
  }

  // reserve current end of output as an async fixed spot so data can be appended
  // at that point when they become available async, even if more data has been
  // added to the end of the output after this.
  reserve() {
    let output = this._output;
    const spot = new SpotOutput();
    spot._setPos(output._addSpot(spot));
    spot._onClose(() => {
      output._closeSpot(spot);
      output = undefined;
      this._checkFlushQ();
    });
    return spot;
  }

  // flush data so far
  flush() {
    if (this._output.length > 0) {
      this._flushQ.push(this._output);
      this._output = new MainOutput();
    }

    this._checkFlushQ();
  }

  // close the output and returns a promise that waits for all pending
  // spots to close and resolves with the final result
  close() {
    const promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this.flush();
    return promise;
  }

  _finish() {
    if (this._resolve) {
      this._resolve(this._context.transform(this._result, this));
    }
    this._resolve = this._reject = undefined;
  }

  _checkFlushQ() {
    if (this._flushQ.length < 1) {
      this._finish();
      return;
    }

    const output = this._flushQ[0];
    if (!output._hasPending()) {
      this._flushQ.shift();
      const x = output.stringify();
      if (this._context.send) {
        this._context.send(x);
      } else {
        this._result += x;
      }
      this._checkFlushQ();
    }
  }
}

module.exports = RenderOutput;
