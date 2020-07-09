/**
 * @packageDocumentation
 * @module index
 */
/* eslint-disable comma-dangle, arrow-parens, filenames/match-regex, no-magic-numbers */

import { RenderOutput } from "./RenderOutput";
import * as Munchy from "munchy";
import { munchyHandleStreamError, isReadableStream } from "./utils";

/**
 * RenderContext
 *
 * context that store and control the rendering of index.htm from a template
 *
 */
export class RenderContext {
  /**
   * store for user - you can use this to hold any data you need during the rendering
   * process.
   *
   */
  user: any;
  options: any;
  output: any;
  asyncTemplate: any;
  _handlersMap: any;
  handleError: any;
  transform: any;
  _stop: any;
  send: any;
  munchy: any;
  _status: any;
  _intercepted: any;
  voidResult: any;
  result: any;

  static VOID_STOP = 3;
  static FULL_STOP = 2;
  static SOFT_STOP = 1;

  /**
   *
   * @param options
   * @param asyncTemplate
   */
  constructor(options: any, asyncTemplate) {
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

  setMunchyOutput(munchy = null) {
    this.munchy = munchy || new Munchy({ handleStreamError: munchyHandleStreamError });
  }

  // set a callback to take the output result and transform it
  // Note: cannot be used with setOutputSend
  setOutputTransform(transform) {
    this.transform = result => transform(result, this);
  }

  get stop() {
    return this._stop;
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

  get status() {
    return this._status;
  }

  set status(s) {
    this._status = s;
  }

  /*
   * Allow user to intercept handling of the rendering flow and take over the response with handler
   *
   * - If no handler provided, then the error is returned.
   */
  intercept({ responseHandler }) {
    this._intercepted = { responseHandler };
    throw new Error("electrode-react-webapp: render-context - user intercepted");
  }

  fullStop() {
    this._stop = RenderContext.FULL_STOP;
  }

  get isFullStop() {
    return this._stop === RenderContext.FULL_STOP;
  }

  voidStop(result = null) {
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
  handleTokenResult(id, result, cb) {
    const addToOutput = res => {
      // if it's a string, buffer, or stream, then add to output
      if (typeof res === "string" || Buffer.isBuffer(res) || isReadableStream(res)) {
        this.output.add(res);
      } else {
        // console.log(" not ignored");
      }
      // ignore other return value types
      return cb();
    };

    // it's a promise, wait for it before invoking callback
    if (result && result.then) {
      return result.then(addToOutput).catch(cb);
    } else {
      return addToOutput(result);
    }
  }
}
