"use strict";

const RenderOutput = require("./render-output");
const Munchy = require("munchy");
const utils = require("./utils");

class RenderContext {
  constructor(options, asyncTemplate) {
    this.user = false;
    this.options = options;
    this.output = new RenderOutput(this);
    this.asyncTemplate = asyncTemplate;
    this._handlersMap = asyncTemplate.handlersMap;
    this.handleError = err => !this.stop && this.voidStop(err);
    this.transform = x => x;
    this._stop = 0;
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

  setMunchyOutput(munchy) {
    this.munchy = munchy || new Munchy({ handleStreamError: utils.munchyHandleStreamError });
  }

  // set a callback to take the output result and transform it
  // Note: cannot be used with setOutputSend
  setOutputTransform(transform) {
    this.transform = result => transform(result, this);
  }

  get stop() {
    return this._stop;
  }

  get status() {
    return this._status;
  }

  set status(s) {
    this._status = s;
  }

  //
  // set this any time to fully stop and close rendering
  // stop modes:
  // 1 - only process string tokens
  // 2 - fully stop immediately, no more token processing
  // 3 - completely void any render output and stop immediately,
  //     replace output with result.  This only works if output
  //     is buffered and not streaming out immediately.
  //
  set stop(f) {
    this._stop = f;
  }

  fullStop() {
    this._stop = RenderContext.FULL_STOP;
  }

  get isFullStop() {
    return this._stop === RenderContext.FULL_STOP;
  }

  voidStop(result) {
    this._stop = RenderContext.VOID_STOP;
    this.voidResult = result;
  }

  get isVoidStop() {
    return this._stop === RenderContext.VOID_STOP;
  }

  softStop() {
    this._stop = RenderContext.SOFT_STOP;
  }

  get isSoftStop() {
    return this._stop === RenderContext.SOFT_STOP;
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
      return res.then(r => cb(null, r)).catch(cb);
    } else {
      // if it's a string, buffer, or stream, then add to output
      if (typeof res === "string" || Buffer.isBuffer(res) || utils.isReadableStream(res)) {
        this.output.add(res);
      }
      // ignore other return value types

      return cb();
    }
  }
}

RenderContext.VOID_STOP = 3;
RenderContext.FULL_STOP = 2;
RenderContext.SOFT_STOP = 1;

module.exports = RenderContext;
