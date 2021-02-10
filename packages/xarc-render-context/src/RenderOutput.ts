/**
 * @package
 * @module index
 */

/* eslint-disable comma-dangle, arrow-parens, filenames/match-regex */

import { SpotOutput } from "./SpotOutput";
import { MainOutput } from "./MainOutput";
import { makeDefer, Defer } from "xaa";

export class RenderOutput {
  _output: any;
  _flushQ: any;
  _context: any;
  _result: any;
  _end: any;
  _defer: Defer<any>;

  constructor(context = null) {
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
    if (this._output && this._output.length > 0) {
      this._flushQ.push(this._output);
      if (!this._end) {
        this._output = new MainOutput();
      } else {
        this._output = undefined;
      }
    }

    this._checkFlushQ();
  }

  // close the output and returns a promise that waits for all pending
  // spots to close and resolves with the final result
  close() {
    this._end = true;

    if (this._context.munchy) {
      this.flush();
      // streaming
      return this._context.transform(this._context.munchy, this);
    } else {
      this._defer = makeDefer();
      this.flush();
      return this._defer.promise;
    }
  }

  _finish() {
    try {
      if (this._context.munchy) {
        // terminates munchy stream
        this._result = this._context.munchy;
        this._context.munchy.munch(null);
      }

      if (this._defer) {
        this._defer.resolve(this._context.transform(this._result, this));
      }
    } catch (error) {
      if (this._defer) {
        this._defer.reject(error);
      } else {
        throw error;
      }
    }
  }

  _checkFlushQ() {
    if (this._flushQ.length < 1) {
      if (this._end) {
        this._finish();
      }
      return;
    }

    const output = this._flushQ[0];

    if (!output._hasPending()) {
      this._flushQ.shift();
      // handle streaming
      // if this._context.munchy stream exist, then pipe output to it.

      if (this._context.munchy) {
        // send output to munchy stream
        output.sendToMunchy(this._context.munchy, () => this._checkFlushQ());
      } else {
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
}
