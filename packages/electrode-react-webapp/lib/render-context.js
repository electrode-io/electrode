"use strict";

const RenderOutput = require("./render-output");

class RenderContext {
  constructor(options, asyncTemplate) {
    this.user = false;
    this.options = options;
    this.output = new RenderOutput(this);
    this.asyncTemplate = asyncTemplate;
    this._handlersMap = asyncTemplate.handlersMap;
    this.transform = x => x;
  }

  // return a token handler by name
  getTokenHandler(name) {
    return this._handlersMap[name];
  }

  // return the tokens object of a handler by name
  getTokens(name) {
    return this._handlersMap[name].tokens;
  }

  // set a send callback for receiving the render output
  // Note: cannot be used with setOutputTransform
  setOutputSend(send) {
    this.send = send;
  }

  // set a callback to take the output result and transform it
  // Note: cannot be used with setOutputSend
  setOutputTransform(transform) {
    this.transform = result => transform(result, this);
  }

  // before render starts, call this with any predetermined result
  // to use as the output rather than doing actual render for it
  // Basically no rendering will occur.
  skipRender(result) {
    this.skip = true;
    this.result = result;
  }

  // helper to take the result of a token handler and process the returned result
  // according to if it's async or not, and then invoke the callback
  // - If it's a Promise (async), then wait for it before invoking callback
  // - else add it to output if it's a string, and then invoke callback
  // Note: If it's async, then the result from the Promise is not checked because
  //       we don't know how token handler wants to deal with it.
  handleTokenResult(id, res, cb) {
    // it's a promise, wait for it before invoking callback
    if (res && res.then) {
      return res.then(cb).catch(err => {
        console.log(`token process for ${id} failed`, err); // eslint-disable-line
        cb();
      });
    } else {
      // it's a string, add to output
      if (typeof res === "string") {
        this.output.add(res);
      }

      // ignore other return value types
      return cb();
    }
  }
}

module.exports = RenderContext;
