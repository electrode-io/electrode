"use strict";

//
// simulate a res object for webpack dev middleware in case
// it needs to send back webpack assets.
// For non express server, result in this fake res will be used
// to send back with the real framework APIs
//

class FakeRes {
  constructor() {
    this._headers = {};
    this.statusCode = 200;
  }

  setHeader(h, v) {
    this._headers[h] = v;
  }

  send(content) {
    this._content = content;
  }
}

module.exports = FakeRes;
