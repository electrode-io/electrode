"use strict";

//
// simulate a res object for webpack dev middleware in case
// it needs to send back webpack assets.
// For non express server, result in this fake res will be used
// to send back with the real framework APIs
//
const assert = require("assert");
const EventEmitter = require("events");

const SENT = 1;
const END = 2;

class FakeRes extends EventEmitter {
  constructor() {
    super();
    this._headers = {};
    this._content = undefined;
    this._encoding = undefined;
    this._end = 0;
    this._statusCode = 200;
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(c) {
    this._statusCode = c;
  }

  get responded() {
    return this._end > 0;
  }

  setHeader(h, v) {
    this._headers[h.toLowerCase()] = v;
  }

  send(content) {
    assert(!this.responded, "FakeRes already responded");
    this._end = SENT;
    this._content = content;
    this.emit("end");
  }

  end(content, encoding) {
    assert(!this.responded, "FakeRes already responded");
    this._end = END;
    this._content = content;
    this._encoding = encoding;
    this.emit("end");
  }

  hapi17Respond(h) {
    const response = h.response(this._content).takeover();
    Object.keys(this._headers).forEach(key => {
      response.header(key, this._headers[key]);
    });
    return response.code(this._statusCode);
  }

  hapi16Respond(reply) {
    const response = reply(this._content);
    Object.keys(this._headers).forEach(h => {
      response.header(h, this._headers[h]);
    });
    return response.code(this._statusCode);
  }

  express4Respond(res) {
    return res
      .set(this._headers)
      .status(this._statusCode)
      .send(this._content);
  }
}

module.exports = FakeRes;
