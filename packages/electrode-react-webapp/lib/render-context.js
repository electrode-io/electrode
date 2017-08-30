"use strict";

const RenderOutput = require("./render-output");
const _ = require("lodash");

class RenderContext {
  constructor($) {
    this.$ = $;
    this.output = new RenderOutput(this);
    this.tokenHandler = _.last($.routeData.tokenHandlers);
    this.content = $.content;
  }

  handleResult(id, res, cb) {
    // it's a promise, wait for it and before invoking callback
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
